const DEEZER_GENRE_BY_APP_GENRE: Record<string, { id: number; title: string }> = {
  POP: { id: 132, title: 'Pop' },
  HIP_HOP_RAP: { id: 116, title: 'Hip-Hop / Rap' },
  DANCE: { id: 113, title: 'Dance' },
  ELECTRONIC: { id: 106, title: 'Electronic' },
  SOUL_RNB: { id: 165, title: 'R&B' },
  ALTERNATIVE: { id: 85, title: 'Alternative' },
  ROCK: { id: 152, title: 'Rock' },
  LATIN: { id: 197, title: 'Latin' },
  FILM_TV: { id: 173, title: 'Film / TV' },
  COUNTRY: { id: 466, title: 'Country / Folk' },
  WORLDWIDE: { id: 0, title: 'Worldwide' },
  REGGAE_DANCE_HALL: { id: 144, title: 'Reggae' },
  HOUSE: { id: 113, title: 'House / Dance' },
  K_POP: { id: 16, title: 'Asian Music / K-Pop' },
};

export const resolveDeezerGenre = (genre: string) => {
  const normalized = genre.trim().toUpperCase();
  return DEEZER_GENRE_BY_APP_GENRE[normalized] ?? null;
};
