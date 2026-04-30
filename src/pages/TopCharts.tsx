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
    <div className="flex flex-col gap-10">
      <section className="glass-panel rounded-[32px] border border-white/10 p-6 sm:p-8">
        <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">Global Charts</p>
        <h1 className="mt-3 text-headline-lg text-white">Explora el Top Trending</h1>
        <p className="mt-4 max-w-2xl text-body-md text-on-surface-variant">
          Una lectura global del momentum de Luna con foco en artwork, energia visual y acceso directo a reproduccion.
        </p>
      </section>

      <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Top Selection</p>
            <h2 className="mt-2 text-headline-lg text-white">Los tracks que estan arriba ahora</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant md:block">
            {tracks.length} tracks
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
      </section>
    </div>
  );
};

export default TopCharts;
