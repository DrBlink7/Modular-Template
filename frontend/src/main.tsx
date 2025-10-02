import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import { kindeClientID, kindeDomain, stripePublicKey } from './config'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import AppRouter from './controllers/Router'
import { QueryProvider } from './providers/QueryProvider'
import './i18n'
import './index.css'
import LoggerProvider from './hooks/Logger'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const stripePromise = loadStripe(stripePublicKey)
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <KindeProvider
        clientId={kindeClientID}
        domain={kindeDomain}
        logoutUri={window.location.origin + "/logout"}
        redirectUri={window.location.origin + "/login"}
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