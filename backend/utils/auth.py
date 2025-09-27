"""
Authentication utilities for Kinde integration
"""
import httpx
from typing import Optional, Dict, Any
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from config import settings, kinde_configured
import logging

logger = logging.getLogger(__name__)

# Security scheme
security = HTTPBearer()

# Cache for Kinde public keys
_kinde_public_keys: Optional[Dict[str, Any]] = None


async def get_kinde_public_keys() -> Dict[str, Any]:
    """Fetch Kinde public keys for JWT verification"""
    global _kinde_public_keys
    
    if _kinde_public_keys is not None:
        return _kinde_public_keys
    
    if not kinde_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Kinde authentication not configured"
        )
    
    try:
        jwks_url = f"https://{settings.kinde_domain}/.well-known/jwks.json"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(jwks_url)
            response.raise_for_status()
            _kinde_public_keys = response.json()
            
        logger.info("Successfully fetched Kinde public keys")
        return _kinde_public_keys
        
    except Exception as e:
        logger.error(f"Failed to fetch Kinde public keys: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Unable to verify authentication token"
        )


def get_public_key(token: str) -> str:
    """Get the appropriate public key for token verification"""
    try:
        # Decode header to get key ID
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        
        if not kid:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token missing key ID"
            )
        
        # Get public keys
        public_keys = _kinde_public_keys
        if not public_keys:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Public keys not available"
            )
        
        # Find the matching key
        for key in public_keys.get("keys", []):
            if key.get("kid") == kid:
                # Convert JWK to PEM format
                from jose import jwk
                return jwk.construct(key).to_pem().decode('utf-8')
        
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No matching public key found"
        )
        
    except Exception as e:
        logger.error(f"Error getting public key: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format"
        )


async def verify_kinde_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Verify and decode Kinde JWT token
    
    Args:
        credentials: HTTP Bearer token from request
        
    Returns:
        Decoded token payload
        
    Raises:
        HTTPException: If token is invalid or authentication fails
    """
    if not kinde_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Kinde authentication not configured"
        )
    
    token = credentials.credentials
    
    try:
        # Get public keys
        await get_kinde_public_keys()
        
        # Get the appropriate public key
        public_key = get_public_key(token)
        
        # Verify and decode the token (no audience check like b4f)
        payload = jwt.decode(
            token,
            public_key,
            algorithms=[settings.jwt_algorithm],
            options={"verify_aud": False}
        )
        
        # Validate required claims
        if not payload.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token missing subject claim"
            )
        
        logger.info(f"Successfully verified token for user: {payload.get('sub')}")
        return payload
        
    except JWTError as e:
        logger.error(f"JWT verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )


async def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Get the current user ID from the token
    
    Args:
        credentials: HTTP Bearer token from request
        
    Returns:
        User ID from token subject claim
    """
    payload = await verify_kinde_token(credentials)
    return payload.get("sub")


async def get_current_user_email(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Get the current user email from the token
    
    Args:
        credentials: HTTP Bearer token from request
        
    Returns:
        User email from token
    """
    payload = await verify_kinde_token(credentials)
    return payload.get("email", "")


async def get_current_user_info(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Dict[str, Any]:
    """
    Get complete current user information from the token
    
    Args:
        credentials: HTTP Bearer token from request
        
    Returns:
        Complete user information from token
    """
    return await verify_kinde_token(credentials)


# Optional authentication (doesn't raise exception if no token)
async def get_optional_user_id(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[str]:
    """
    Get user ID if token is present, otherwise return None
    
    Args:
        credentials: Optional HTTP Bearer token from request
        
    Returns:
        User ID if authenticated, None otherwise
    """
    if not credentials:
        return None
    
    try:
        return await get_current_user_id(credentials)
    except HTTPException:
        return None