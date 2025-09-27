# Frontend - React 19 + TypeScript

Modern React frontend built with TypeScript, Material-UI, and Firebase Authentication.

## 🚀 Features

- **React 19** with latest features and concurrent rendering
- **TypeScript** for type safety
- **Material-UI (MUI)** for modern UI components
- **Firebase Authentication** for secure login
- **React Router v7** for client-side routing
- **Redux Toolkit** for state management
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Yup validation
- **i18next** for internationalization
- **Cypress** for E2E testing
- **Jest + Testing Library** for unit testing
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

4. Start the development server:
```bash
yarn start
```

The app will run on http://localhost:3000

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
yarn test:unit

# Run with coverage
yarn test:coverage
```

### E2E Tests
```bash
# Open Cypress
yarn test

# Run E2E tests headlessly
yarn cypress run
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

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Open Cypress E2E tests
- `yarn test:unit` - Run unit tests
- `yarn test:coverage` - Run tests with coverage
- `yarn lint` - Lint code
- `yarn lint:fix` - Fix linting issues
- `yarn type-check` - TypeScript type checking

## 🔐 Authentication

This frontend uses **Firebase Authentication** for secure user login and management.

### Environment Variables
- `REACT_APP_FIREBASE_API_KEY` - Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `REACT_APP_FIREBASE_PROJECT_ID` - Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID` - Firebase app ID

## 📁 Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── store/          # Redux store configuration
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── i18n/           # Internationalization
├── cypress/            # E2E tests
└── package.json
```

## 🎨 UI Components

Built with Material-UI (MUI) v6 with:
- Modern design system
- Responsive layout
- Dark/light theme support
- Accessibility compliance
- Custom component library

## 🌐 Internationalization

Supports multiple languages using i18next:
- English (default)
- Italian
- Easy to add more languages

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for all screen sizes
- Touch-friendly interface
- Optimized for all devices
