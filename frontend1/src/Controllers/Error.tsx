import { useCallback, type FC, useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { type WithChildren } from '../exportedTypes'
import ErrorLayout from '../Components/ErrorLayout'
import * as ls from '../Utils/ls'
import { useLogger } from '../hooks/Logger'

const ErrorBoundary: FC<WithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const Logger = useLogger()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const resetErrorBoundary = useCallback(() => {
    ls.del('YOUR_PROJECT')
    setErrorMessage(null)
    void navigate('/login')
    window.location.reload()
  }, [navigate])

  const clearError = useCallback(() => {
    setErrorMessage(null)
    void navigate('/login')
  }, [navigate])

  useEffect(() => {
    const handleError = (error: ErrorEvent | Event): void => {
      error instanceof ErrorEvent ? setErrorMessage(error.message) : setErrorMessage(error.type)
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
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-error mb-4">
              {t('error.title')}
            </h1>
            <h2 className="text-xl text-error-content mb-4">
              {errorMessage} 👨🏻‍💻
            </h2>
            <p className="text-base-content/70">{t('error.body')}</p>
          </div>
          <div className="flex flex-row gap-4 w-full justify-center">
            <button
              className="btn btn-primary min-w-[15vw]"
              onClick={clearError}
            >
              {t('error.button')}
            </button>
            <button
              className="btn btn-secondary min-w-[15vw]"
              onClick={resetErrorBoundary}
            >
              {t('error.logout')}
            </button>
          </div>
        </div>
      </ErrorLayout>
    )
  }

  return <Fragment>{children}</Fragment>
}

export default ErrorBoundary

