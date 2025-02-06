import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { kindeClientID, kindeDomain, kindeRedirect, stripePublicKey } from './Utils/config'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AppRouter from './Controllers/Router'
import LoggerProvider from './Hooks/Logger'
import store from './Store'
import './Translations'
import './index.css'

if ((kindeDomain == null) || (kindeRedirect == null)) { throw new Error('Configure kindeDomain and kindeRedirect in your .env ') }

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const stripePromise = loadStripe(stripePublicKey)
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <KindeProvider
        clientId={kindeClientID}
        domain={kindeDomain}
        redirectUri={kindeRedirect}
      >
        <Provider store={store}>
          <LoggerProvider>
            <Elements stripe={stripePromise}>
              <Router>
                <AppRouter />
              </Router>
            </Elements>
          </LoggerProvider>
        </Provider>
      </KindeProvider>
    </StrictMode>
  )
} else {
  throw new Error('root element id is not in document')
}
