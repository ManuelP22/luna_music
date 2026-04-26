import { Error, Loader, SongCard } from '../components';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const TopCharts = () => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const { data, isLoading, error } = useApiQuery(() => lunaApi.getGlobalCharts(), []);

  if (isLoading) return <Loader title="Cargando canciones trending..." />;
  if (error) return <Error />;

  const tracks = data?.tracks ?? [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Explora el Top Trending
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
