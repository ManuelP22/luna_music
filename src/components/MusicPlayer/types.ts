import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { PlayerTrack, PlayerTrackCollection } from '../../types/music';

export type ControlsProps = {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  currentSongs: PlayerTrackCollection;
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
  canPlayTrack: boolean;
  compact?: boolean;
};

export type PlayerProps = {
  activeSong: PlayerTrack | null;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (event: SyntheticEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: SyntheticEvent<HTMLAudioElement>) => void;
  repeat: boolean;
};

export type SeekbarProps = {
  value: number;
  min: number;
  max: number;
  onChange: (nextTime: number) => void;
  onStepBackward: () => void;
  onStepForward: () => void;
};

export type TrackProps = {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: PlayerTrack | null;
  canPlayTrack: boolean;
  compact?: boolean;
};

export type VolumeBarProps = {
  value: number;
  min: number;
  max: number;
  onChange: (nextVolume: number) => void;
  setVolume: Dispatch<SetStateAction<number>>;
};
