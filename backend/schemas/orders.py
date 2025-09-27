"""
Pydantic schemas for orders and payments
"""
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from uuid import UUID


class OrderBase(BaseModel):
    """Base order schema"""
    session_id: str
    user_id: str
    product_id: str
    stripe_product_id: Optional[str] = None
    customer_id: Optional[str] = None
    items: Optional[Dict[str, Any]] = None
    payment_status: Optional[str] = None
    amount_total: Optional[str] = None
    currency: Optional[str] = None


class OrderCreate(OrderBase):
    """Schema for creating an order"""
    pass


class OrderUpdate(BaseModel):
    """Schema for updating an order"""
    fulfilled: Optional[bool] = None
    payment_status: Optional[str] = None
    amount_total: Optional[str] = None
    currency: Optional[str] = None


class OrderResponse(OrderBase):
    """Schema for order response"""
    id: UUID
    fulfilled: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class OrderStatusResponse(BaseModel):
    """Schema for order status check response"""
    hasPaid: bool


class CheckoutRequest(BaseModel):
    """Schema for checkout request"""
    quantity: int = Field(default=1, ge=1, le=10, description="Quantity to purchase")


class CheckoutResponse(BaseModel):
    """Schema for checkout response"""
    url: str


class WebhookResponse(BaseModel):
    """Schema for webhook response"""
    received: bool


class PaymentLogBase(BaseModel):
    """Base payment log schema"""
    event_type: str
    event_id: str
    session_id: Optional[str] = None
    user_id: Optional[str] = None
    event_data: Optional[Dict[str, Any]] = None
    processed: bool = False
    error_message: Optional[str] = None


class PaymentLogCreate(PaymentLogBase):
    """Schema for creating a payment log"""
    pass


class PaymentLogResponse(PaymentLogBase):
    """Schema for payment log response"""
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True


class ProductBase(BaseModel):
    """Base product schema"""
    id: str
    name: str
    description: Optional[str] = None
    stripe_product_id: str
    stripe_price_id: str
    price_amount: str
    currency: str = "usd"
    active: bool = True


class ProductCreate(ProductBase):
    """Schema for creating a product"""
    pass


class ProductUpdate(BaseModel):
    """Schema for updating a product"""
    name: Optional[str] = None
    description: Optional[str] = None
    price_amount: Optional[str] = None
    currency: Optional[str] = None
    active: Optional[bool] = None


class ProductResponse(ProductBase):
    """Schema for product response"""
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class StripeValidationResponse(BaseModel):
    """Schema for Stripe validation response"""
    products: Dict[str, Dict[str, Any]]
    prices: Dict[str, Dict[str, Any]]
    all_valid: bool


class ErrorResponse(BaseModel):
    """Schema for error response"""
    error: str
    detail: Optional[str] = None
    status_code: int
