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
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Explora {genreTitle}</h2>
        <select
          onChange={(event) => selectGenreListId(event.target.value)}
          value={selectedGenre}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option
              key={genre.value}
              value={genre.value}
            >{genre.title}
            </option>
          ))}
        </select>
      </div>
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

export default Discover;
