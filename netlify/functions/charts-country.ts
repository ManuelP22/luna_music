import type { Config, Context } from '@netlify/functions';
import { getLastFmCountryTracks } from './_lib/providers/lastfm';
import { assertGetRequest, errorResponse, getLimit, jsonResponse, ApiError } from './_lib/http';
import { getCountryNameFromCode } from './_lib/geo';

export default async (request: Request, context: Context) => {
  try {
    assertGetRequest(request);

    const countryParam = context.params.country;

    if (!countryParam || Array.isArray(countryParam)) {
      throw new ApiError(400, 'INVALID_REQUEST', 'Country code is required', false);
    }

    const countryCode = countryParam.toUpperCase();

    if (!/^[A-Z]{2}$/.test(countryCode)) {
      throw new ApiError(400, 'INVALID_REQUEST', 'Country code must be a valid ISO alpha-2 code', false);
    }

    const limit = getLimit(request);
    const countryName = getCountryNameFromCode(countryCode);
    const tracks = await getLastFmCountryTracks(countryName, limit);

    return jsonResponse({
      type: 'country',
      title: `Top Charts in ${countryName}`,
      countryCode,
      tracks,
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/charts/country/:country',
};
