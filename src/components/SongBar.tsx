import { Link } from 'react-router-dom';
import type { PlayerTrack, TrackSummary } from '../types/music';

import PlayPause from './PlayPause';

type SongBarProps = {
  song: TrackSummary;
  i: number;
  isPlaying?: boolean;
  activeSong?: PlayerTrack | null;
  handlePauseClick?: () => void;
  handlePlayClick?: (song: TrackSummary, index: number) => void;
};

const SongBar = ({
  song,
  i,
  isPlaying = false,
  activeSong = null,
  handlePauseClick,
  handlePlayClick,
}: SongBarProps) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#42546e] hover:bg-opacity-30 ${activeSong?.id === song.id ? '' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg object-cover"
        src={song.imageUrl}
        alt={song.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">
            {song.title}
          </p>
        </Link>
        <p className="text-base text-gray-300 mt-1">
          {song.albumName || song.artistName}
        </p>
      </div>
    </div>
    {handlePauseClick && handlePlayClick ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    ) : null}
  </div>
);

export default SongBar;
