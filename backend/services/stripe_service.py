"""
Stripe service for payment processing
"""
import stripe
from typing import Dict, Any, Optional, List
from fastapi import HTTPException, status
from config import settings, stripe_configured
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

# Initialize Stripe
if stripe_configured:
    stripe.api_key = settings.stripe_secret_key
else:
    logger.warning("Stripe not configured - payment functionality disabled")


class StripeService:
    """Service class for Stripe payment operations"""
    
    def __init__(self):
        if not stripe_configured:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Stripe not configured"
            )
    
    def get_product_price(self, product_id: str) -> str:
        """Get the price ID for a product"""
        if product_id == "1":
            return settings.stripe_price_1
        elif product_id == "2":
            return settings.stripe_price_2
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid product ID: {product_id}"
            )
    
    def get_product_id(self, product_id: str) -> str:
        """Get the Stripe product ID for a product"""
        if product_id == "1":
            return settings.stripe_product_1
        elif product_id == "2":
            return settings.stripe_product_2
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid product ID: {product_id}"
            )
    
    async def create_checkout_session(
        self, 
        product_id: str, 
        user_id: str,
        quantity: int = 1
    ) -> Dict[str, Any]:
        """
        Create a Stripe checkout session
        
        Args:
            product_id: Product ID (1 or 2)
            user_id: User ID from authentication
            quantity: Quantity to purchase
            
        Returns:
            Dictionary with checkout session URL
        """
        try:
            price_id = self.get_product_price(product_id)
            stripe_product_id = self.get_product_id(product_id)
            
            logger.info(f"Creating checkout session for user {user_id}, product {product_id}")
            
            session = stripe.checkout.Session.create(
                line_items=[{
                    'price': price_id,
                    'quantity': quantity,
                }],
                mode='subscription',
                client_reference_id=user_id,
                success_url=settings.stripe_success_url,
                cancel_url=settings.stripe_cancel_url,
                metadata={
                    'product_id': product_id,
                    'stripe_product_id': stripe_product_id,
                    'user_id': user_id
                }
            )
            
            logger.info(f"Checkout session created: {session.id}")
            return {"url": session.url}
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error creating checkout session: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment processing error: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Unexpected error creating checkout session: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )
    
    async def handle_webhook(self, payload: bytes, signature: str) -> Dict[str, Any]:
        """
        Handle Stripe webhook events
        
        Args:
            payload: Raw webhook payload
            signature: Stripe signature header
            
        Returns:
            Dictionary indicating webhook was received
        """
        try:
            event = stripe.Webhook.construct_event(
                payload, 
                signature, 
                settings.stripe_webhook_secret
            )
            
            logger.info(f"Received Stripe webhook: {event['type']}")
            
            # Handle different event types
            if event['type'] == 'checkout.session.completed':
                await self._handle_checkout_completed(event['data']['object'])
            elif event['type'] == 'payment_intent.succeeded':
                await self._handle_payment_succeeded(event['data']['object'])
            elif event['type'] == 'customer.subscription.created':
                await self._handle_subscription_created(event['data']['object'])
            else:
                logger.info(f"Unhandled webhook event type: {event['type']}")
            
            return {"received": True}
            
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid Stripe signature: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid webhook signature"
            )
        except Exception as e:
            logger.error(f"Webhook processing error: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Webhook processing failed"
            )
    
    async def _handle_checkout_completed(self, session: Dict[str, Any]) -> None:
        """Handle checkout.session.completed webhook"""
        try:
            session_id = session['id']
            user_id = session.get('client_reference_id')
            customer_id = session.get('customer')
            payment_status = session.get('payment_status')
            
            logger.info(f"Checkout completed for session {session_id}, user {user_id}, status: {payment_status}")
            
            # Only process if payment is successful
            if payment_status == 'paid':
                # Get session details from Stripe to get line items
                stripe_session = stripe.checkout.Session.retrieve(
                    session_id, 
                    expand=['line_items']
                )
                
                # Extract product information from line items
                line_items = stripe_session.line_items.data if stripe_session.line_items else []
                product_id = None
                stripe_product_id = None
                
                if line_items:
                    price = line_items[0].price
                    if price and price.product:
                        stripe_product_id = price.product
                        # Map Stripe product ID to our product ID
                        if stripe_product_id == settings.stripe_product_1:
                            product_id = "1"
                        elif stripe_product_id == settings.stripe_product_2:
                            product_id = "2"
                
                # Create order in database
                from database import get_db
                from models.orders import Order
                
                db = next(get_db())
                try:
                    # Check if order already exists
                    existing_order = db.query(Order).filter(Order.session_id == session_id).first()
                    if existing_order and existing_order.fulfilled:
                        logger.info(f"Order for session {session_id} already exists and is fulfilled")
                        return
                    
                    # Create new order
                    order = Order(
                        session_id=session_id,
                        user_id=user_id,
                        customer_id=customer_id,
                        product_id=product_id or "unknown",
                        stripe_product_id=stripe_product_id,
                        items=line_items[0].to_dict() if line_items else None,
                        fulfilled=True,
                        payment_status=payment_status,
                        amount_total=str(stripe_session.amount_total) if stripe_session.amount_total else None,
                        currency=stripe_session.currency
                    )
                    
                    db.add(order)
                    db.commit()
                    db.refresh(order)
                    
                    logger.info(f"Order created successfully: {order.id} for user {user_id}, product {product_id}")
                    
                except Exception as db_error:
                    db.rollback()
                    logger.error(f"Database error creating order: {db_error}")
                    raise
                finally:
                    db.close()
            else:
                logger.warning(f"Checkout session {session_id} not paid, status: {payment_status}")
            
        except Exception as e:
            logger.error(f"Error handling checkout completed: {e}")
            raise
    
    async def _handle_payment_succeeded(self, payment_intent: Dict[str, Any]) -> None:
        """Handle payment_intent.succeeded webhook"""
        try:
            payment_id = payment_intent['id']
            amount = payment_intent['amount']
            
            logger.info(f"Payment succeeded: {payment_id}, amount: {amount}")
            
        except Exception as e:
            logger.error(f"Error handling payment succeeded: {e}")
    
    async def _handle_subscription_created(self, subscription: Dict[str, Any]) -> None:
        """Handle customer.subscription.created webhook"""
        try:
            subscription_id = subscription['id']
            customer_id = subscription['customer']
            
            logger.info(f"Subscription created: {subscription_id}, customer: {customer_id}")
            
        except Exception as e:
            logger.error(f"Error handling subscription created: {e}")
    
    async def check_order_status(
        self, 
        product_id: str, 
        user_id: str,
        days_back: int = 30
    ) -> Dict[str, bool]:
        """
        Check if user has paid for a product within the specified time period
        
        Args:
            product_id: Product ID to check
            user_id: User ID to check
            days_back: Number of days to look back for payment
            
        Returns:
            Dictionary with hasPaid boolean
        """
        try:
            stripe_product_id = self.get_product_id(product_id)
            
            # Calculate cutoff date
            cutoff_date = datetime.now() - timedelta(days=days_back)
            cutoff_timestamp = int(cutoff_date.timestamp())
            
            # Search for successful payments
            payments = stripe.PaymentIntent.list(
                created={'gte': cutoff_timestamp},
                limit=100
            )
            
            # Check if any payment matches our criteria
            has_paid = False
            for payment in payments.data:
                if (payment.status == 'succeeded' and 
                    payment.metadata.get('user_id') == user_id and
                    payment.metadata.get('product_id') == product_id):
                    has_paid = True
                    break
            
            logger.info(f"Order status check for user {user_id}, product {product_id}: {has_paid}")
            return {"hasPaid": has_paid}
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error checking order status: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment status check failed: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Unexpected error checking order status: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Order status check failed"
            )
    
    async def validate_products(self) -> Dict[str, Any]:
        """
        Validate that configured products and prices exist in Stripe
        
        Returns:
            Dictionary with validation results
        """
        try:
            # Check products
            products = stripe.Product.list(limit=100)
            product_ids = [p.id for p in products.data]
            
            # Check prices
            prices = stripe.Price.list(limit=100)
            price_ids = [p.id for p in prices.data]
            
            validation_results = {
                "products": {
                    "product_1": {
                        "id": settings.stripe_product_1,
                        "exists": settings.stripe_product_1 in product_ids
                    },
                    "product_2": {
                        "id": settings.stripe_product_2,
                        "exists": settings.stripe_product_2 in product_ids
                    }
                },
                "prices": {
                    "price_1": {
                        "id": settings.stripe_price_1,
                        "exists": settings.stripe_price_1 in price_ids
                    },
                    "price_2": {
                        "id": settings.stripe_price_2,
                        "exists": settings.stripe_price_2 in price_ids
                    }
                }
            }
            
            # Check if all are valid
            all_valid = all([
                validation_results["products"]["product_1"]["exists"],
                validation_results["products"]["product_2"]["exists"],
                validation_results["prices"]["price_1"]["exists"],
                validation_results["prices"]["price_2"]["exists"]
            ])
            
            validation_results["all_valid"] = all_valid
            
            logger.info(f"Product validation completed: {all_valid}")
            return validation_results
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error validating products: {e}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product validation failed: {str(e)}"
            )
        except Exception as e:
            logger.error(f"Unexpected error validating products: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Product validation failed"
            )
