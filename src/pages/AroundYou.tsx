import { Error, Loader, SongCard } from '../components';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

const AroundYou = () => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const geoQuery = useApiQuery(() => lunaApi.getGeoCountry(), []);
  const countryCode = geoQuery.data?.countryCode ?? '';
  const songsQuery = useApiQuery(
    () => lunaApi.getCountryCharts(countryCode),
    [countryCode],
    { enabled: Boolean(countryCode) },
  );

  if (geoQuery.isLoading || songsQuery.isLoading) return <Loader title="Cargando canciones cerca de ti..." />;
  if (geoQuery.error || songsQuery.error) return <Error />;

  const tracks = songsQuery.data?.tracks ?? [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Cerca de Ti <span className="font-black">{geoQuery.data?.countryCode}</span>
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

export default AroundYou;
