# Frontend
Frontend will run (by default) on 5173 port.

```sh
PORT= #default is 5173
VITE_APP_AUTHORIZATION= #the header on which you'll send the token, default is authorization
VITE_APP_SECRET_KEY= #a secret key to hash the redux store, (ex. unaChiaveSegreta)
VITE_APP_BASE_URL= #your FE hosted url ex. http://localhost:5173
VITE_APP_BE_URL= #your BE hosted url ex. http://localhost:3001
```

## Kinde
We implemented Login with kinde, to change kinde auth set your configuration of these env vars

```sh
VITE_APP_KINDE_CLIENT_ID= #set your kinde clint id
VITE_APP_KINDE_DOMAIN= #set your kinde domain
VITE_APP_KINDE_REDIRECT_URL= #set desired redirect url
```

## Stripe
We Implemented Stripe as payment service, You need to configure your stripe to have two products to sell, then you need to set these env vars:
```sh
VITE_STRIPE_PUBLIC_KEY= #the public key you find on stripe dashboard
```

## Dev settings
We use React + TypeScript + Vite. This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration
If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '19.0' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
})
```