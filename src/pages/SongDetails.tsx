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
    <div className="flex flex-col">
      <DetailsHeader songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Letras:</h2>

        <div className="mt-5">
          {songData.lyrics.available
            ? songData.lyrics.lines.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Lo sentimos, no se han encontrado las letras.</p>
            )}
        </div>
      </div>

      <RelatedSongs
        data={songData.relatedTracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />

    </div>
  );
};

export default SongDetails;
