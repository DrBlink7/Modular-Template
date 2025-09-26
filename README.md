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
| **frontend** | React 19 + Craco | 3000 | Firebase Auth | React app with Material-UI, Redux Toolkit |
| **frontend1** | React 19 + Vite + Tailwind + DaisyUI | 5173 | Kinde + Stripe + TanStack Query | Modern React app with dark mode, authentication and payments |
| **frontend2** | Astro 5 + TypeScript | 4321 | - | Static site generator with zero JS by default |
| **frontend3** | Next.js 15 + React 19 + Turbopack | 3003 | - | Full-stack React framework with App Router |
| **frontend4** | Vue 3 + Vite 7 + TypeScript | 3004 | - | Modern Vue.js application with Composition API |
| **frontend5** | Angular 18 + TypeScript | 4200 | - | Enterprise Angular app (Skip for now) |
| **frontend6** | Vue 3 + Vite | 5175 | - | Alternative Vue.js application (Skip for now) |

### Backend Services

| Project | Technology | Port | Database | Description |
|---------|------------|------|----------|-------------|
| **backend** | FastAPI 2.0 + Python | 8000 | PostgreSQL | Modern Python API with SQLAlchemy 2.0 |
| **b4f** | Express 5 + TypeScript | 3001 | PostgreSQL | Backend for Frontend with Stripe integration |
| **b4f1** | NestJS 11 + TypeScript + SWC | 3002 | - | Enterprise Node.js API with decorators |

### Utility Tools

| Project | Technology | Description |
|---------|------------|-------------|
| **numpy** | Python + OpenCV | OCR text analyzer for pharmaceutical labels |

## 🛠️ Technology Stack

### Frontend Technologies
- **React 19** with concurrent rendering and Suspense
- **TypeScript** for type safety across all projects
- **Material-UI (MUI)** for modern React UI components
- **Tailwind CSS 4** for utility-first styling
- **DaisyUI** for component library and themes
- **TanStack Query** for server state management
- **Vite 7** for ultra-fast development and building
- **Next.js 15** with App Router and Turbopack
- **Astro 5** for static sites with zero JS by default
- **Vue 3** with Composition API and `<script setup>`
- **Angular 18** for enterprise applications
- **Redux Toolkit** for predictable state management
- **React Router** for client-side routing

### Backend Technologies
- **FastAPI 2.0** with async/await and automatic OpenAPI docs
- **SQLAlchemy 2.0** with async support and type hints
- **Express.js 5** with TypeScript and modern middleware
- **NestJS 11** with decorators and dependency injection
- **Prisma ORM** for type-safe database management
- **PostgreSQL** as primary database
- **Alembic** for database migrations
- **SWC** for ultra-fast TypeScript compilation

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
- [Frontend1 (React + Vite)](/frontend1/README.md)
- [Frontend2 (Astro)](/frontend2/README.md)
- [Frontend3 (Next.js)](/frontend3/README.md)
- [Frontend4 (Vue)](/frontend4/README.md)
- [B4F (Express)](/b4f/README.md)
- [B4F1 (NestJS)](/b4f1/README.md)
- [Numpy (OCR Tools)](/numpy/README.md)

## 🔧 Development Commands

### Docker Commands
```bash
# Start all services
docker compose up --build

# Start specific services
docker compose up frontend frontend1 backend b4f

# View logs
docker compose logs -f backend
docker compose logs -f frontend1

# Execute commands in containers
docker compose exec backend uv run python script.py
docker compose exec frontend yarn test
docker compose exec frontend1 yarn dev
docker compose exec frontend2 yarn build
docker compose exec frontend3 yarn dev
docker compose exec frontend4 yarn dev
docker compose exec b4f1 yarn start:dev
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
- **B4F1 Backend**: http://localhost:3002/api

## 🧪 Testing

Each project includes comprehensive testing:

```bash
# Frontend tests
docker compose exec frontend yarn test
docker compose exec frontend1 yarn test
docker compose exec frontend2 yarn test
docker compose exec frontend3 yarn test
docker compose exec frontend4 yarn test

# Backend tests
docker compose exec backend uv run pytest
docker compose exec b4f yarn test
docker compose exec b4f1 yarn test
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
