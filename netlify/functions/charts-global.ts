import type { Config, Context } from '@netlify/functions';
import { getDeezerTopTracks, mapDeezerTrackToSummary } from './_lib/providers/deezer';
import { assertGetRequest, errorResponse, getLimit, jsonResponse } from './_lib/http';

export default async (request: Request, _context: Context) => {
  try {
    assertGetRequest(request);

    const limit = getLimit(request);
    const response = await getDeezerTopTracks(limit);

    return jsonResponse({
      type: 'global',
      title: 'Top Charts',
      tracks: response.data.map((track) => mapDeezerTrackToSummary(track)),
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/charts/global',
};
