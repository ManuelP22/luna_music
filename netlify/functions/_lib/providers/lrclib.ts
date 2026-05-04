import { fetchJson } from '../http';

type LyricsPayload = {
  available: boolean;
  lines: string[];
};

type LrcLibLyricsResponse = {
  plainLyrics?: string | null;
  syncedLyrics?: string | null;
  instrumental?: boolean;
};

const LRCLIB_API_BASE_URL = 'https://lrclib.net/api';

const normalizeLyricsLines = (lyrics: string) => lyrics
  .split('\n')
  .map((line) => line.replace(/\[[^\]]+\]/g, '').trim())
  .filter(Boolean);

export const unavailableLyrics: LyricsPayload = {
  available: false,
  lines: [],
};

export const buildLyricsPayload = (response: LrcLibLyricsResponse | null): LyricsPayload => {
  if (!response || response.instrumental) {
    return unavailableLyrics;
  }

  const plainLines = response.plainLyrics ? normalizeLyricsLines(response.plainLyrics) : [];

  if (plainLines.length > 0) {
    return {
      available: true,
      lines: plainLines,
    };
  }

  const syncedLines = response.syncedLyrics ? normalizeLyricsLines(response.syncedLyrics) : [];

  if (syncedLines.length > 0) {
    return {
      available: true,
      lines: syncedLines,
    };
  }

  return unavailableLyrics;
};

export const getLyricsForTrack = async (
  trackName: string,
  artistName: string,
  albumName?: string,
) => {
  if (!trackName.trim() || !artistName.trim()) {
    return unavailableLyrics;
  }

  const searchParams = new URLSearchParams({
    track_name: trackName,
    artist_name: artistName,
  });

  if (albumName?.trim()) {
    searchParams.set('album_name', albumName);
  }

  const url = `${LRCLIB_API_BASE_URL}/get?${searchParams.toString()}`;

  try {
    const response = await fetchJson<LrcLibLyricsResponse>(url);
    return buildLyricsPayload(response);
  } catch {
    return unavailableLyrics;
  }
};
