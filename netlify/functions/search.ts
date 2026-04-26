import type { Config, Context } from '@netlify/functions';
import { getDeezerSearchResults } from './_lib/providers/deezer';
import { assertGetRequest, errorResponse, getLimit, getRequiredSearchParam, jsonResponse } from './_lib/http';

export default async (request: Request, _context: Context) => {
  try {
    assertGetRequest(request);

    const query = getRequiredSearchParam(request, 'q');
    const limit = getLimit(request, 10);
    const results = await getDeezerSearchResults(query, limit);

    return jsonResponse(results);
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/search',
};
