import type { Config, Context } from '@netlify/functions';
import { getDeezerTopArtists, mapDeezerArtistToSummary } from './_lib/providers/deezer';
import { assertGetRequest, errorResponse, getLimit, jsonResponse } from './_lib/http';

export default async (request: Request, _context: Context) => {
  try {
    assertGetRequest(request);

    const limit = getLimit(request, 10);
    const response = await getDeezerTopArtists(limit);

    return jsonResponse({
      title: 'Top Artists',
      artists: response.data.map((artist) => mapDeezerArtistToSummary(artist)),
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/charts/artists',
};
