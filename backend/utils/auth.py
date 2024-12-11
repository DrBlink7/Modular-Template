import os
import httpx
import base64
import json
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from authlib.jose import jwt, JoseError
from fastapi.security import HTTPBearer

security = HTTPBearer()
load_dotenv()
CLIENT_ID = os.getenv("CLIENT_ID")
AUTH_URL = os.getenv("AUTH_URL")
JWKS_URL = f"{AUTH_URL}/.well-known/jwks.json"

def get_unverified_header(token: str):
    try:
        header_b64 = token.split('.')[0]
        header_json = base64.urlsafe_b64decode(header_b64 + '==')
        header = json.loads(header_json)
        return header
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Error while parsing token header: {str(e)}")

async def validate_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        async with httpx.AsyncClient() as client:
            jwks = await client.get(JWKS_URL)
            jwks = jwks.json()

        unverified_header = get_unverified_header(token)
        if unverified_header is None:
            raise HTTPException(status_code=401, detail="JWT Token malformed")

        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e'],
                }
                break

        if not rsa_key:
            raise HTTPException(status_code=401, detail="Unable to find appropriate key")

        claims = jwt.decode(token, rsa_key)
        claims.validate()

        return claims['sub']
    
    except JoseError:
        raise HTTPException(status_code=401, detail="Invalid JWT Token")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while token validation: {str(e)}")
