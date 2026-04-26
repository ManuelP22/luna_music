import type { Config, Context } from '@netlify/functions';
import { getDeezerGenreTracks, mapDeezerTrackToSummary } from './_lib/providers/deezer';
import { assertGetRequest, errorResponse, getLimit, jsonResponse, ApiError } from './_lib/http';
import { resolveDeezerGenre } from './_lib/genres';

export default async (request: Request, context: Context) => {
  try {
    assertGetRequest(request);

    const genreParam = context.params.genre;

    if (!genreParam || Array.isArray(genreParam)) {
      throw new ApiError(400, 'INVALID_REQUEST', 'Genre is required', false);
    }

    const genre = resolveDeezerGenre(genreParam);

    if (!genre) {
      throw new ApiError(400, 'INVALID_REQUEST', `Unsupported genre: ${genreParam}`, false);
    }

    const limit = getLimit(request);
    const response = await getDeezerGenreTracks(genre.id, limit);

    return jsonResponse({
      type: 'genre',
      title: `${genre.title} Charts`,
      genre: genreParam.toUpperCase(),
      tracks: response.data.map((track) => mapDeezerTrackToSummary(track, { genre: genreParam.toUpperCase() })),
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/charts/genre/:genre',
};
