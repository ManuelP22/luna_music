import type { PlayerTrack, TrackSummary } from '../types/music';
import { useI18n } from '../i18n';
import SongBar from './SongBar';

type RelatedSongsProps = {
  title?: string;
  data: TrackSummary[];
  isPlaying?: boolean;
  activeSong?: PlayerTrack | null;
  handlePlayClick?: (song: TrackSummary, index: number) => void;
  handlePauseClick?: () => void;
};

const RelatedSongs = ({
  title,
  data,
  isPlaying = false,
  activeSong = null,
  handlePlayClick,
  handlePauseClick,
}: RelatedSongsProps) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col select-none">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('relatedSongs.queue')}</p>
          <h1 className="mt-2 text-headline-lg text-white">{title || t('relatedSongs.defaultTitle')}</h1>
        </div>
        <p className="hidden text-sm text-on-surface-variant sm:block">
          {t('relatedSongs.description')}
        </p>
      </div>

      <div className="flex w-full flex-col">
        {data.map((song, i) => (
          <SongBar
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
