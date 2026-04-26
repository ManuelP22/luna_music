import type { Config, Context } from '@netlify/functions';
import { getDeezerTrack, mapDeezerTrackToDetails } from './_lib/providers/deezer';
import { getLastFmSimilarTracks } from './_lib/providers/lastfm';
import { assertGetRequest, errorResponse, getLimit, jsonResponse, ApiError } from './_lib/http';
import { parseTrackId } from './_lib/ids';

export default async (request: Request, context: Context) => {
  try {
    assertGetRequest(request);

    const trackParam = context.params.id;

    if (!trackParam || Array.isArray(trackParam)) {
      throw new ApiError(400, 'INVALID_REQUEST', 'Track id is required', false);
    }

    const { provider, externalId } = parseTrackId(trackParam);

    if (provider !== 'deezer') {
      throw new ApiError(400, 'UNSUPPORTED_PROVIDER', `Unsupported track provider: ${provider}`, false);
    }

    const track = await getDeezerTrack(externalId);

    let relatedTracks = [];

    try {
      relatedTracks = await getLastFmSimilarTracks(track.artist?.name ?? '', track.title, getLimit(request, 5));
    } catch {
      relatedTracks = [];
    }

    return jsonResponse(mapDeezerTrackToDetails(track, { relatedTracks }));
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/tracks/:id',
};
