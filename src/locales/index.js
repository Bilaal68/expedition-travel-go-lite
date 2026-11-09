import en from './en';
import am from './am';

export const translations = {
  en,
  am,
};

export const supportedLanguages = [
  {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    locale: 'en-US',
    flag: '🇬🇧',
  },
  {
    code: 'am',
    label: 'Amharic',
    nativeName: 'አማርኛ',
    locale: 'am-ET',
    flag: '🇪🇹',
  },
];

export const defaultLanguage = 'en';
