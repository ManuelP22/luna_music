import type {
  ArtistDetails,
  ArtistSummary,
  ProviderRef,
  SearchResults,
  TrackDetails,
  TrackSummary,
} from '../contracts';
import { createArtistId, createTrackId } from '../ids';
import { fetchJson } from '../http';

const DEEZER_API_BASE_URL = 'https://api.deezer.com';

type DeezerArtist = {
  id: number;
  name: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
};

type DeezerAlbum = {
  id: number;
  title: string;
  cover?: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  release_date?: string;
};

type DeezerTrack = {
  id: number;
  title: string;
  title_short?: string;
  duration?: number;
  preview?: string;
  artist?: DeezerArtist;
  album?: DeezerAlbum;
  contributors?: DeezerArtist[];
};

type DeezerCollection<T> = {
  data: T[];
  total?: number;
};

type DeezerArtistDetails = DeezerArtist & {
  nb_album?: number;
  nb_fan?: number;
};

const buildProviderRefs = (track: DeezerTrack): ProviderRef[] => {
  const refs: ProviderRef[] = [
    {
      source: 'deezer',
      trackId: String(track.id),
      artistId: track.artist?.id ? String(track.artist.id) : undefined,
    },
  ];

  return refs;
};

export const mapDeezerTrackToSummary = (
  track: DeezerTrack,
  options?: { genre?: string | null; countryCode?: string | null },
): TrackSummary => ({
  id: createTrackId('deezer', track.id),
  providerRefs: buildProviderRefs(track),
  title: track.title,
  artistName: track.artist?.name ?? 'Unknown Artist',
  artistId: track.artist?.id ? createArtistId('deezer', track.artist.id) : undefined,
  albumName: track.album?.title,
  imageUrl: track.album?.cover_xl ?? track.album?.cover_big ?? track.album?.cover_medium ?? track.album?.cover,
  previewUrl: track.preview ?? null,
  durationSec: track.duration ?? null,
  genre: options?.genre ?? null,
  countryCode: options?.countryCode ?? null,
  isPlayable: Boolean(track.preview),
});

export const mapDeezerArtistToSummary = (artist: DeezerArtist, genre?: string | null): ArtistSummary => ({
  id: createArtistId('deezer', artist.id),
  name: artist.name,
  imageUrl: artist.picture_xl ?? artist.picture_big ?? artist.picture_medium ?? artist.picture,
  genre: genre ?? null,
});

export const mapDeezerTrackToDetails = (
  track: DeezerTrack & { release_date?: string },
  options?: { genre?: string | null; relatedTracks?: TrackSummary[] },
): TrackDetails => ({
  id: createTrackId('deezer', track.id),
  title: track.title,
  artistName: track.artist?.name ?? 'Unknown Artist',
  artistId: track.artist?.id ? createArtistId('deezer', track.artist.id) : undefined,
  albumName: track.album?.title,
  imageUrl: track.album?.cover_xl ?? track.album?.cover_big ?? track.album?.cover_medium ?? track.album?.cover,
  previewUrl: track.preview ?? null,
  durationSec: track.duration ?? null,
  genre: options?.genre ?? null,
  releaseDate: track.release_date ?? track.album?.release_date ?? null,
  lyrics: {
    available: false,
    lines: [],
  },
  relatedTracks: options?.relatedTracks ?? [],
  providerRefs: buildProviderRefs(track),
});

export const mapDeezerArtistToDetails = (
  artist: DeezerArtistDetails,
  topTracks: DeezerTrack[],
): ArtistDetails => ({
  id: createArtistId('deezer', artist.id),
  name: artist.name,
  imageUrl: artist.picture_xl ?? artist.picture_big ?? artist.picture_medium ?? artist.picture,
  genre: null,
  bio: null,
  topTracks: topTracks.map((track) => mapDeezerTrackToSummary(track)),
  providerRefs: [{ source: 'deezer', artistId: String(artist.id) }],
});

export const getDeezerTopTracks = async (limit: number) => fetchJson<DeezerCollection<DeezerTrack>>(`${DEEZER_API_BASE_URL}/chart/0/tracks?limit=${limit}`);

export const getDeezerTopArtists = async (limit: number) => fetchJson<DeezerCollection<DeezerArtist>>(`${DEEZER_API_BASE_URL}/chart/0/artists?limit=${limit}`);

export const getDeezerGenreTracks = async (genreId: number, limit: number) => fetchJson<DeezerCollection<DeezerTrack>>(`${DEEZER_API_BASE_URL}/chart/${genreId}/tracks?limit=${limit}`);

export const searchDeezerTracks = async (query: string, limit: number) => {
  const encoded = encodeURIComponent(query);
  return fetchJson<DeezerCollection<DeezerTrack>>(`${DEEZER_API_BASE_URL}/search?q=${encoded}&limit=${limit}`);
};

export const searchDeezerArtists = async (query: string, limit: number) => {
  const encoded = encodeURIComponent(query);
  return fetchJson<DeezerCollection<DeezerArtist>>(`${DEEZER_API_BASE_URL}/search/artist?q=${encoded}&limit=${limit}`);
};

export const getDeezerTrack = async (trackId: string) => fetchJson<DeezerTrack & { release_date?: string }>(`${DEEZER_API_BASE_URL}/track/${trackId}`);

export const getDeezerArtist = async (artistId: string) => fetchJson<DeezerArtistDetails>(`${DEEZER_API_BASE_URL}/artist/${artistId}`);

export const getDeezerArtistTopTracks = async (artistId: string, limit: number) => fetchJson<DeezerCollection<DeezerTrack>>(`${DEEZER_API_BASE_URL}/artist/${artistId}/top?limit=${limit}`);

export const getDeezerSearchResults = async (query: string, limit: number): Promise<SearchResults> => {
  const [tracks, artists] = await Promise.all([
    searchDeezerTracks(query, limit),
    searchDeezerArtists(query, limit),
  ]);

  return {
    query,
    tracks: tracks.data.map((track) => mapDeezerTrackToSummary(track)),
    artists: artists.data.map((artist) => mapDeezerArtistToSummary(artist)),
    totalTracks: tracks.total ?? tracks.data.length,
    totalArtists: artists.total ?? artists.data.length,
  };
};

export const findBestDeezerTrackMatch = async (title: string, artistName: string) => {
  const results = await searchDeezerTracks(`${title} ${artistName}`, 1);
  const firstMatch = results.data[0];

  if (!firstMatch) return null;

  return mapDeezerTrackToSummary(firstMatch);
};
