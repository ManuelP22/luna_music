import type { Context } from '@netlify/functions';
import type { GeoCountryResponse } from './contracts';

const fallbackCountryCode = process.env.DEFAULT_COUNTRY_CODE?.toUpperCase() || 'US';

const countryNameFormatter = new Intl.DisplayNames(['en'], { type: 'region' });

const getCountryName = (countryCode: string) => countryNameFormatter.of(countryCode) || countryCode;

export const getCountryNameFromCode = (countryCode: string) => getCountryName(countryCode.toUpperCase());

export const resolveCountryFromContext = (context: Context): GeoCountryResponse => {
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

  return {
    detected: false,
    countryCode: fallbackCountryCode,
    countryName: getCountryName(fallbackCountryCode),
    source: 'default',
  };
};
