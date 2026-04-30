export type ProviderRef = {
  source: string;
  trackId?: string;
  artistId?: string;
};

export type TrackSummary = {
  id: string;
  providerRefs: ProviderRef[];
  title: string;
  artistName: string;
  artistId?: string;
  albumName?: string;
  imageUrl?: string;
  previewUrl?: string | null;
  durationSec?: number | null;
  genre?: string | null;
  countryCode?: string | null;
  isPlayable: boolean;
};

export type TrackDetails = TrackSummary & {
  releaseDate?: string | null;
  lyrics: {
    available: boolean;
    lines: string[];
  };
  relatedTracks: TrackSummary[];
};

export type ArtistSummary = {
  id: string;
  name: string;
  imageUrl?: string;
  genre?: string | null;
};

export type ArtistDetails = {
  id: string;
  name: string;
  imageUrl?: string;
  genre?: string | null;
  bio?: string | null;
  topTracks: TrackSummary[];
  providerRefs: ProviderRef[];
};

export type SearchResults = {
  query: string;
  tracks: TrackSummary[];
  artists: ArtistSummary[];
  totalTracks?: number;
  totalArtists?: number;
};

export type ChartResponse = {
  type: 'global' | 'genre' | 'country';
  title: string;
  genre?: string;
  countryCode?: string;
  tracks: TrackSummary[];
};

export type ArtistChartResponse = {
  title: string;
  artists: ArtistSummary[];
};

export type GeoCountryResponse = {
  detected: boolean;
  countryCode: string;
  countryName: string;
  source: 'geo' | 'locale' | 'default' | 'manual';
};

export type PlayerTrack = TrackSummary | TrackDetails;
export type PlayerTrackCollection = PlayerTrack[];
