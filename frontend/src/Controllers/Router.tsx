import { type FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const mainColor = '#1C2E3A'
const secondaryColor = '#579298'

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
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/login"
          element={<>Login</>
          }
        />
        <Route
          path="/"
          element={
            <>Home</>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  )
}

export default Router
