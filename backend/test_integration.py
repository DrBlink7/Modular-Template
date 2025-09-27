#!/usr/bin/env python3
"""
Test script to verify backend integration
"""
import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test that all imports work correctly"""
    try:
        print("Testing imports...")
        
        # Test config
        from config import settings
        print("✅ Config import OK")
        
        # Test auth utils
        from utils.auth import verify_kinde_token
        print("✅ Auth utils import OK")
        
        # Test stripe service
        from services.stripe_service import StripeService
        print("✅ Stripe service import OK")
        
        # Test models
        from models.orders import Order, PaymentLog, Product
        print("✅ Models import OK")
        
        # Test schemas
        from schemas.orders import CheckoutRequest, CheckoutResponse
        print("✅ Schemas import OK")
        
        # Test routers
        from routers.payments import router
        print("✅ Payments router import OK")
        
        print("\n🎉 All imports successful!")
        return True
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

def test_config():
    """Test configuration loading"""
    try:
        print("\nTesting configuration...")
        
        from config import settings, stripe_configured, kinde_configured
        
        print(f"Database URL: {settings.database_url}")
        print(f"Allowed Origins: {settings.allowed_origins}")
        print(f"Stripe configured: {stripe_configured}")
        print(f"Kinde configured: {kinde_configured}")
        
        print("✅ Configuration loaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Configuration error: {e}")
        return False

def main():
    """Main test function"""
    print("🔧 Backend Integration Test")
    print("=" * 40)
    
    success = True
    
    # Test imports
    if not test_imports():
        success = False
    
    # Test configuration
    if not test_config():
        success = False
    
    print("\n" + "=" * 40)
    if success:
        print("🎉 All tests passed! Backend integration is ready.")
        return 0
    else:
        print("❌ Some tests failed. Check the errors above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
