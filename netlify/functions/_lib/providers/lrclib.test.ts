import { describe, expect, it } from 'vitest';
import { buildLyricsPayload, unavailableLyrics } from './lrclib';

describe('buildLyricsPayload', () => {
  it('returns normalized plain lyrics when available', () => {
    expect(buildLyricsPayload({
      plainLyrics: 'Line one\nLine two\n',
    })).toEqual({
      available: true,
      lines: ['Line one', 'Line two'],
    });
  });

  it('falls back to synced lyrics when plain lyrics are missing', () => {
    expect(buildLyricsPayload({
      syncedLyrics: '[00:01.00] Line one\n[00:03.00] Line two',
    })).toEqual({
      available: true,
      lines: ['Line one', 'Line two'],
    });
  });

  it('returns unavailable lyrics for instrumental or empty responses', () => {
    expect(buildLyricsPayload({
      instrumental: true,
      plainLyrics: null,
    })).toEqual(unavailableLyrics);

    expect(buildLyricsPayload(null)).toEqual(unavailableLyrics);
  });
});
