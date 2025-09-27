import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppRouter from './Controllers/Router'
import LoggerProvider from './hooks/Logger'
import store from './Store'
import './Translations'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <LoggerProvider>
          <Router>
            <AppRouter />
          </Router>
        </LoggerProvider>
      </Provider>
    </StrictMode>
  )
} else {
  throw new Error('root element id is not in document')
}
