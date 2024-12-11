import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import en from './en'
import it from './it'

await i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false
  },
  resources: {
    en: {
      translation: en
    },
    it: {
      translation: it
    }
  }
})

export default i18n
