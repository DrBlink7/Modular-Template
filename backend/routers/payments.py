"""
Payment API endpoints for Stripe integration
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import Dict, Any
import logging

from database import get_db
from utils.auth import get_current_user_id, get_current_user_info
from services.stripe_service import StripeService
from schemas.orders import (
    CheckoutRequest, 
    CheckoutResponse, 
    OrderStatusResponse, 
    WebhookResponse,
    StripeValidationResponse,
    ErrorResponse
)
from models.orders import Order, PaymentLog
from config import stripe_configured

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/payments", tags=["payments"])


@router.post("/checkout/{product_id}", response_model=CheckoutResponse)
@router.post("/checkout/{product_id}/", response_model=CheckoutResponse)
async def create_checkout(
    product_id: str,
    checkout_request: CheckoutRequest,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    Create a Stripe checkout session for a product
    
    Args:
        product_id: Product ID (1 or 2)
        checkout_request: Checkout request with quantity
        user_id: Current user ID from authentication
        db: Database session
        
    Returns:
        Checkout session URL
    """
    if not stripe_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe not configured"
        )
    
    # Validate product ID
    if product_id not in ["1", "2"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product ID must be 1 or 2"
        )
    
    try:
        stripe_service = StripeService()
        
        # Create checkout session
        result = await stripe_service.create_checkout_session(
            product_id=product_id,
            user_id=user_id,
            quantity=checkout_request.quantity
        )
        
        logger.info(f"Checkout session created for user {user_id}, product {product_id}")
        return CheckoutResponse(url=result["url"])
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating checkout: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create checkout session"
        )


@router.get("/order-status/{product_id}", response_model=OrderStatusResponse)
@router.get("/order-status/{product_id}/", response_model=OrderStatusResponse)
async def check_order_status(
    product_id: str,
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    Check if user has paid for a product
    
    Args:
        product_id: Product ID to check (1 or 2)
        user_id: Current user ID from authentication
        db: Database session
        
    Returns:
        Order status with hasPaid boolean
    """
    if not stripe_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe not configured"
        )
    
    # Validate product ID
    if product_id not in ["1", "2"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product ID must be 1 or 2"
        )
    
    try:
        # Check if user has paid for this product in the last month
        from datetime import datetime, timedelta
        
        one_month_ago = datetime.utcnow() - timedelta(days=30)
        
        # Query for fulfilled orders for this user and product within the last month
        existing_order = db.query(Order).filter(
            Order.user_id == user_id,
            Order.product_id == product_id,
            Order.fulfilled == True,
            Order.created_at >= one_month_ago
        ).first()
        
        # Return whether user has paid
        has_paid = existing_order is not None
        
        logger.info(f"Order status check for user {user_id}, product {product_id}: hasPaid={has_paid}")
        
        return OrderStatusResponse(hasPaid=has_paid)
        
    except Exception as e:
        logger.error(f"Error checking order status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error checking order status"
        )


@router.get("/order-status-test/{product_id}", response_model=OrderStatusResponse)
async def check_order_status_test(
    product_id: str,
    db: Session = Depends(get_db)
):
    """
    Test endpoint to check order status without authentication
    """
    # Validate product ID
    if product_id not in ["1", "2"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Product ID must be 1 or 2"
        )
    
    try:
        # Check if there are any fulfilled orders for this product in the last month
        from datetime import datetime, timedelta
        
        one_month_ago = datetime.utcnow() - timedelta(days=30)
        
        # Query for fulfilled orders for this product within the last month
        existing_order = db.query(Order).filter(
            Order.product_id == product_id,
            Order.fulfilled == True,
            Order.created_at >= one_month_ago
        ).first()
        
        # Return whether there are any paid orders for this product
        has_paid = existing_order is not None
        
        logger.info(f"Test order status check for product {product_id}: hasPaid={has_paid}")
        
        return OrderStatusResponse(hasPaid=has_paid)
        
    except Exception as e:
        logger.error(f"Error checking test order status: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error checking order status"
        )


@router.post("/webhook", response_model=WebhookResponse)
async def stripe_webhook(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Handle Stripe webhook events
    
    Args:
        request: FastAPI request object
        db: Database session
        
    Returns:
        Webhook received confirmation
    """
    if not stripe_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe not configured"
        )
    
    try:
        # Get raw body and signature
        body = await request.body()
        signature = request.headers.get("stripe-signature")
        
        if not signature:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing Stripe signature"
            )
        
        # Process webhook
        stripe_service = StripeService()
        result = await stripe_service.handle_webhook(body, signature)
        
        # Log the webhook event
        try:
            import json
            event_data = json.loads(body.decode('utf-8'))
            
            payment_log = PaymentLog(
                event_type=event_data.get("type", "unknown"),
                event_id=event_data.get("id", ""),
                session_id=event_data.get("data", {}).get("object", {}).get("id"),
                user_id=event_data.get("data", {}).get("object", {}).get("client_reference_id"),
                event_data=event_data,
                processed=True
            )
            
            db.add(payment_log)
            db.commit()
            
        except Exception as log_error:
            logger.error(f"Failed to log webhook event: {log_error}")
            # Don't fail the webhook for logging errors
        
        logger.info("Webhook processed successfully")
        return WebhookResponse(received=True)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing webhook: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Webhook processing failed"
        )


@router.get("/validate", response_model=StripeValidationResponse)
async def validate_stripe_config(
    user_info: Dict[str, Any] = Depends(get_current_user_info)
):
    """
    Validate Stripe configuration and products
    
    Args:
        user_info: Current user information from authentication
        
    Returns:
        Validation results for Stripe products and prices
    """
    if not stripe_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe not configured"
        )
    
    try:
        stripe_service = StripeService()
        result = await stripe_service.validate_products()
        
        logger.info(f"Stripe validation completed: {result['all_valid']}")
        return StripeValidationResponse(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error validating Stripe config: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Stripe validation failed"
        )


@router.get("/orders", response_model=list[Dict[str, Any]])
async def get_user_orders(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    Get all orders for the current user
    
    Args:
        user_id: Current user ID from authentication
        db: Database session
        
    Returns:
        List of user orders
    """
    try:
        orders = db.query(Order).filter(
            Order.user_id == user_id
        ).order_by(Order.created_at.desc()).all()
        
        return [order.to_dict() for order in orders]
        
    except Exception as e:
        logger.error(f"Unexpected error getting user orders: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve orders"
        )


@router.get("/health")
async def payments_health():
    """
    Health check for payments service
    
    Returns:
        Service health status
    """
    return {
        "status": "healthy",
        "stripe_configured": stripe_configured,
        "service": "payments"
    }
