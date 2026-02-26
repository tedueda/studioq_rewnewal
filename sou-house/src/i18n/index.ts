import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/common.json';
import ja from './locales/ja/common.json';
import ko from './locales/ko/common.json';
import zhHans from './locales/zh-hans/common.json';
import zhHant from './locales/zh-hant/common.json';

const resources = {
  en: { translation: en },
  ja: { translation: ja },
  ko: { translation: ko },
  'zh-hans': { translation: zhHans },
  'zh-hant': { translation: zhHant },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ja', 'ko', 'zh-hans', 'zh-hant'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
    },
  });

export default i18n;
