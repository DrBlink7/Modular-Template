import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageSelectorProps {
  className?: string
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n } = useTranslation()

  const changeLanguage = async (lng: string | undefined): Promise<void> => {
    await i18n.changeLanguage(lng)
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedLanguage = event.target.value
    void changeLanguage(selectedLanguage)
  }

  return (
    <div
      className={`flex justify-center w-full ${className}`}
      data-testid="language-selector"
    >
      <div className="card bg-base-100 shadow-lg w-full" data-testid="language-paper">
        <div className="card-body p-4">
          <select
            className="select select-bordered w-full"
            value={i18n.language}
            onChange={handleLanguageChange}
            data-testid="language-select"
          >
            <option value="en">🇬🇧🇨🇦 English 🇦🇺🇺🇸</option>
            <option value="it">🇮🇹🇸🇲 Italiano 🇻🇦🇮🇹</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
