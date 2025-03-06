# Frontend5

`frontend5` is a **frontend application** built with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.11.

## Description

This application leverages **AngularFire** to connect with **Firebase**, using Google as the authentication provider.  
The authentication process follows an **implicit login flow**, where the user is redirected to Google's authentication page without any custom login forms within the application.

### User Data Handling

⚠️ **The application does not read or store any sensitive user data from Google.**  
The only user information utilized is the **Firebase UID**, which is retrieved after authentication.

## Backend Integration

All HTTP requests to the backend are automatically intercepted by a dedicated **HTTP interceptor**.  
This interceptor retrieves the **Firebase ID Token** from the authenticated user and appends it to the request headers as:

```
Authorization: Bearer <token>
```

This ensures that all requests to the backend are properly authenticated.

## Technologies and Libraries

The application is built using:

- **Angular 15** – Core framework
- **Angular Material** – UI components (toolbar, buttons, etc.)
- **AngularFire** – Firebase integration (authentication)
- **RxJS** – Reactive programming library for state and data stream management
- **Karma & Jasmine** – Unit testing tools

## Firebase Configuration

The application uses `provideFirebaseApp()` and `provideAuth()` to configure Firebase and Firebase Authentication.  
The Firebase configuration should be added in `environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: '...',
    authDomain: '...',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...'
  }
};
```

## Running the Application

To install dependencies and start the application:

```bash
npm install
ng serve
```

then navigate to `http://localhost:4200/`

## Running Tests

To execute unit tests:

```bash
ng test
```

---
