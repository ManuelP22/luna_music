import { Link } from 'react-router-dom';
import type { PlayerTrack, PlayerTrackCollection } from '../types/music';

import PlayPause from './PlayPause';
import { usePlayerStore } from '../store/playerStore';

type SongCardProps = {
  song: PlayerTrack;
  isPlaying?: boolean;
  activeSong: PlayerTrack | null;
  i: number;
  data: PlayerTrackCollection;
};

const SongCard = ({ song, isPlaying = false, activeSong, i, data }: SongCardProps) => {
  const setActiveSong = usePlayerStore((state) => state.setActiveSong);
  const playPause = usePlayerStore((state) => state.playPause);

  const handlePauseClick = () => {
    playPause(false);
  };

  const handlePlayClick = () => {
    setActiveSong({ song, data, i });
    playPause(true);
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex transition ease-in-out delay-150 transform hover:scale-110 duration-500 ${activeSong?.id === song.id ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song cover art" src={song.imageUrl} className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-gray-300 truncate hover:text-white">
          <Link to={`/songs/${song.id}`}>
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 hover:text-white mt-1">
          <Link to={song.artistId ? `/artists/${song.artistId}` : '/top-artists'}>
            {song.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
