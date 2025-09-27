"""
Configuration settings for the FastAPI backend
"""
import os
from dotenv import load_dotenv


class Settings:
    """Application settings"""
    
    def __init__(self):
        # Load environment variables from .env file if it exists
        load_dotenv()
        
        # Database
        self.database_url = os.getenv("DATABASE_URL", "postgresql://dev:devPassword@db:5432/postgres")
        
        # CORS
        self.allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173")
        
        # Base URL
        self.base_url = os.getenv("BASE_URL", "http://localhost:8000")
    
        # Stripe Configuration
        self.stripe_secret_key = os.getenv("STRIPE_SECRET_KEY")
        self.stripe_webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        self.stripe_success_url = os.getenv("STRIPE_SUCCESS_URL", "http://localhost:5173/success")
        self.stripe_cancel_url = os.getenv("STRIPE_CANCEL_URL", "http://localhost:5173/cancel")
        self.stripe_product_1 = os.getenv("STRIPE_PRODUCT_1")
        self.stripe_product_2 = os.getenv("STRIPE_PRODUCT_2")
        self.stripe_price_1 = os.getenv("STRIPE_PRICE_1")
        self.stripe_price_2 = os.getenv("STRIPE_PRICE_2")
        
        # Kinde Configuration
        self.kinde_domain = os.getenv("KINDE_DOMAIN")
        self.kinde_client_id = os.getenv("KINDE_CLIENT_ID")
        self.kinde_client_secret = os.getenv("KINDE_CLIENT_SECRET")
        self.kinde_issuer_url = os.getenv("KINDE_ISSUER_URL")
        self.kinde_site_url = os.getenv("KINDE_SITE_URL", "http://localhost:5173")
        self.kinde_post_login_redirect_url = os.getenv("KINDE_POST_LOGIN_REDIRECT_URL", "http://localhost:5173")
        self.kinde_post_logout_redirect_url = os.getenv("KINDE_POST_LOGOUT_REDIRECT_URL", "http://localhost:5173")
        
        # JWT Configuration
        self.jwt_algorithm = os.getenv("JWT_ALGORITHM", "RS256")
        self.jwt_audience = os.getenv("JWT_AUDIENCE")
        
        # Development Settings
        self.environment = os.getenv("ENVIRONMENT", "development")
        self.debug = os.getenv("DEBUG", "true").lower() == "true"
        self.log_level = os.getenv("LOG_LEVEL", "INFO")


# Global settings instance
settings = Settings()

# Stripe configuration validation
def validate_stripe_config():
    """Validate that required Stripe configuration is present"""
    required_stripe_vars = [
        "stripe_secret_key",
        "stripe_webhook_secret",
        "stripe_product_1",
        "stripe_product_2",
        "stripe_price_1",
        "stripe_price_2"
    ]
    
    missing_vars = []
    for var in required_stripe_vars:
        if not getattr(settings, var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"⚠️  Warning: Missing Stripe configuration: {', '.join(missing_vars)}")
        print("   Stripe functionality will be disabled until configured.")
        return False
    
    return True

# Kinde configuration validation
def validate_kinde_config():
    """Validate that required Kinde configuration is present"""
    required_kinde_vars = [
        "kinde_domain",
        "kinde_client_id",
        "kinde_client_secret",
        "kinde_issuer_url"
    ]
    
    missing_vars = []
    for var in required_kinde_vars:
        if not getattr(settings, var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"⚠️  Warning: Missing Kinde configuration: {', '.join(missing_vars)}")
        print("   Kinde authentication will be disabled until configured.")
        return False
    
    return True

# Validate configurations on import
stripe_configured = validate_stripe_config()
kinde_configured = validate_kinde_config()
