import { findBestDeezerTrackMatch } from './deezer';
import { ApiError, fetchJson } from '../http';

type LastFmTrack = {
  name: string;
  artist: {
    name: string;
  };
};

type LastFmGeoTopTracksResponse = {
  tracks?: {
    track?: LastFmTrack[];
  };
};

type LastFmSimilarTracksResponse = {
  similartracks?: {
    track?: Array<{
      name: string;
      artist: {
        name: string;
      };
    }>;
  };
};

const LASTFM_API_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

const getLastFmApiKey = () => process.env.LASTFM_API_KEY?.trim();

const requireLastFmApiKey = () => {
  const apiKey = getLastFmApiKey();

  if (!apiKey) {
    throw new ApiError(
      503,
      'PROVIDER_NOT_CONFIGURED',
      'Last.fm integration is not configured yet. Add LASTFM_API_KEY to enable this endpoint.',
      false,
    );
  }

  return apiKey;
};

const buildLastFmUrl = (params: Record<string, string>) => {
  const apiKey = requireLastFmApiKey();
  const searchParams = new URLSearchParams({
    ...params,
    api_key: apiKey,
    format: 'json',
  });

  return `${LASTFM_API_BASE_URL}?${searchParams.toString()}`;
};

export const getLastFmCountryTracks = async (countryName: string, limit: number) => {
  const url = buildLastFmUrl({
    method: 'geo.gettoptracks',
    country: countryName,
    limit: String(limit),
  });

  const response = await fetchJson<LastFmGeoTopTracksResponse>(url);
  const tracks = response.tracks?.track ?? [];
  const enriched = await Promise.all(
    tracks.map((track) => findBestDeezerTrackMatch(track.name, track.artist.name)),
  );

  return enriched.filter(Boolean);
};

export const getLastFmSimilarTracks = async (artistName: string, trackName: string, limit: number) => {
  const url = buildLastFmUrl({
    method: 'track.getsimilar',
    artist: artistName,
    track: trackName,
    limit: String(limit),
    autocorrect: '1',
  });

  const response = await fetchJson<LastFmSimilarTracksResponse>(url);
  const tracks = response.similartracks?.track ?? [];
  const enriched = await Promise.all(
    tracks.map((track) => findBestDeezerTrackMatch(track.name, track.artist.name)),
  );

  return enriched.filter(Boolean);
};
