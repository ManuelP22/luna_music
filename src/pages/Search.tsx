import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const Search = () => {
  const { searchTerm = '' } = useParams();
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { data, isLoading, error } = useApiQuery(
    () => lunaApi.getSearchResults(searchTerm),
    [searchTerm],
    { enabled: Boolean(searchTerm) },
  );

  if (isLoading) return <Loader title={`Buscando ${searchTerm}...`} />;
  if (error) return <Error />;

  const songs = data?.tracks ?? [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Resultados de <span className="text-cyan-400">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
