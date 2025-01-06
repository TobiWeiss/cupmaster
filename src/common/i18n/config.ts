import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { de } from './locales/de';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      de
    },
    lng: 'de', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;