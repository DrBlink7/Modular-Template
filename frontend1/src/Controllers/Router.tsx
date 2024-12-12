import { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { mainColor, secondaryColor } from '../Utils/config'
import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import ErrorBoundary from './Error'
import Login from './Login'
import Home from './Home'

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
  const { isAuthenticated } = useKindeAuth()

  return <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  </ErrorBoundary>
}

export default Router
