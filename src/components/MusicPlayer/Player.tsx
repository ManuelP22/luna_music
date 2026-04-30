/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import type { PlayerProps } from './types';

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

    if (!activeSong?.previewUrl) {
      ref.current.pause();
      return;
    }

    if (isPlaying) {
      ref.current.play().catch(() => {});
    } else {
      ref.current.pause();
    }
  }, [isPlaying, activeSong?.id, activeSong?.previewUrl]);

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
