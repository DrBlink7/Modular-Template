# B4F - Backend for Frontend

Modern Node.js backend built with Express, TypeScript, Prisma, and integrated with Stripe and Kinde authentication.

## 🚀 Features

- **Express.js** with TypeScript for robust API development
- **Prisma ORM** for database management and migrations
- **Stripe Integration** for payment processing and webhooks
- **Kinde Authentication** for secure user management
- **Swagger Documentation** for API exploration
- **Rate Limiting** and security middleware
- **Comprehensive Logging** with Pino
- **Jest Testing** with coverage reports
- **ESLint + Prettier** for code quality

## 🛠️ Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Fill in the required environment variables in `.env`

3. Install dependencies:
```bash
yarn install
```

4. Generate Prisma client:
```bash
yarn prisma:generate
```

5. Run database migrations:
```bash
yarn prisma:migrate
```

6. Start the development server:
```bash
yarn start:dev
```

The API will run on http://localhost:3001

## 📚 API Documentation

- **Swagger UI**: http://localhost:3001/swagger
- **API Endpoints**: All endpoints are prefixed with `/api`

## 🔐 Authentication (Kinde)

Configure your Kinde application and set the environment variables:

### Environment Variables
- `AUTH_URL` - Your Kinde public URL
- `KINDE_CLIENT_ID` - Kinde client ID
- `KINDE_CLIENT_SECRET` - Kinde client secret
- `KINDE_ISSUER_URL` - Kinde issuer URL
- `KINDE_SITE_URL` - Your site URL
- `KINDE_POST_LOGOUT_REDIRECT_URL` - Post logout redirect URL
- `KINDE_POST_LOGIN_REDIRECT_URL` - Post login redirect URL

### Machine-to-Machine (M2M)
For M2M authentication, enable Kinde Management APIs and configure the appropriate scopes.

## 💳 Stripe Integration

### Environment Variables
```bash
STRIPE_SECRET_KEY=sk_test_...          # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...        # Webhook secret
SUCCESS_URL=http://localhost:3000/success  # Success redirect URL
CANCEL_URL=http://localhost:3000/cancel    # Cancel redirect URL
PRODUCT_ID1=prod_...                   # First product ID
PRODUCT_PRICE1=price_...               # First product price ID
PRODUCT_ID2=prod_...                   # Second product ID
PRODUCT_PRICE2=price_...               # Second product price ID
```

### Webhook Setup

#### Option 1: Stripe Dashboard
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/workbench/webhooks)
2. Add endpoint: `http://localhost:3001/api/payments/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

#### Option 2: Stripe CLI (Local Development)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Start webhook listener
stripe listen --forward-to http://localhost:3001/api/payments/webhook

# Copy the webhook secret from the output
```

## 🗄️ Database (PostgreSQL + Prisma)

### Environment Variables
```bash
DATABASE_URL="postgresql://dev:devPassword@db:5432/postgres?schema=public"
```

### Prisma Commands
```bash
# Generate Prisma client
yarn prisma:generate

# Create a new migration
yarn prisma migrate dev --name migration_name

# Apply migrations
yarn prisma:migrate

# Deploy migrations (production)
yarn prisma:deploy

# Open Prisma Studio
yarn prisma:studio
```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## 🔧 Development

### Code Quality
```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Type check
yarn type-check
```

### Available Scripts

- `yarn start` - Start production server
- `yarn start:dev` - Start development server with hot reload
- `yarn build` - Build TypeScript
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage
- `yarn lint` - Lint code
- `yarn lint:fix` - Fix linting issues
- `yarn type-check` - TypeScript type checking
- `yarn prisma:generate` - Generate Prisma client
- `yarn prisma:migrate` - Run database migrations
- `yarn prisma:deploy` - Deploy migrations (production)
- `yarn prisma:studio` - Open Prisma Studio

## 📁 Project Structure

```
b4f/
├── src/
│   ├── api/             # API routes and controllers
│   ├── config/          # Configuration files
│   ├── db/              # Database configuration
│   ├── logger/          # Logging utilities
│   └── swagger/         # Swagger documentation
├── prisma/              # Prisma schema and migrations
├── test/                # Test files
├── src/index.ts         # Main application entry point
└── package.json
```

## 🚀 Docker Deployment

```bash
# Build and start with Docker Compose
docker compose up --build b4f

# Run migrations in container
docker compose exec b4f yarn prisma migrate dev

# Generate Prisma client in container
docker compose exec b4f yarn prisma:generate
```

## 🔒 Security Features

- **Rate Limiting** - Prevents API abuse
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Request validation
- **JWT Verification** - Secure token handling
- **Webhook Verification** - Stripe webhook security

## 📊 Monitoring & Logging

- **Structured Logging** with Pino
- **Request/Response Logging** with Pino HTTP
- **Error Tracking** and exception handling
- **Performance Monitoring** capabilities