import { describe, expect, it, vi } from 'vitest';
import type { Context } from '@netlify/functions';

const loadGeoModule = async () => import('./geo');

describe('resolveCountryFromContext', () => {
  it('uses the country detected by Netlify geo context when available', async () => {
    const { resolveCountryFromContext } = await loadGeoModule();
    const request = new Request('https://luna-music.test/api/geo/country');
    const context = {
      geo: {
        country: {
          code: 'do',
          name: 'Dominican Republic',
        },
      },
    } as Context;

    expect(resolveCountryFromContext(request, context)).toEqual({
      detected: true,
      countryCode: 'DO',
      countryName: 'Dominican Republic',
      source: 'geo',
    });
  });

  it('uses the request locale when geo data is missing but the browser exposes a region', async () => {
    vi.resetModules();
    const { resolveCountryFromContext } = await loadGeoModule();
    const request = new Request('https://luna-music.test/api/geo/country', {
      headers: {
        'accept-language': 'es-DO,es;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    expect(resolveCountryFromContext(request, {} as Context)).toEqual({
      detected: false,
      countryCode: 'DO',
      countryName: 'Dominican Republic',
      source: 'locale',
    });
  });

  it('falls back to the configured default country when geo and locale are missing', async () => {
    vi.resetModules();
    const originalCountryCode = process.env.DEFAULT_COUNTRY_CODE;
    process.env.DEFAULT_COUNTRY_CODE = 'br';

    const { resolveCountryFromContext } = await loadGeoModule();
    const request = new Request('https://luna-music.test/api/geo/country');

    expect(resolveCountryFromContext(request, {} as Context)).toEqual({
      detected: false,
      countryCode: 'BR',
      countryName: 'Brazil',
      source: 'default',
    });

    process.env.DEFAULT_COUNTRY_CODE = originalCountryCode;
  });
});
