import { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { mainColor, secondaryColor } from '../Utils/config'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import ErrorBoundary from './Error'
import Login from './Login'
import Home from './Home'
import Success from './Success'
import Failure from './Failure'
import Loader from '../Components/Loader'
import Product from './Product'

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: {
      main: secondaryColor
    }
  }
})

const Router: FC = () => {
  const { isAuthenticated, isLoading } = useKindeAuth()

  if (isLoading) return <Loader />

  return <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/success" element={isAuthenticated ? <Success /> : <Navigate to="/login" />} />
        <Route path="/failure" element={isAuthenticated ? <Failure /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  </ErrorBoundary>
}

export default Router
