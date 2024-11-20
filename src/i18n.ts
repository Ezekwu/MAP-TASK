import firebaseErrors from '../public/locales/firebase/errors.json';
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


