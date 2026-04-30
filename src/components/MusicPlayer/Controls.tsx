import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import type { ControlsProps } from './types';

const controlButtonClass = 'hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-on-surface-variant transition-all duration-200 hover:border-primary-container/30 hover:bg-white/[0.08] hover:text-white sm:flex';

const Controls = ({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
  canPlayTrack,
}: ControlsProps) => (
  <div className="flex items-center justify-center gap-3">
    <button
      type="button"
      aria-label="Repetir"
      className={`${controlButtonClass} ${repeat ? 'border-primary-container/40 bg-primary-container/10 text-primary-fixed' : ''} ${!currentSongs.length ? 'cursor-not-allowed opacity-40' : ''}`}
      onClick={() => setRepeat((prev) => !prev)}
      disabled={!currentSongs.length}
    >
      <BsArrowRepeat size={18} />
    </button>

    <button
      type="button"
      aria-label="Cancion anterior"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:border-primary-container/30 hover:bg-white/[0.08]"
      onClick={handlePrevSong}
      disabled={!currentSongs.length}
    >
      <MdSkipPrevious size={28} />
    </button>

    <button
      type="button"
      aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      className={`btn-play-primary h-14 w-14 ${!canPlayTrack ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={handlePlayPause}
      disabled={!canPlayTrack}
      title={canPlayTrack ? 'Reproducir preview' : 'Esta pista no tiene preview disponible'}
    >
      {isPlaying ? (
        <BsFillPauseFill size={22} className="text-white" />
      ) : (
        <BsFillPlayFill size={22} className="translate-x-[1px] text-white" />
      )}
    </button>

    <button
      type="button"
      aria-label="Siguiente cancion"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:border-primary-container/30 hover:bg-white/[0.08]"
      onClick={handleNextSong}
      disabled={!currentSongs.length}
    >
      <MdSkipNext size={28} />
    </button>

    <button
      type="button"
      aria-label="Shuffle"
      className={`${controlButtonClass} ${shuffle ? 'border-primary-container/40 bg-primary-container/10 text-primary-fixed' : ''} ${!currentSongs.length ? 'cursor-not-allowed opacity-40' : ''}`}
      onClick={() => setShuffle((prev) => !prev)}
      disabled={!currentSongs.length}
    >
      <BsShuffle size={18} />
    </button>
  </div>
);

export default Controls;
