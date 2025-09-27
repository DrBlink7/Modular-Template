"""
Database models for orders and payments
"""
from sqlalchemy import Column, String, Boolean, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from database import Base
import uuid
from datetime import datetime
from typing import Optional, Dict, Any


class Order(Base):
    """Order model for tracking Stripe payments"""
    
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(String, index=True, nullable=False)
    items = Column(JSON, nullable=True)  # Store line items from Stripe
    customer_id = Column(String, nullable=True)  # Stripe customer ID
    product_id = Column(String, nullable=False)  # Our product ID (1 or 2)
    stripe_product_id = Column(String, nullable=True)  # Stripe product ID
    fulfilled = Column(Boolean, default=False, nullable=False)
    payment_status = Column(String, nullable=True)  # Stripe payment status
    amount_total = Column(String, nullable=True)  # Total amount in cents
    currency = Column(String, nullable=True)  # Currency code
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Order(id={self.id}, session_id={self.session_id}, user_id={self.user_id}, fulfilled={self.fulfilled})>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert order to dictionary"""
        return {
            "id": str(self.id),
            "session_id": self.session_id,
            "user_id": self.user_id,
            "items": self.items,
            "customer_id": self.customer_id,
            "product_id": self.product_id,
            "stripe_product_id": self.stripe_product_id,
            "fulfilled": self.fulfilled,
            "payment_status": self.payment_status,
            "amount_total": self.amount_total,
            "currency": self.currency,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class PaymentLog(Base):
    """Log model for tracking payment events and webhooks"""
    
    __tablename__ = "payment_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_type = Column(String, nullable=False, index=True)  # Stripe event type
    event_id = Column(String, unique=True, nullable=False, index=True)  # Stripe event ID
    session_id = Column(String, nullable=True, index=True)  # Related session ID
    user_id = Column(String, nullable=True, index=True)  # Related user ID
    event_data = Column(JSON, nullable=True)  # Full event data
    processed = Column(Boolean, default=False, nullable=False)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<PaymentLog(id={self.id}, event_type={self.event_type}, processed={self.processed})>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert payment log to dictionary"""
        return {
            "id": str(self.id),
            "event_type": self.event_type,
            "event_id": self.event_id,
            "session_id": self.session_id,
            "user_id": self.user_id,
            "event_data": self.event_data,
            "processed": self.processed,
            "error_message": self.error_message,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class Product(Base):
    """Product model for managing available products"""
    
    __tablename__ = "products"
    
    id = Column(String, primary_key=True)  # Our product ID (1, 2, etc.)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    stripe_product_id = Column(String, unique=True, nullable=False)
    stripe_price_id = Column(String, unique=True, nullable=False)
    price_amount = Column(String, nullable=False)  # Price in cents
    currency = Column(String, default="usd", nullable=False)
    active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, active={self.active})>"
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert product to dictionary"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "stripe_product_id": self.stripe_product_id,
            "stripe_price_id": self.stripe_price_id,
            "price_amount": self.price_amount,
            "currency": self.currency,
            "active": self.active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
