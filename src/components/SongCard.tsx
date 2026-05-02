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
  const artwork = song.imageUrl || 'https://placehold.co/600x600/0d1626/e8f4ff?text=Cover';

  const handlePauseClick = () => {
    playPause(false);
  };

  const handlePlayClick = () => {
    setActiveSong({ song, data, i });
    playPause(true);
  };

  return (
    <div className="glass-card group flex h-full w-full min-w-0 cursor-pointer flex-col gap-4 rounded-[28px] p-4 animate-slideup select-none">
      <div className="relative aspect-[0.95] overflow-hidden rounded-[22px] bg-surface-container-high">
        <div className={`absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-black/10 via-black/10 to-black/55 transition-opacity duration-300 ${activeSong?.id === song.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        <div className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-fixed backdrop-blur-md">
          {song.genre || 'Featured'}
        </div>

        <img alt="song cover art" src={artwork} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest/70 via-transparent to-white/5" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="truncate text-body-lg text-white transition-colors hover:text-white/90">
          <Link to={`/songs/${song.id}`} className="block truncate">
            {song.title}
          </Link>
        </p>

        <p className="truncate text-sm text-on-surface-variant transition-colors hover:text-white">
          <Link to={song.artistId ? `/artists/${song.artistId}` : '/top-artists'} className="block truncate">
            {song.artistName}
          </Link>
        </p>

        <div className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/45">
          <span className="truncate">{song.albumName || 'Single'}</span>
          <span>{song.isPlayable ? 'Preview' : 'Info'}</span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
