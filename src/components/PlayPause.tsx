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
      size={35}
      className="text-gray-300"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={handlePlay}
    />
  ));

export default PlayPause;
