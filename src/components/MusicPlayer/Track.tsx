import type { TrackProps } from './types';
import { useI18n } from '../../i18n';

const Track = ({ isPlaying, isActive, activeSong, canPlayTrack }: TrackProps) => {
  const { t } = useI18n();
  const artwork = activeSong?.imageUrl || 'https://placehold.co/300x300/0d1626/e8f4ff?text=Cover';
  const isDiscSpinning = isPlaying && isActive;
  const artworkAlt = activeSong
    ? `${activeSong.title} by ${activeSong.artistName || 'Unknown artist'}`
    : 'album artwork';

  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className={`player-disc-shell ${isDiscSpinning ? 'player-disc-shell-active' : ''}`}>
        <div className={`player-disc ${isDiscSpinning ? 'player-disc-spinning' : ''}`}>
          <img src={artwork} alt={artworkAlt} className="h-full w-full object-cover" />
          <div className="player-disc-sheen" />
          <div className="player-disc-center" />
        </div>
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
