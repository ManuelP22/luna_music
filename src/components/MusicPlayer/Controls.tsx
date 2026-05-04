import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { useI18n } from '../../i18n';
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
  compact = false,
}: ControlsProps) => {
  const { t } = useI18n();
  const transportButtonClass = compact
    ? 'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:border-primary-container/30 hover:bg-white/[0.08]'
    : 'flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-200 hover:border-primary-container/30 hover:bg-white/[0.08]';
  const transportIconSize = compact ? 22 : 28;
  const primaryButtonClass = compact ? 'btn-play-primary h-11 w-11' : 'btn-play-primary h-14 w-14';
  const primaryIconSize = compact ? 18 : 22;

  return (
    <div className={`flex items-center justify-center ${compact ? 'gap-2' : 'gap-3'}`}>
      <button
        type="button"
        aria-label={t('musicPlayer.repeat')}
        className={`${controlButtonClass} ${repeat ? 'border-primary-container/40 bg-primary-container/10 text-primary-fixed' : ''} ${!currentSongs.length ? 'cursor-not-allowed opacity-40' : ''}`}
        onClick={() => setRepeat((prev) => !prev)}
        disabled={!currentSongs.length}
      >
        <BsArrowRepeat size={18} />
      </button>

      <button
        type="button"
        aria-label={t('musicPlayer.previous')}
        className={transportButtonClass}
        onClick={handlePrevSong}
        disabled={!currentSongs.length}
      >
        <MdSkipPrevious size={transportIconSize} />
      </button>

      <button
        type="button"
        aria-label={isPlaying ? t('musicPlayer.pause') : t('musicPlayer.play')}
        className={`${primaryButtonClass} ${!canPlayTrack ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={handlePlayPause}
        disabled={!canPlayTrack}
        title={canPlayTrack ? t('musicPlayer.playPreview') : t('musicPlayer.noPreview')}
      >
        {isPlaying ? (
          <BsFillPauseFill size={primaryIconSize} className="text-white" />
        ) : (
          <BsFillPlayFill size={primaryIconSize} className="translate-x-[1px] text-white" />
        )}
      </button>

      <button
        type="button"
        aria-label={t('musicPlayer.next')}
        className={transportButtonClass}
        onClick={handleNextSong}
        disabled={!currentSongs.length}
      >
        <MdSkipNext size={transportIconSize} />
      </button>

      <button
        type="button"
        aria-label={t('musicPlayer.shuffle')}
        className={`${controlButtonClass} ${shuffle ? 'border-primary-container/40 bg-primary-container/10 text-primary-fixed' : ''} ${!currentSongs.length ? 'cursor-not-allowed opacity-40' : ''}`}
        onClick={() => setShuffle((prev) => !prev)}
        disabled={!currentSongs.length}
      >
        <BsShuffle size={18} />
      </button>
    </div>
  );
};

export default Controls;
