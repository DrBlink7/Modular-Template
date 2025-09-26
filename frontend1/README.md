# Frontend1 - Modern React App

Frontend1 è un'applicazione React moderna costruita con Vite, TypeScript, Tailwind CSS e DaisyUI. Include autenticazione Kinde, pagamenti Stripe e supporto per dark mode.

## 🚀 Tecnologie

- **React 19** - Framework UI moderno
- **TypeScript** - Type safety
- **Vite** - Build tool veloce
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library per Tailwind
- **TanStack Query** - State management per server state
- **React Router** - Routing
- **Kinde Auth** - Autenticazione
- **Stripe** - Pagamenti
- **i18next** - Internazionalizzazione

## 🎨 UI/UX Features

- **Dark/Light Mode** - Toggle automatico con persistenza
- **Responsive Design** - Mobile-first approach
- **Modern Components** - DaisyUI component library
- **Smooth Animations** - Transizioni fluide
- **Custom Scrollbar** - Scrollbar personalizzata
- **Loading States** - Stati di caricamento eleganti

## ⚙️ Configurazione

### Variabili d'ambiente

```sh
# Server
PORT=5173  # Porta del server (default: 5173)
VITE_APP_BASE_URL=http://localhost:5173  # URL del frontend
VITE_APP_BE_URL=http://localhost:3001    # URL del backend

# Autenticazione
VITE_APP_AUTHORIZATION=authorization      # Header per il token
VITE_APP_SECRET_KEY=your-secret-key       # Chiave segreta per l'app

# Kinde Auth
VITE_APP_KINDE_CLIENT_ID=your-client-id
VITE_APP_KINDE_DOMAIN=your-domain.kinde.com
VITE_APP_KINDE_REDIRECT_URL=http://localhost:5173

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_your-stripe-key
```

## 🛠️ Scripts

```bash
# Sviluppo
yarn dev          # Avvia il server di sviluppo
yarn build        # Build per produzione
yarn preview      # Preview del build

# Testing
yarn test         # Esegue i test
yarn test:ui      # UI per i test
yarn test:coverage # Test con coverage

# Code Quality
yarn lint         # Linting
```

## 🏗️ Struttura del Progetto

```
src/
├── Components/          # Componenti UI
│   ├── Home.tsx        # Dashboard principale
│   ├── ThemeToggle.tsx # Toggle dark/light mode
│   └── ...
├── Controllers/        # Controllori/pagine
├── Hooks/             # Custom hooks
│   └── useTheme.ts    # Hook per gestione tema
├── providers/         # Context providers
│   └── QueryProvider.tsx # TanStack Query provider
├── Api/               # API calls
├── Utils/             # Utility functions
├── Translations/      # i18n files
└── index.tsx          # Entry point
```

## 🎯 Features Principali

### 1. **State Management Moderno**
- **TanStack Query** per server state e caching
- **React Context** per stato globale
- **Custom Hooks** per logica riutilizzabile
- **No Redux** - Approccio più semplice e moderno

### 2. **UI/UX Avanzata**
- **DaisyUI** component library
- **Tailwind CSS** per styling
- **Dark/Light mode** con persistenza
- **Responsive design** mobile-first

### 3. **Autenticazione & Pagamenti**
- **Kinde Auth** per login/logout
- **Stripe** per pagamenti
- **Token management** automatico

### 4. **Developer Experience**
- **TypeScript** strict mode
- **ESLint** configurazione avanzata
- **Vitest** per testing
- **Hot reload** con Vite

## 🌙 Dark Mode

Il tema viene gestito automaticamente:
- **Sistema preference** come default
- **LocalStorage** per persistenza
- **Smooth transitions** tra i temi
- **Toggle button** nell'header

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints** Tailwind standard
- **Flexible layouts** con CSS Grid/Flexbox
- **Touch-friendly** interactions

## 🧪 Testing

```bash
# Test unitari
yarn test

# Test con UI
yarn test:ui

# Coverage report
yarn test:coverage
```

## 🚀 Deployment

```bash
# Build per produzione
yarn build

# Preview locale
yarn preview
```

## 🔧 Sviluppo

### Aggiungere un nuovo componente

```tsx
// src/Components/MyComponent.tsx
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <button className="btn btn-primary" onClick={onAction}>
          Action
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
```

### Aggiungere una query

```tsx
// Con TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['my-data'],
  queryFn: () => fetchMyData(),
  staleTime: 5 * 60 * 1000, // 5 minuti
});

// Con custom hook
const { data, isLoading, error } = useMyDataQuery();
```

### Aggiungere una mutation

```tsx
// Con TanStack Query
const mutation = useMutation({
  mutationFn: (data) => updateData(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['my-data'] });
  },
});
```

## 📚 Risorse

- [React 19 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [TanStack Query](https://tanstack.com/query)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)