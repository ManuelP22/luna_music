import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useI18n } from '../i18n';
import type { TrackSummary } from '../types/music';

import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const ArtistDetails = () => {
  const { t } = useI18n();
  const { id: artistId = '' } = useParams();
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setActiveSong = usePlayerStore((state) => state.setActiveSong);
  const playPause = usePlayerStore((state) => state.playPause);
  const { data: artistData, isLoading, error } = useApiQuery(
    () => lunaApi.getArtistDetails(artistId),
    [artistId],
    { enabled: Boolean(artistId) },
  );

  if (isLoading) return <Loader title={t('artistDetails.loadingTitle')} />;
  if (error || !artistData) return <Error />;

  const handlePauseClick = () => {
    playPause(false);
  };

  const handlePlayClick = (song: TrackSummary, i: number) => {
    setActiveSong({ song, data: artistData.topTracks, i });
    playPause(true);
  };

  return (
    <div className="flex flex-col gap-10">
      <DetailsHeader artistData={artistData} />

      {artistData.bio ? (
        <section className="glass-card rounded-[28px] p-6 sm:p-8">
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">{t('artistDetails.profileLabel')}</p>
          <h2 className="mt-3 text-headline-md text-white">{t('artistDetails.profileTitle')}</h2>
          <p className="mt-4 max-w-4xl whitespace-pre-line text-body-md leading-7 text-on-surface-variant">
            {artistData.bio}
          </p>
        </section>
      ) : null}

      <section>
        <RelatedSongs
          title={t('artistDetails.topSongs')}
          data={artistData.topTracks}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      </section>
    </div>
  );
};

export default ArtistDetails;
