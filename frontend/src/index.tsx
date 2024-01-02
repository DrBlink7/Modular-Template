import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { environment } from './Utils/config'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './Controllers/Router'
import LoggerProvider from './Hooks/Logger'
import './index.css'

const rootElement = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootElement!)

root.render(
  environment === 'DEV'
    ? (
      <LoggerProvider>
        <Router>
          <AppRouter />
        </Router>
      </LoggerProvider>
    )
    : (
      <StrictMode>
        <LoggerProvider>
          <Router>
            <AppRouter />
          </Router>
        </LoggerProvider>
      </StrictMode>
    )
)
