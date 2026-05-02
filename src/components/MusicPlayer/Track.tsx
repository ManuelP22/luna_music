import type { TrackProps } from './types';
import { useI18n } from '../../i18n';

const Track = ({ isPlaying, isActive, activeSong, canPlayTrack }: TrackProps) => {
  const { t } = useI18n();
  const artwork = activeSong?.imageUrl || 'https://placehold.co/300x300/0d1626/e8f4ff?text=Cover';

  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-surface-container-high shadow-glass-inset ${isPlaying && isActive ? 'animate-spin-slow' : ''}`}>
        <img src={artwork} alt="cover art" className="h-full w-full object-cover" />
        <div className="liquid-border absolute inset-0 rounded-[20px]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-body-lg text-white">
          {activeSong?.title || t('musicPlayer.selectSong')}
        </p>
        <p className="mt-1 truncate text-sm text-on-surface-variant">
          {activeSong?.artistName || t('musicPlayer.chooseTrack')}
        </p>
      </div>

      <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary-fixed md:block">
        {canPlayTrack ? t('musicPlayer.preview') : t('musicPlayer.idle')}
      </div>
    </div>
  );
};

export default Track;
