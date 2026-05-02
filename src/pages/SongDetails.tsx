import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useI18n } from '../i18n';
import type { TrackSummary } from '../types/music';

import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const SongDetails = () => {
  const { t } = useI18n();
  const { songid = '' } = useParams();
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setActiveSong = usePlayerStore((state) => state.setActiveSong);
  const playPause = usePlayerStore((state) => state.playPause);
  const { data: songData, isLoading, error } = useApiQuery(
    () => lunaApi.getTrackDetails(songid),
    [songid],
    { enabled: Boolean(songid) },
  );

  if (isLoading) return <Loader title={t('songDetails.loadingTitle')} />;
  if (error || !songData) return <Error />;

  const handlePauseClick = () => {
    playPause(false);
  };

  const handlePlayClick = (song: TrackSummary, i: number) => {
    setActiveSong({ song, data: songData.relatedTracks, i });
    playPause(true);
  };

  return (
    <div className="flex flex-col gap-10">
      <DetailsHeader songData={songData} />

      <section className="glass-card rounded-[28px] p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('songDetails.lyricsLabel')}</p>
            <h2 className="mt-2 text-headline-md text-white">{t('songDetails.lyricsTitle')}</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant sm:block">
            {songData.lyrics.available ? t('songDetails.available') : t('songDetails.unavailable')}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          {songData.lyrics.available
            ? songData.lyrics.lines.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-body-md leading-7 text-on-surface-variant">{line}</p>
            ))
            : (
              <p className="text-body-md text-on-surface-variant">{t('songDetails.notFound')}</p>
            )}
        </div>
      </section>

      <section>
        <RelatedSongs
          data={songData.relatedTracks}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </section>
    </div>
  );
};

export default SongDetails;
