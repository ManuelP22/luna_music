import { describe, expect, it } from 'vitest';
import { resolveDeezerGenre } from './genres';

describe('resolveDeezerGenre', () => {
  it('maps app genres case-insensitively', () => {
    expect(resolveDeezerGenre(' pop ')).toEqual({
      id: 132,
      title: 'Pop',
    });
  });

  it('returns the configured deezer genre for worldwide', () => {
    expect(resolveDeezerGenre('WORLDWIDE')).toEqual({
      id: 0,
      title: 'Worldwide',
    });
  });

  it('returns null for unsupported genres', () => {
    expect(resolveDeezerGenre('JAZZ_FUSION')).toBeNull();
  });
});
