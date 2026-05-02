import type { Locale } from './types';

const SPANISH_SPEAKING_COUNTRIES = new Set([
  'AR',
  'BO',
  'CL',
  'CO',
  'CR',
  'CU',
  'DO',
  'EC',
  'SV',
  'ES',
  'GQ',
  'GT',
  'HN',
  'MX',
  'NI',
  'PA',
  'PE',
  'PR',
  'PY',
  'UY',
  'VE',
]);

export const getLocaleForCountryCode = (countryCode?: string | null): Locale => {
  if (!countryCode) return 'en';

  return SPANISH_SPEAKING_COUNTRIES.has(countryCode.toUpperCase()) ? 'es' : 'en';
};
