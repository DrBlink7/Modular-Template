import os
import pytest
from fastapi.testclient import TestClient
from main import app
from users.models import User
from database import Base, get_db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv(".env.test")
TOKEN = os.getenv("TOKEN")
user_id = os.getenv("USERID")
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

@pytest.fixture
def db():
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()

@pytest.fixture
def test_app(db):
    app.dependency_overrides[get_db] = lambda: db
    client = TestClient(app)
    client.headers.update({"Authorization": f"Bearer {TOKEN}"})
    yield client

@pytest.fixture
def create_user(db):
    print(user_id)
    user = User(id=(f"{user_id}"))
    db.add(user)
    db.commit()
    return user

@pytest.fixture
def clean_up(db):
    yield
    db.query(User).delete()
    db.commit()

def test_create_user(test_app, create_user, clean_up):
    response = test_app.get(f"/api/users/{user_id}")
    if response.status_code == 404:
        response = test_app.post("/api/users/")
        assert response.status_code == 201
    else:
        assert response.status_code == 200

def test_get_all_users(test_app, create_user, clean_up):
    response = test_app.get("/api/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_user(test_app, create_user, clean_up):
    response = test_app.get(f"/api/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["id"] == user_id
    
    response = test_app.get("/api/users/non_existent_user")
    assert response.status_code == 404

def test_delete_user(test_app, create_user, clean_up):
    response = test_app.delete(f"/api/users/{user_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}
    
    response = test_app.delete("/api/users/non_existent_user")
    assert response.status_code == 404
