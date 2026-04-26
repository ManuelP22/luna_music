import { ArtistCard, Error, Loader } from '../components';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';

const TopArtists = () => {
  const { data, isLoading, error } = useApiQuery(() => lunaApi.getTopArtists(), []);

  if (isLoading) return <Loader title="Cargando artistas top..." />;
  if (error) return <Error />;

  const artists = data?.artists ?? [];

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Artistas Top
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
