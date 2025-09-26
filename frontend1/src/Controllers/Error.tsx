import { type FC, useState, useEffect, Fragment } from 'react'
import { type WithChildren } from '../types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold mb-8 text-error">
            {t('error.title')}
          </h1>
          <h2 className="text-2xl mb-8 text-base-content">
            {errorMessage} 👨🏻‍💻
          </h2>
          <p className="text-base-content/70 mb-8">{t('error.body')}</p>
        </div>
        <div className="flex flex-row w-full mt-8 justify-between gap-4">
          <button className="btn btn-primary min-w-32" onClick={clearError}>
            {t('error.button')}
          </button>
          <button className="btn btn-secondary min-w-32" onClick={resetErrorBoundary}>
            {t('error.logout')}
          </button>
        </div>
      </ErrorLayout>
    )
  }

  return <Fragment>{children}</Fragment>
}

export default ErrorBoundary
