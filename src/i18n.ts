import firebaseErrors from '@/locales/en/errors.json';
import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        ...firebaseErrors, 
      },
    },
  },
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n


