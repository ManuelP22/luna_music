import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { GeoCountryResponse } from '../types/music';
import { lunaApi } from '../services/lunaApi';
import { translations } from './dictionary';
import { getLocaleForCountryCode } from './countries';
import type { I18nContextValue, Locale, TranslationParams } from './types';

const I18nContext = createContext<I18nContextValue | null>(null);
const LOCALE_STORAGE_KEY = 'luna-preferred-locale';

const readStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return storedLocale === 'en' || storedLocale === 'es' ? storedLocale : null;
};

const interpolate = (value: string, params?: TranslationParams) => {
  if (!params) return value;

  return Object.entries(params).reduce(
    (result, [key, replacement]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(replacement)),
    value,
  );
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const storedLocaleRef = useRef(readStoredLocale());
  const hasManualLocaleRef = useRef(storedLocaleRef.current !== null);
  const [locale, setLocaleState] = useState<Locale>(storedLocaleRef.current ?? 'en');
  const [geoCountry, setGeoCountry] = useState<GeoCountryResponse | null>(null);
  const [geoError, setGeoError] = useState<Error | null>(null);
  const [isResolvingLocale, setIsResolvingLocale] = useState(true);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    hasManualLocaleRef.current = true;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const resolveGeoCountry = async () => {
      try {
        const result = await lunaApi.getGeoCountry();

        if (isCancelled) return;

        setGeoCountry(result);
        setGeoError(null);

        if (!hasManualLocaleRef.current) {
          setLocaleState(getLocaleForCountryCode(result.countryCode));
        }
      } catch (error) {
        if (isCancelled) return;

        setGeoError(error instanceof Error ? error : new Error('Unable to resolve locale'));

        if (!hasManualLocaleRef.current) {
          setLocaleState('en');
        }
      } finally {
        if (!isCancelled) {
          setIsResolvingLocale(false);
        }
      }
    };

    resolveGeoCountry();

    return () => {
      isCancelled = true;
    };
  }, []);

  const t = (key: string, params?: TranslationParams) => {
    const value = translations[locale][key] ?? translations.en[key] ?? key;
    return interpolate(value, params);
  };

  const formatCountryName = (countryCode?: string | null, fallbackName?: string | null) => {
    if (!countryCode) return fallbackName || '';

    const formatter = new Intl.DisplayNames([locale], { type: 'region' });

    return formatter.of(countryCode.toUpperCase()) || fallbackName || countryCode;
  };

  const contextValue = useMemo(() => ({
    locale,
    setLocale,
    t,
    geoCountry,
    geoError,
    isResolvingLocale,
    formatCountryName,
  }), [locale, geoCountry, geoError, isResolvingLocale]);

  return (
    <I18nContext.Provider
      value={contextValue}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
};
