import { type FC, useState, useEffect, Fragment } from 'react'
import { type WithChildren } from '../types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { useLogger } from '../Hooks/Logger'
import ErrorLayout from '../Components/ErrorLayout'
import * as ls from '../Utils/ls'

const ErrorBoundary: FC<WithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const Logger = useLogger()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const resetErrorBoundary = () => {
    ls.del('YOUR_PROJECT')
    setErrorMessage(null)
    void navigate('/login')
    window.location.reload()
  }

  const clearError = () => {
    setErrorMessage(null)
    void navigate('/login')
  }

  useEffect(() => {
    const handleError = (error: ErrorEvent | Event): void => {
      if (error instanceof ErrorEvent) setErrorMessage(error.message)
      else { setErrorMessage(error.type) }
      Logger.writeException(new Error((error as ErrorEvent).message))
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [Logger])

  if (errorMessage !== null) {
    return (
      <ErrorLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h1" sx={{ mb: 2.5 }}>
            {t('error.title')}
          </Typography>
          <Typography variant="h5" sx={{ mb: 2.5, fontSize: 'large' }}>
            {errorMessage} 👨🏻‍💻
          </Typography>
          <Typography variant="body2">{t('error.body')}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginTop: '4vh',
            justifyContent: 'space-between'
          }}
        >
          <Button variant="contained" onClick={clearError} sx={{ minWidth: '15vw' }}>
            {t('error.button')}
          </Button>
          <Button variant="contained" onClick={resetErrorBoundary} sx={{ minWidth: '15vw' }}>
            {t('error.logout')}
          </Button>
        </Box>
      </ErrorLayout>
    )
  }

  return <Fragment>{children}</Fragment>
}

export default ErrorBoundary
