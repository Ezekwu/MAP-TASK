import en from '@/locales/en.json'
import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en
    },
  },
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n


