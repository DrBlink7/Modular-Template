import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import validate_token, security
from . import models, schemas
from utils.logger import logger

router = APIRouter()

@router.get("", response_model=list[schemas.User],include_in_schema=False)
@router.get("/", response_model=list[schemas.User])
async def get_all_users(db: Session = Depends(get_db), token: str = Depends(security)):
    await validate_token(token)  # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    try:
        users = db.query(models.User).all()
        if not users:
            return []
        return users
    except Exception as e:
        logger.error(f"Error retrieving users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")

@router.post("", response_model=schemas.User, status_code=201,include_in_schema=False)
@router.post("/", response_model=schemas.User, status_code=201)
async def create_user(db: Session = Depends(get_db), token: str = Depends(security)):
    user_id = await validate_token(token)
    existing_user = db.query(models.User).filter(models.User.id == user_id).first()
    if existing_user:
        logger.warning(f"User with ID {user_id} already exists")
        raise HTTPException(status_code=409, detail="User with this ID already exists")

    db_user = models.User(id=user_id)
    db.add(db_user)
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

@router.get("/{user_id}", response_model=schemas.User)
async def get_user(user_id: str, db: Session = Depends(get_db), token: str = Depends(security)):
    await validate_token(token)  # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        logger.warning(f"User with ID {user_id} not found")
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=schemas.User)
async def update_user(user_id: str, user: schemas.UserCreate, db: Session = Depends(get_db), token: str = Depends(security)):
    await validate_token(token)  # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        logger.warning(f"User with ID {user_id} not found for update")
        raise HTTPException(status_code=404, detail="User not found")

    db_user.id = user.id
    try:
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")

@router.delete("/{user_id}")
async def delete_user(user_id: str, db: Session = Depends(get_db), token: str = Depends(security)):
    await validate_token(token) # Qui possiamo verificare eventualmente i permessi su token_user_id per maggiore granularità
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        logger.warning(f"User with ID {user_id} not found for deletion")
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        db.delete(db_user)
        db.commit()
        return {"message": "User deleted successfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error deleting user: {str(e)}")
