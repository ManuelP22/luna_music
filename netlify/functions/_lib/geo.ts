import type { Context } from '@netlify/functions';
import type { GeoCountryResponse } from './contracts';

const fallbackCountryCode = process.env.DEFAULT_COUNTRY_CODE?.toUpperCase() || 'US';

const countryNameFormatter = new Intl.DisplayNames(['en'], { type: 'region' });

const getCountryName = (countryCode: string) => countryNameFormatter.of(countryCode) || countryCode;

const extractCountryCodeFromLanguageTag = (languageTag: string) => {
  const normalized = languageTag.trim().split(';')[0].replace('_', '-');
  const regionMatch = normalized.match(/-([A-Za-z]{2})(?:-|$)/);

  return regionMatch?.[1]?.toUpperCase() ?? null;
};

const resolveCountryCodeFromAcceptLanguage = (headerValue: string | null) => {
  if (!headerValue) return null;

  return headerValue
    .split(',')
    .map((languageTag) => extractCountryCodeFromLanguageTag(languageTag))
    .find((regionCode): regionCode is string => Boolean(regionCode)) ?? null;
};

export const getCountryNameFromCode = (countryCode: string) => getCountryName(countryCode.toUpperCase());

export const resolveCountryFromContext = (request: Request, context: Context): GeoCountryResponse => {
  const detectedCode = context.geo?.country?.code?.toUpperCase();
  const detectedName = context.geo?.country?.name;

  if (detectedCode && detectedName) {
    return {
      detected: true,
      countryCode: detectedCode,
      countryName: detectedName,
      source: 'geo',
    };
  }

  const localeCountryCode = resolveCountryCodeFromAcceptLanguage(request.headers.get('accept-language'));

  if (localeCountryCode) {
    return {
      detected: false,
      countryCode: localeCountryCode,
      countryName: getCountryName(localeCountryCode),
      source: 'locale',
    };
  }

  return {
    detected: false,
    countryCode: fallbackCountryCode,
    countryName: getCountryName(fallbackCountryCode),
    source: 'default',
  };
};
