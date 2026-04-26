/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import type { PlayerTrack } from '../../types/music';

type PlayerProps = {
  activeSong: PlayerTrack | null;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  repeat: boolean;
};

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: PlayerProps) => {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isPlaying) {
      void ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying, activeSong?.id]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.previewUrl ?? undefined}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
