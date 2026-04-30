import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import type { TrackSummary } from '../types/music';

import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const ArtistDetails = () => {
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

  if (isLoading) return <Loader title="Buscando artista..." />;
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
          <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Artist Profile</p>
          <h2 className="mt-3 text-headline-md text-white">Sobre este artista</h2>
          <p className="mt-4 max-w-4xl whitespace-pre-line text-body-md leading-7 text-on-surface-variant">
            {artistData.bio}
          </p>
        </section>
      ) : null}

      <section>
        <RelatedSongs
          title="Top Songs"
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
