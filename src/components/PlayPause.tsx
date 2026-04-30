import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import type { PlayerTrack } from '../types/music';

type PlayPauseProps = {
  isPlaying: boolean;
  activeSong: PlayerTrack | null;
  song: PlayerTrack;
  handlePause: () => void;
  handlePlay: () => void;
};

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }: PlayPauseProps) => (
  isPlaying && activeSong?.id === song.id ? (
    <FaPauseCircle
      size={42}
      className="cursor-pointer text-white drop-shadow-[0_0_14px_rgba(0,210,255,0.35)] transition-transform duration-200 hover:scale-105"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={42}
      className="cursor-pointer text-white drop-shadow-[0_0_14px_rgba(0,210,255,0.35)] transition-transform duration-200 hover:scale-105"
      onClick={handlePlay}
    />
  ));

export default PlayPause;
