# Frontend2 - Astro 5 Static Site

Modern static site generator built with Astro 5, featuring component islands architecture and optimal performance.

## 🚀 Features

- **Astro 5** with latest static site generation capabilities
- **TypeScript** for type safety and better development experience
- **Component Islands** architecture for optimal performance
- **Zero JavaScript by default** - only loads JS when needed
- **Built-in TypeScript checking** with `@astrojs/check`
- **Fast development server** with hot module replacement
- **Static site generation** for optimal SEO and performance
- **Multi-framework support** (React, Vue, Svelte, etc.)

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
├── components/          # Astro components
│   └── Card.astro
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # File-based routing
│   └── index.astro
└── styles/             # Global styles
public/                 # Static assets
├── favicon.svg
└── images/
```

## 🧞 Available Scripts

| Command | Action |
| :------ | :----- |
| `yarn dev` | Start development server at `localhost:4321` |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview production build locally |
| `yarn astro` | Run Astro CLI commands |

## 🎯 Astro Best Practices

### Component Architecture
- **Astro Components** (`.astro`) for static content
- **Framework Components** for interactive elements
- **Islands Architecture** - only load JS when needed

### Performance
- **Static Generation** by default
- **Zero JavaScript** unless explicitly needed
- **Optimized images** and assets
- **CSS scoping** for component isolation

### SEO & Accessibility
- **Semantic HTML** structure
- **Meta tags** and Open Graph support
- **Structured data** for search engines
- **Accessibility** best practices

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
docker build -t frontend2 .

# Run container
docker run -p 4321:4321 frontend2
```

## 🔗 Related Projects

- **Frontend** - React + Material-UI (port 3000)
- **Frontend1** - React + Tailwind + DaisyUI (port 5173)
- **Frontend3** - Astro 5 (port 4321)
- **Frontend4** - Next.js 15 (port 3002)

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [TypeScript in Astro](https://docs.astro.build/en/guides/typescript/)
- [Deployment Guide](https://docs.astro.build/en/guides/deploy/)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.