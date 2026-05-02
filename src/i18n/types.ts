import type { GeoCountryResponse } from '../types/music';

export type Locale = 'en' | 'es';

export type TranslationParams = Record<string, string | number>;

export type Translator = (key: string, params?: TranslationParams) => string;

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translator;
  geoCountry: GeoCountryResponse | null;
  geoError: Error | null;
  isResolvingLocale: boolean;
  formatCountryName: (countryCode?: string | null, fallbackName?: string | null) => string;
};
