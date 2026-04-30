import { useParams } from 'react-router-dom';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import type { TrackSummary } from '../types/music';

import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const SongDetails = () => {
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

  if (isLoading) return <Loader title="Searching song details" />;
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
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Lyrics</p>
            <h2 className="mt-2 text-headline-md text-white">Letras</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant sm:block">
            {songData.lyrics.available ? 'Sincroniza con la atmosfera del track' : 'No disponibles para esta pista'}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          {songData.lyrics.available
            ? songData.lyrics.lines.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-body-md leading-7 text-on-surface-variant">{line}</p>
            ))
            : (
              <p className="text-body-md text-on-surface-variant">Lo sentimos, no se han encontrado las letras.</p>
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
