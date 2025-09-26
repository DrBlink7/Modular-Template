# Frontend4 - Vue 3 + Vite SPA

Modern Vue 3 single-page application built with Vite, TypeScript, and comprehensive testing setup.

## 🚀 Features

- **Vue 3** with Composition API and `<script setup>`
- **Vite 6** for ultra-fast development and building
- **TypeScript** with full Vue 3 support
- **Vue Router 4** for client-side routing
- **Vitest** for unit testing with Vue Test Utils
- **ESLint** with Vue and TypeScript configuration
- **Vue DevTools** integration for debugging
- **Hot Module Replacement** for instant updates
- **Tree-shaking** for optimal bundle size
- **Modern ES modules** with native browser support

## 🛠️ Setup

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Build for production:
```bash
yarn build
```

4. Preview production build:
```bash
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   └── HelloWorld.vue
├── views/              # Page components
├── router/             # Vue Router configuration
│   └── index.ts
├── assets/             # Static assets
├── App.vue             # Root component
└── main.ts             # Application entry point
public/                 # Public assets
├── favicon.ico
└── index.html
```

## 🧞 Available Scripts

| Command | Action |
| :------ | :----- |
| `yarn dev` | Start development server |
| `yarn build` | Build production application |
| `yarn preview` | Preview production build |
| `yarn test:unit` | Run unit tests with Vitest |
| `yarn lint` | Run ESLint with auto-fix |
| `yarn type-check` | Run TypeScript type checking |

## 🎯 Vue 3 Best Practices

### Composition API
- **`<script setup>`** for cleaner syntax
- **Reactive refs** for reactive data
- **Computed properties** for derived state
- **Watchers** for side effects
- **Composables** for reusable logic

### Component Architecture
- **Single File Components** (`.vue`)
- **Props validation** with TypeScript
- **Event handling** with proper typing
- **Slots** for flexible content projection
- **Provide/Inject** for dependency injection

### Performance
- **Tree-shaking** for smaller bundles
- **Lazy loading** with dynamic imports
- **Code splitting** with Vue Router
- **Optimized re-renders** with proper reactivity

### Testing
- **Vitest** for fast unit testing
- **Vue Test Utils** for component testing
- **TypeScript** support in tests
- **Mocking** and stubbing capabilities

## 🚀 Deployment

### Static Hosting
```bash
# Build for production
yarn build

# Deploy dist/ folder to any static host
# - Vercel, Netlify, GitHub Pages, etc.
```

### Docker
```bash
# Build Docker image
docker build -t frontend4 .

# Run container
docker run -p 3002:3000 frontend4
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔗 Related Projects

- **Frontend** - React + Material-UI (port 3000)
- **Frontend1** - React + Tailwind + DaisyUI (port 5173)
- **Frontend2** - Astro 5 (port 4321)
- **Frontend3** - Next.js 15 (port 3003)
- **B4F** - Express.js backend (port 3001)
- **Backend** - FastAPI Python backend (port 8000)

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/guide/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/guide/)
- [TypeScript with Vue](https://vuejs.org/guide/typescript/overview.html)

## 🛠️ Development Tools

### Recommended IDE Setup
- **VSCode** with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Vue DevTools** browser extension
- **TypeScript** language service

### Code Quality
- **ESLint** with Vue and TypeScript rules
- **Prettier** for code formatting
- **Husky** for git hooks (optional)
- **Lint-staged** for pre-commit checks (optional)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.