/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, type SyntheticEvent } from 'react';
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

  const attemptPlayback = () => {
    const audio = ref.current;

    if (!audio || !isPlaying || !activeSong?.previewUrl) return;

    audio.play().catch(() => {});
  };

  const handleLoadedData = (event: SyntheticEvent<HTMLAudioElement>) => {
    onLoadedData(event);
    attemptPlayback();
  };

  useEffect(() => {
    const audio = ref.current;

    if (!audio) return;

    if (!activeSong?.previewUrl) {
      audio.pause();
      return;
    }

    audio.load();
  }, [activeSong?.id, activeSong?.previewUrl]);

  useEffect(() => {
    const audio = ref.current;

    if (!audio) return;

    if (!activeSong?.previewUrl) {
      audio.pause();
      return;
    }

    if (isPlaying) {
      if (audio.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        attemptPlayback();
      }
      return;
    }

    audio.pause();
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
      preload="auto"
      loop={repeat}
      onEnded={onEnded}
      onCanPlay={attemptPlayback}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={handleLoadedData}
    />
  );
};

export default Player;
