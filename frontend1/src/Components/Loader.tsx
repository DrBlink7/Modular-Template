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
      className="flex flex-col justify-center items-center h-screen"
      data-testid="loader-container"
    >
      <h2 className="text-2xl font-bold mb-4" data-testid="title">
        {title ?? t('loader.title')}
      </h2>
      <span className="loading loading-spinner loading-lg text-primary" data-testid="loader"></span>
      <p className="mt-4 text-base-content/70" data-testid="text">
        {text ?? t('loader.text')}
      </p>
    </div>
  )
}

export default Loader
