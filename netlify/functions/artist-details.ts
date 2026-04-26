import type { Config, Context } from '@netlify/functions';
import { mapDeezerArtistToDetails, getDeezerArtist, getDeezerArtistTopTracks } from './_lib/providers/deezer';
import { assertGetRequest, errorResponse, getLimit, jsonResponse, ApiError } from './_lib/http';
import { parseArtistId } from './_lib/ids';

export default async (request: Request, context: Context) => {
  try {
    assertGetRequest(request);

    const artistParam = context.params.id;

    if (!artistParam || Array.isArray(artistParam)) {
      throw new ApiError(400, 'INVALID_REQUEST', 'Artist id is required', false);
    }

    const { provider, externalId } = parseArtistId(artistParam);

    if (provider !== 'deezer') {
      throw new ApiError(400, 'UNSUPPORTED_PROVIDER', `Unsupported artist provider: ${provider}`, false);
    }

    const limit = getLimit(request, 10);
    const [artist, topTracks] = await Promise.all([
      getDeezerArtist(externalId),
      getDeezerArtistTopTracks(externalId, limit),
    ]);

    return jsonResponse(mapDeezerArtistToDetails(artist, topTracks.data));
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/artists/:id',
};
