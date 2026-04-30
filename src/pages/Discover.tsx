import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const Discover = () => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const genreListId = usePlayerStore((state) => state.genreListId);
  const selectGenreListId = usePlayerStore((state) => state.selectGenreListId);
  const selectedGenre = genreListId || 'POP';
  const { data, isLoading, error } = useApiQuery(
    () => lunaApi.getGenreCharts(selectedGenre),
    [selectedGenre],
  );

  if (isLoading) return <Loader title="Cargando canciones..." />;
  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === selectedGenre)?.title;
  const tracks = data?.tracks ?? [];

  return (
    <div className="flex flex-col gap-10">
      <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="ambient-glow right-[-10rem] top-[-10rem]" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">Discover</p>
            <h1 className="mt-3 text-display-xl text-white">Explora {genreTitle}</h1>
            <p className="mt-4 max-w-2xl text-body-md text-on-surface-variant">
              Una vitrina curada con energia liquid glass, enfoque editorial y reproduccion inmediata desde el grid principal.
            </p>
          </div>

          <div className="w-full max-w-sm">
            <label htmlFor="genre-select" className="mb-3 block text-label-sm uppercase tracking-[0.24em] text-white/55">
              Mood / Genre
            </label>
            <div className="glass-search rounded-[22px] px-4 py-2">
              <select
                id="genre-select"
                onChange={(event) => selectGenreListId(event.target.value)}
                value={selectedGenre}
                className="w-full cursor-pointer bg-transparent py-2 text-sm text-white outline-none"
              >
                {genres.map((genre) => (
                  <option
                    key={genre.value}
                    value={genre.value}
                    className="bg-surface-container text-white"
                  >
                    {genre.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Fresh Picks</p>
            <h2 className="mt-2 text-headline-lg text-white">Recomendado para este momento</h2>
          </div>
          <p className="hidden text-sm text-on-surface-variant md:block">
            {tracks.length} tracks listos para reproducir
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

export default Discover;
