# B4F1 - NestJS Backend for Frontend

Modern NestJS backend built with TypeScript, featuring enterprise-grade architecture and comprehensive tooling.

## 🚀 Features

- **NestJS 11** with TypeScript for scalable server-side applications
- **Express.js** as the underlying HTTP server
- **SWC** for ultra-fast compilation and bundling
- **Jest** for comprehensive testing (unit, e2e, coverage)
- **ESLint** with TypeScript support for code quality
- **Hot Reload** for development efficiency
- **Modular Architecture** with dependency injection
- **Built-in Validation** and transformation pipes
- **Guards and Interceptors** for security and logging
- **Health Checks** and monitoring endpoints

## 🛠️ Setup

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn start:dev
```

3. Build for production:
```bash
yarn build
yarn start:prod
```

## 🧪 Testing

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov

# Watch mode
yarn test:watch
```

## 📁 Project Structure

```
src/
├── app.controller.ts      # Main application controller
├── app.module.ts          # Root module
├── app.service.ts         # Main application service
├── config/                # Configuration files
└── main.ts               # Application entry point
```

## 🔧 Development

### Available Scripts

- `yarn start` - Start the application
- `yarn start:dev` - Start in development mode with hot reload
- `yarn start:debug` - Start in debug mode
- `yarn start:prod` - Start in production mode
- `yarn build` - Build the application
- `yarn lint` - Run ESLint
- `yarn test` - Run unit tests
- `yarn test:e2e` - Run e2e tests
- `yarn test:cov` - Run tests with coverage

### NestJS Best Practices

- **Modules**: Organize code into feature modules
- **Services**: Business logic in injectable services
- **Controllers**: Handle HTTP requests and responses
- **Guards**: Authentication and authorization
- **Interceptors**: Transform data and handle side effects
- **Pipes**: Validation and transformation
- **Filters**: Exception handling

## 🚀 Deployment

### Docker

```bash
# Build Docker image
docker build -t b4f1 .

# Run container
docker run -p 3002:3002 b4f1
```

### Production

```bash
# Build application
yarn build

# Start production server
yarn start:prod
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)

## 🔗 Related Projects

- **B4F** - Express.js backend (port 3001)
- **Backend** - FastAPI Python backend (port 8000)
- **Frontend** - React + Material-UI (port 3000)
- **Frontend1** - React + Tailwind + DaisyUI (port 5173)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.