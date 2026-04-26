import type { Config, Context } from '@netlify/functions';
import { resolveCountryFromContext } from './_lib/geo';
import { assertGetRequest, errorResponse, jsonResponse } from './_lib/http';

export default async (request: Request, context: Context) => {
  try {
    assertGetRequest(request);
    return jsonResponse(resolveCountryFromContext(context));
  } catch (error) {
    return errorResponse(error);
  }
};

export const config: Config = {
  path: '/api/geo/country',
};
