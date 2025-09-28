# Backend - FastAPI 2.0

Modern Python backend built with FastAPI 2.0, SQLAlchemy 2.0, and PostgreSQL.

## 🚀 Features

- **FastAPI 2.0** with async/await support
- **SQLAlchemy 2.0** with async database operations
- **PostgreSQL** database with Alembic migrations
- **JWT Authentication** with Authlib
- **Pydantic 2.0** for data validation
- **Comprehensive testing** with pytest
- **Code quality** tools (Black, isort, flake8)
- **Health checks** and monitoring endpoints
- **CORS** and security middleware

## 🛠️ Setup

### 🐳 Docker Setup (Recommended)

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Fill in the required environment variables in `.env`

3. Start with Docker Compose:
```bash
docker compose up --build
```

### 💻 Local Development Setup

1. Create and activate virtual environment:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Fill in the required environment variables in `.env`

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## 🗄️ Database

### Migrations
```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback last migration
alembic downgrade -1
```

### Alternative (Development Only)
Uncomment this line in `main.py` if you don't want to use migrations:
```python
user_models.Base.metadata.create_all(bind=engine)
```

## 🧪 Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# Run specific test file
pytest test/test_users.py -v
```

## 📁 Project Structure

```
backend/
├── alembic/           # Database migrations
├── users/            # User management module
│   ├── models.py     # SQLAlchemy models
│   ├── schemas.py    # Pydantic schemas
│   └── routers.py    # API routes
├── utils/            # Utility functions
│   ├── auth.py       # Authentication utilities
│   └── logger.py     # Logging configuration
├── test/             # Test files
├── main.py           # FastAPI application
├── database.py       # Database configuration
└── requirements.txt  # Dependencies
```

## 🔧 Development

### Virtual Environment Management
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Deactivate virtual environment
deactivate

# Install dependencies
pip install -r requirements.txt

# Update requirements.txt
pip freeze > requirements.txt
```

### Code Quality
```bash
# Format code
black .

# Sort imports
isort .

# Lint code
flake8 .
```

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `JWT_SECRET_KEY`: Secret key for JWT tokens
- `JWT_ALGORITHM`: JWT algorithm (default: HS256)

## 📖 Additional Documentation

- [Alembic migrations](/backend/alembic/README.md)
- [Testing guide](/backend/test/README.md)