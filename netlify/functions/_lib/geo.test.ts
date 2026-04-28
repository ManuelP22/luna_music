import { describe, expect, it, vi } from 'vitest';
import type { Context } from '@netlify/functions';

const loadGeoModule = async () => import('./geo');

describe('resolveCountryFromContext', () => {
  it('uses the country detected by Netlify geo context when available', async () => {
    const { resolveCountryFromContext } = await loadGeoModule();
    const context = {
      geo: {
        country: {
          code: 'do',
          name: 'Dominican Republic',
        },
      },
    } as Context;

    expect(resolveCountryFromContext(context)).toEqual({
      detected: true,
      countryCode: 'DO',
      countryName: 'Dominican Republic',
      source: 'geo',
    });
  });

  it('falls back to the configured default country when geo data is missing', async () => {
    vi.resetModules();
    const originalCountryCode = process.env.DEFAULT_COUNTRY_CODE;
    process.env.DEFAULT_COUNTRY_CODE = 'br';

    const { resolveCountryFromContext } = await loadGeoModule();

    expect(resolveCountryFromContext({} as Context)).toEqual({
      detected: false,
      countryCode: 'BR',
      countryName: 'Brazil',
      source: 'default',
    });

    process.env.DEFAULT_COUNTRY_CODE = originalCountryCode;
  });
});
