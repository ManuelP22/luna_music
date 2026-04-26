import type { ApiErrorBody } from './contracts';

export class ApiError extends Error {
  status: number;
  code: string;
  retryable: boolean;
  details?: unknown;

  constructor(status: number, code: string, message: string, retryable = false, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.retryable = retryable;
    this.details = details;
  }
}

export const jsonResponse = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...(init.headers ?? {}),
    },
  });

export const errorResponse = (error: unknown) => {
  if (error instanceof ApiError) {
    const body: ApiErrorBody = {
      code: error.code,
      message: error.message,
      retryable: error.retryable,
      ...(error.details !== undefined ? { details: error.details } : {}),
    };

    return jsonResponse(body, { status: error.status });
  }

  const body: ApiErrorBody = {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Unexpected server error',
    retryable: false,
  };

  return jsonResponse(body, { status: 500 });
};

export const assertGetRequest = (request: Request) => {
  if (request.method !== 'GET') {
    throw new ApiError(405, 'METHOD_NOT_ALLOWED', 'Only GET requests are supported', false);
  }
};

export const getRequiredSearchParam = (request: Request, name: string) => {
  const value = new URL(request.url).searchParams.get(name)?.trim();

  if (!value) {
    throw new ApiError(400, 'INVALID_REQUEST', `Missing required query parameter: ${name}`, false);
  }

  return value;
};

export const getLimit = (request: Request, fallback = 20) => {
  const rawLimit = new URL(request.url).searchParams.get('limit');

  if (!rawLimit) return fallback;

  const parsed = Number(rawLimit);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new ApiError(400, 'INVALID_REQUEST', 'Query parameter "limit" must be a positive number', false);
  }

  return Math.min(Math.floor(parsed), 50);
};

export const fetchJson = async <T,>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      response.status >= 500 ? 502 : response.status,
      'UPSTREAM_REQUEST_FAILED',
      `Upstream provider request failed with status ${response.status}`,
      response.status >= 500,
      payload,
    );
  }

  return payload as T;
};
