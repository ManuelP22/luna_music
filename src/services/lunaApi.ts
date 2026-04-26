import type {
  ArtistChartResponse,
  ArtistDetails,
  ChartResponse,
  GeoCountryResponse,
  SearchResults,
  TrackDetails,
} from '../types/music';

type ApiErrorResponse = {
  code?: string;
  message?: string;
};

const resolveApiBaseUrl = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:8888';
  }

  return '';
};

const API_BASE_URL = resolveApiBaseUrl();

const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`;

const fetchJson = async <T,>(path: string): Promise<T> => {
  const response = await fetch(buildApiUrl(path));

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as ApiErrorResponse | null;
    throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const lunaApi = {
  getGlobalCharts: () => fetchJson<ChartResponse>('/api/charts/global'),
  getTopArtists: () => fetchJson<ArtistChartResponse>('/api/charts/artists'),
  getGenreCharts: (genre: string) => fetchJson<ChartResponse>(`/api/charts/genre/${encodeURIComponent(genre)}`),
  getCountryCharts: (countryCode: string) => fetchJson<ChartResponse>(`/api/charts/country/${encodeURIComponent(countryCode)}`),
  getTrackDetails: (trackId: string) => fetchJson<TrackDetails>(`/api/tracks/${encodeURIComponent(trackId)}`),
  getArtistDetails: (artistId: string) => fetchJson<ArtistDetails>(`/api/artists/${encodeURIComponent(artistId)}`),
  getSearchResults: (query: string) => fetchJson<SearchResults>(`/api/search?q=${encodeURIComponent(query)}`),
  getGeoCountry: () => fetchJson<GeoCountryResponse>('/api/geo/country'),
};
