# Modular Template 2.0

A comprehensive full-stack development template with multiple frontend frameworks, modern backends, and utility tools. Perfect for rapid prototyping and production applications.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd Modular-Template

# Start all services with Docker Compose
docker compose up --build

# Run database migrations
docker compose exec backend uv run alembic upgrade head
docker compose exec b4f yarn prisma migrate dev
```

## 📁 Project Structure

### Frontend Applications

| Project | Technology | Port | Authentication | Description |
|---------|------------|------|----------------|-------------|
| **frontend** | React 19 + Craco | 3000 | Firebase Auth | React app with Material-UI, Redux |
| **frontend1** | React 19 + Vite + Tailwind + DaisyUI | 5173 | Kinde + Stripe + TanStack Query | Modern React app with dark mode, authentication and payments |
| **frontend3** | Astro 5 | 4321 | - | Static site generator |
| **frontend4** | Next.js 15 | 3002 | - | Full-stack React framework |
| **frontend5** | Angular 18 | 4200 | - | Enterprise Angular app |
| **frontend6** | Vue 3 + Vite | 5174 | - | Modern Vue.js application |

### Backend Services

| Project | Technology | Port | Database | Description |
|---------|------------|------|----------|-------------|
| **backend** | FastAPI 2.0 + Python | 8000 | PostgreSQL | Modern Python API with SQLAlchemy 2.0 |
| **b4f** | Express + TypeScript | 3001 | PostgreSQL | Backend for Frontend with Stripe integration |

### Utility Tools

| Project | Technology | Description |
|---------|------------|-------------|
| **numpy** | Python + OpenCV | OCR text analyzer for pharmaceutical labels |

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19** with concurrent rendering
- **TypeScript** for type safety
- **Material-UI (MUI)** for modern UI components
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for component library
- **TanStack Query** for server state management
- **Vite** for fast development
- **Next.js 15** for full-stack React
- **Astro 5** for static sites
- **Vue 3** with Composition API
- **Angular 18** for enterprise apps

### Backend Technologies
- **FastAPI 2.0** with async/await
- **SQLAlchemy 2.0** with async support
- **Express.js** with TypeScript
- **Prisma ORM** for database management
- **PostgreSQL** as primary database

### Authentication & Payments
- **Firebase Authentication** for user management
- **Kinde** for modern auth solutions
- **Stripe** for payment processing
- **JWT** tokens for API authentication

### Development Tools
- **Docker & Docker Compose** for containerization
- **ESLint + Prettier** for code quality
- **Jest + Testing Library** for testing
- **Cypress** for E2E testing
- **Swagger/OpenAPI** for API documentation

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)

### Environment Setup

1. **Copy environment files:**
```bash
# For each project, copy the example environment file
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
cp b4f/.env.example b4f/.env
```

2. **Configure environment variables** (see individual project READMEs)

3. **Start services:**
```bash
docker compose up --build
```

### Individual Project Setup

Each project has its own detailed README with specific setup instructions:

- [Backend (FastAPI)](/backend/README.md)
- [Frontend (React)](/frontend/README.md)
- [B4F (Express)](/b4f/README.md)
- [Numpy (OCR Tools)](/numpy/README.md)

## 🔧 Development Commands

### Docker Commands
```bash
# Start all services
docker compose up --build

# Start specific service
docker compose up frontend backend

# View logs
docker compose logs -f backend

# Execute commands in containers
docker compose exec backend uv run python script.py
docker compose exec frontend yarn test
```

### Database Migrations
```bash
# FastAPI backend
docker compose exec backend uv run alembic upgrade head

# B4F backend
docker compose exec b4f yarn prisma migrate dev
```

## 📚 API Documentation

- **FastAPI Backend**: http://localhost:8000/docs
- **B4F Backend**: http://localhost:3001/swagger

## 🧪 Testing

Each project includes comprehensive testing:

```bash
# Frontend tests
docker compose exec frontend yarn test

# Backend tests
docker compose exec backend uv run pytest

# B4F tests
docker compose exec b4f yarn test
```

## 🔒 Security Features

- **CORS** configuration for cross-origin requests
- **Rate limiting** to prevent API abuse
- **Input validation** with Pydantic schemas
- **JWT authentication** for secure API access
- **Environment variable** management
- **Docker security** best practices

## 📊 Monitoring & Logging

- **Structured logging** with Pino (B4F)
- **Request/Response logging** for debugging
- **Health check endpoints** for monitoring
- **Error tracking** and exception handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- Check individual project READMEs
- Open an issue on GitHub
- Contact [DrBlink7](https://github.com/DrBlink7)

## 🎥 Demo Videos

- [Frontend1 + B4F Integration](https://www.loom.com/share/4ee224c3fd90456397406979275391af)
- [Kinde + Stripe Integration](https://www.loom.com/share/0580f54765f74cb4b55bca9be039ac89)
