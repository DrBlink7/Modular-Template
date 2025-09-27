import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface LoaderProps {
  title?: string
  text?: string
}

const Loader: FC<LoaderProps> = ({ title, text }) => {
  const { t } = useTranslation()

  return (
    <div
      className="min-h-screen bg-base-100 flex flex-col justify-center items-center p-4"
      data-testid="loader-container"
    >
      <div className="card bg-base-200 shadow-xl p-8 max-w-md w-full">
        <div className="card-body text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
              <span className="text-2xl text-primary-content">👤</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-base-content mb-4" data-testid="title">
            {title ?? t('loader.title')}
          </h2>

          {/* Spinner */}
          <div className="flex justify-center mb-6">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>

          {/* Text */}
          <p className="text-base-content/70 text-lg" data-testid="text">
            {text ?? t('loader.text')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loader