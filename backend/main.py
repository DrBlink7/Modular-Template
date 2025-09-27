from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
from database import engine, get_db
from models import users as user_models
from routers.users import router as user_router
from routers import payments
from models import orders
from config import settings
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting up the application...")
    logger.info("Application starting up...")
    
    # Log configuration status
    from config import stripe_configured, kinde_configured
    logger.info(f"Stripe configured: {stripe_configured}")
    logger.info(f"Kinde configured: {kinde_configured}")
    
    yield
    # Shutdown
    print("🛑 Shutting down the application...")
    logger.info("Application shutting down...")

app = FastAPI(
    title="Modular Template API",
    description="A modern FastAPI backend template with authentication and database integration",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    redirect_slashes=False,
    lifespan=lifespan
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*.localhost"]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router, prefix="/api/v1/users", tags=["users"])
app.include_router(payments.router)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "2.0.0"}

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Modular Template API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/health"
    }

# user_models.Base.metadata.create_all(bind=engine) enable this if you don't want to use migrations
