import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { kindeClientID, kindeDomain, kindeRedirect, stripePublicKey } from './Utils/config'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AppRouter from './Controllers/Router'
import { QueryProvider } from './providers/QueryProvider'
import './Translations'
import './index.css'
import LoggerProvider from './hooks/Logger'

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
        <QueryProvider>
          <LoggerProvider>
            <Elements stripe={stripePromise}>
              <Router>
                <AppRouter />
              </Router>
            </Elements>
          </LoggerProvider>
        </QueryProvider>
      </KindeProvider>
    </StrictMode>
  )
} else {
  throw new Error('root element id is not in document')
}
