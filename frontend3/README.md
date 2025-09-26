# Frontend3 - Next.js 15 Full-Stack App

Modern full-stack React application built with Next.js 15, featuring App Router, Turbopack, and Tailwind CSS.

## 🚀 Features

- **Next.js 15** with App Router and React Server Components
- **React 19** with latest concurrent features
- **Turbopack** for ultra-fast development builds
- **Tailwind CSS 4** for utility-first styling
- **TypeScript** for type safety and better DX
- **ESLint** with Next.js configuration
- **PostCSS** for CSS processing
- **Server-Side Rendering** and Static Site Generation
- **API Routes** for backend functionality
- **Image Optimization** with `next/image`
- **Font Optimization** with `next/font`

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

4. Start production server:
```bash
yarn start
```

## 📁 Project Structure

```
src/
├── app/                 # App Router directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── api/            # API routes
├── components/          # Reusable components
├── lib/                # Utility functions
└── types/              # TypeScript types
public/                 # Static assets
├── favicon.ico
└── images/
```

## 🧞 Available Scripts

| Command | Action |
| :------ | :----- |
| `yarn dev` | Start development server with Turbopack |
| `yarn build` | Build production application |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

## 🎯 Next.js 15 Best Practices

### App Router
- **Server Components** by default for better performance
- **Client Components** only when interactivity is needed
- **Route Groups** for organization
- **Parallel Routes** for complex layouts

### Performance
- **Turbopack** for faster builds
- **Image Optimization** with `next/image`
- **Font Optimization** with `next/font`
- **Bundle Analysis** with `@next/bundle-analyzer`

### Styling
- **Tailwind CSS** for utility-first styling
- **CSS Modules** for component-specific styles
- **PostCSS** for CSS processing
- **Responsive Design** with mobile-first approach

### API Development
- **API Routes** in `app/api/` directory
- **Route Handlers** for RESTful APIs
- **Middleware** for authentication and logging
- **Server Actions** for form handling

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel

# Or connect GitHub repository
# Vercel will auto-deploy on push
```

### Docker
```bash
# Build Docker image
docker build -t frontend3 .

# Run container
docker run -p 3003:3003 frontend3
```

### Other Platforms
- **Netlify** - Static site generation
- **AWS Amplify** - Full-stack deployment
- **Railway** - Container deployment
- **DigitalOcean** - VPS deployment

## 🔗 Related Projects

- **Frontend** - React + Material-UI (port 3000)
- **Frontend1** - React + Tailwind + DaisyUI (port 5173)
- **Frontend2** - Astro 5 (port 4321)
- **B4F** - Express.js backend (port 3001)
- **Backend** - FastAPI Python backend (port 8000)

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Turbopack Documentation](https://turbo.build/pack)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript with Next.js](https://nextjs.org/docs/pages/building-your-application/configuring/typescript)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.