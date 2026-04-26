import { create } from 'zustand';
import type { PlayerTrack, PlayerTrackCollection } from '../types/music';

type SetActiveSongPayload = {
  song: PlayerTrack;
  data: PlayerTrackCollection;
  i: number;
};

type PlayerStore = {
  currentSongs: PlayerTrackCollection;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: PlayerTrack | null;
  genreListId: string;
  setActiveSong: (payload: SetActiveSongPayload) => void;
  nextSong: (index: number) => void;
  prevSong: (index: number) => void;
  playPause: (isPlaying: boolean) => void;
  selectGenreListId: (genreListId: string) => void;
};

const getSongAtIndex = (songs: PlayerTrackCollection, index: number): PlayerTrack | null => {
  const song = songs[index];

  if (!song) return null;

  return song;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  genreListId: '',
  setActiveSong: ({ song, data, i }) => {
    set({
      activeSong: song,
      currentSongs: data,
      currentIndex: i,
      isActive: true,
    });
  },
  nextSong: (index) => {
    const { currentSongs } = get();

    set({
      activeSong: getSongAtIndex(currentSongs, index),
      currentIndex: index,
      isActive: true,
    });
  },
  prevSong: (index) => {
    const { currentSongs } = get();

    set({
      activeSong: getSongAtIndex(currentSongs, index),
      currentIndex: index,
      isActive: true,
    });
  },
  playPause: (isPlaying) => set({ isPlaying }),
  selectGenreListId: (genreListId) => set({ genreListId }),
}));
