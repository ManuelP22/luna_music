import { Link } from 'react-router-dom';
import type { TrackProps } from './types';
import { useI18n } from '../../i18n';

const Track = ({ isPlaying, isActive, activeSong, compact = false }: TrackProps) => {
  const { t } = useI18n();
  const artwork = activeSong?.imageUrl || 'https://placehold.co/300x300/0d1626/e8f4ff?text=Cover';
  const isDiscSpinning = isPlaying && isActive;
  const artworkAlt = activeSong
    ? `${activeSong.title} by ${activeSong.artistName || 'Unknown artist'}`
    : 'album artwork';
  const secondaryText = activeSong?.artistName || (compact ? t('musicPlayer.idle') : t('musicPlayer.chooseTrack'));
  const lyricsPath = activeSong ? `/songs/${activeSong.id}` : null;

  return (
    <div className={`flex min-w-0 items-center ${compact ? 'gap-3' : 'gap-4'}`}>
      {!compact && (
        <div className={`player-disc-shell ${isDiscSpinning ? 'player-disc-shell-active' : ''}`}>
          <div className={`player-disc ${isDiscSpinning ? 'player-disc-spinning' : ''}`}>
            <img src={artwork} alt={artworkAlt} className="h-full w-full object-cover" />
            <div className="player-disc-sheen" />
            <div className="player-disc-center" />
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className={`truncate text-white ${compact ? 'text-sm font-semibold' : 'text-body-lg'}`}>
          {activeSong?.title || t('musicPlayer.selectSong')}
        </p>
        <div className="flex items-center gap-2">
          <p className={`truncate text-on-surface-variant ${compact ? 'mt-0.5 text-xs' : 'mt-1 text-sm'}`}>
            {secondaryText}
          </p>

          {lyricsPath ? (
            <Link
              to={lyricsPath}
              className={` inline-flex items-center rounded-full border border-primary-container/25 bg-primary-container/10 font-semibold text-primary-fixed transition-all duration-200 hover:border-primary-container/45 hover:bg-primary-container/16 text-xs hover:text-white ${compact ? 'px-2.5 py-1 uppercase tracking-[0.18em]' : 'px-3.5 py-1.5 text-xs uppercase tracking-[0.2em]'}`}
              aria-label={t('musicPlayer.viewLyrics')}
              title={t('musicPlayer.viewLyrics')}
            >
              {t('musicPlayer.viewLyrics')}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Track;
