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
      className="min-h-screen bg-gradient-to-br from-primary to-secondary font-montserrat flex flex-col justify-center items-center p-4"
      data-testid="loader-container"
    >
      <div className="card bg-neutral-content/10 backdrop-blur-sm shadow-2xl p-8 max-w-md w-full border border-neutral-content/20">
        <div className="card-body text-center text-neutral-content">
          {/* Logo */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-2xl mb-4">
              <span className="text-3xl text-primary-content">🚀</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4" data-testid="title">
            {title ?? t('loader.title')}
          </h2>

          {/* Spinner */}
          <div className="flex justify-center mb-6">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>

          {/* Text */}
          <p className="text-neutral-content/70 text-lg" data-testid="text">
            {text ?? t('loader.text')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loader