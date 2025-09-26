import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import ErrorLayout from './ErrorLayout'

interface ErrorComponentProps {
  msg?: string
  clearError: () => void
}

const ErrorComponent: FC<ErrorComponentProps> = ({
  msg = 'Houston!',
  clearError
}) => {
  const { t } = useTranslation()

  return (
    <ErrorLayout>
      <div
        className="flex flex-col items-center text-center"
        data-testid="error-component"
      >
        <h1 className="text-6xl font-bold mb-8 text-error" data-testid="error-title">
          {t('error.title')}
        </h1>
        <h2
          className="text-2xl mb-8 text-base-content"
          data-testid="error-msg"
        >
          {msg}
        </h2>
        <p className="text-base-content/70 mb-8">{t('error.body')}</p>
        <button
          className="btn btn-primary btn-lg w-48"
          onClick={clearError}
          data-testid="error-button"
        >
          {t('error.button')}
        </button>
      </div>
    </ErrorLayout>
  )
}

export default ErrorComponent
