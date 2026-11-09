import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, supportedLanguages, defaultLanguage } from '../locales';

const LanguageContext = createContext({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key,
  getLocalized: (item, field) => '',
  formatDate: (date) => '',
  formatNumber: (num) => '',
  formatPrice: (amount) => '',
  supportedLanguages: [],
  languages: [],
  currentLangConfig: null,
});

export const STORAGE_KEY = 'hm_travel_preferred_language';

export function LanguageProvider({ children }) {
  // Determine initial language
  const [language, setLanguageState] = useState(() => {
    // 1. Check URL query params (?lang=om / ?lang=am / ?lang=en)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang && supportedLanguages.some((l) => l.code === urlLang)) {
        try {
          localStorage.setItem(STORAGE_KEY, urlLang);
        } catch (_) {}
        return urlLang;
      }

      // 2. Check localStorage
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && supportedLanguages.some((l) => l.code === saved)) {
          return saved;
        }
      } catch (_) {}

      // 3. Check browser language
      const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
      if (browserLang && supportedLanguages.some((l) => l.code === browserLang)) {
        return browserLang;
      }
    }

    return defaultLanguage;
  });

  // Current language config object
  const currentLangConfig = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  // Keep html tag and URL synced with current language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }

    // Sync localStorage
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {}

    // Update URL query parameter without causing page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== language) {
        url.searchParams.set('lang', language);
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [language]);

  const setLanguage = useCallback((newLang) => {
    if (supportedLanguages.some((l) => l.code === newLang)) {
      setLanguageState(newLang);
    }
  }, []);

  /**
   * Translate a key with optional parameter interpolation
   * e.g. t('nav.home') or t('home.destinations.tourCount', { count: 5 })
   */
  const t = useCallback(
    (keyPath, params = {}) => {
      if (!keyPath || typeof keyPath !== 'string') return '';

      const keys = keyPath.split('.');

      // Helper to traverse object
      const getNested = (obj) => {
        let current = obj;
        for (const k of keys) {
          if (current == null || typeof current !== 'object') return undefined;
          current = current[k];
        }
        return current;
      };

      // 1. Try active language
      let val = getNested(translations[language]);

      // 2. Fallback to English if missing
      if (val === undefined && language !== 'en') {
        val = getNested(translations.en);
      }

      // 3. Fallback: NEVER return raw translation keys (e.g. admin.toursTitle)
      if (val === undefined) {
        const lastPart = keys[keys.length - 1] || keyPath;
        const readable = lastPart
          .replace(/([A-Z])/g, ' $1')
          .replace(/[_-]+/g, ' ')
          .trim();
        return readable ? readable.charAt(0).toUpperCase() + readable.slice(1) : '';
      }

      // If string, interpolate params: {count}, {date}, etc.
      if (typeof val === 'string') {
        return val.replace(/\{(\w+)\}/g, (_, match) => {
          return params[match] !== undefined ? String(params[match]) : `{${match}}`;
        });
      }

      return val;
    },
    [language]
  );

  /**
   * Helper to localize dynamic database records (tours, destinations, blog posts)
   * Supports:
   * 1. item.translations?.[lang]?.[field]
   * 2. item[field + '_' + lang] (e.g. title_om, overview_am)
   * 3. item[field] (base/default)
   */
  const getLocalized = useCallback(
    (item, field) => {
      if (!item || !field) return '';

      // Check translations object (Supabase JSONB pattern)
      if (item.translations && item.translations[language] && item.translations[language][field] !== undefined) {
        return item.translations[language][field];
      }

      // Check field_lang column (e.g. title_om, overview_am)
      const langKey = `${field}_${language}`;
      if (item[langKey] !== undefined && item[langKey] !== null && item[langKey] !== '') {
        return item[langKey];
      }

      // Fallback to base field (English or default)
      return item[field] !== undefined && item[field] !== null ? item[field] : '';
    },
    [language]
  );

  /**
   * Date formatting based on active locale
   */
  const formatDate = useCallback(
    (dateValue, options = {}) => {
      if (!dateValue) return '';
      try {
        const date = typeof dateValue === 'string' || typeof dateValue === 'number' 
          ? new Date(dateValue) 
          : dateValue;
        
        if (isNaN(date.getTime())) return String(dateValue);

        const localeMap = {
          en: 'en-US',
          am: 'am-ET',
        };

        return new Intl.DateTimeFormat(localeMap[language] || 'en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          ...options,
        }).format(date);
      } catch (err) {
        return String(dateValue);
      }
    },
    [language]
  );

  /**
   * Number formatting based on active locale
   */
  const formatNumber = useCallback(
    (num, options = {}) => {
      if (num === null || num === undefined) return '';
      try {
        const localeMap = {
          en: 'en-US',
          am: 'am-ET',
        };
        return new Intl.NumberFormat(localeMap[language] || 'en-US', options).format(num);
      } catch (err) {
        return String(num);
      }
    },
    [language]
  );

  /**
   * Price formatting (keeps original value intact while presenting cleanly)
   */
  const formatPrice = useCallback(
    (amount, currency = 'ETB') => {
      if (!amount && amount !== 0) return '';
      const formattedNum = formatNumber(amount);
      if (language === 'am') {
        return `${formattedNum} ብር`;
      }
      return `${currency} ${formattedNum}`;
    },
    [language, formatNumber]
  );

  const value = {
    language,
    setLanguage,
    t,
    getLocalized,
    formatDate,
    formatNumber,
    formatPrice,
    supportedLanguages,
    languages: supportedLanguages,
    currentLangConfig,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
