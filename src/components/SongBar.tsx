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
  <div className={`track-row group mb-3 rounded-[22px] border border-white/5 ${activeSong?.id === song.id ? 'bg-primary-container/10 shadow-cyan-glow-sm' : 'glass-card'}`}>
    <div className="w-8 flex-shrink-0 text-center text-label-sm text-white/50">
      {String(i + 1).padStart(2, '0')}
    </div>

    <img
      className="h-16 w-16 flex-shrink-0 rounded-[18px] object-cover"
      src={song.imageUrl || 'https://placehold.co/300x300/0d1626/e8f4ff?text=Luna'}
      alt={song.title}
    />

    <div className="min-w-0 flex-1">
      <Link to={`/songs/${song.id}`} className="block">
        <p className="truncate text-body-lg text-white transition-colors group-hover:text-primary-fixed">
          {song.title}
        </p>
      </Link>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-on-surface-variant">
        <span className="truncate">{song.artistName}</span>
        <span className="hidden text-white/20 sm:inline">•</span>
        <span className="truncate">{song.albumName || 'Luna Selection'}</span>
      </div>
    </div>

    <div className="hidden text-label-sm uppercase tracking-[0.18em] text-white/35 md:block">
      {song.isPlayable ? 'Playable' : 'Preview Off'}
    </div>

    {handlePauseClick && handlePlayClick ? (
      <div className="ml-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      </div>
    ) : null}
  </div>
);

export default SongBar;
