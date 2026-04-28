const TRACK_PREFIX = 'trk';
const ARTIST_PREFIX = 'art';

const parsePrefixedId = (value: string, prefix: string) => {
  const normalized = value.trim();

  if (/^\d+$/.test(normalized)) {
    return { provider: 'deezer', externalId: normalized };
  }

  const parts = normalized.split('_');

  if (parts.length >= 3 && parts[0] === prefix) {
    const provider = parts[1];
    const externalId = parts.slice(2).join('_');

    if (provider && externalId) {
      return { provider, externalId };
    }
  }

  throw new Error(`Invalid ${prefix} id: ${value}`);
};

export const createTrackId = (provider: string, trackId: string | number) => `${TRACK_PREFIX}_${provider}_${trackId}`;

export const createArtistId = (provider: string, artistId: string | number) => `${ARTIST_PREFIX}_${provider}_${artistId}`;

export const parseTrackId = (value: string) => parsePrefixedId(value, TRACK_PREFIX);

export const parseArtistId = (value: string) => parsePrefixedId(value, ARTIST_PREFIX);
