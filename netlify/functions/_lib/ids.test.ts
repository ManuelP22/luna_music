import { describe, expect, it } from 'vitest';
import { createArtistId, createTrackId, parseArtistId, parseTrackId } from './ids';

describe('id helpers', () => {
  it('creates and parses normalized track ids', () => {
    const trackId = createTrackId('deezer', 3135556);

    expect(trackId).toBe('trk_deezer_3135556');
    expect(parseTrackId(trackId)).toEqual({
      provider: 'deezer',
      externalId: '3135556',
    });
  });

  it('creates and parses normalized artist ids', () => {
    const artistId = createArtistId('lastfm', 'radiohead');

    expect(artistId).toBe('art_lastfm_radiohead');
    expect(parseArtistId(artistId)).toEqual({
      provider: 'lastfm',
      externalId: 'radiohead',
    });
  });

  it('accepts legacy numeric track ids for deezer compatibility', () => {
    expect(parseTrackId('42')).toEqual({
      provider: 'deezer',
      externalId: '42',
    });
  });

  it('rejects invalid prefixed ids', () => {
    expect(() => parseArtistId('artist_bad_format')).toThrow('Invalid art id');
  });
});
