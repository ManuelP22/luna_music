import { useNavigate } from 'react-router-dom';
import type { ArtistSummary } from '../types/music';

type ArtistCardProps = {
  artist: ArtistSummary;
};

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artist.id}`)}
    >
      <img
        alt={artist.name}
        src={artist.imageUrl}
        className="w-full h-56 rounded-lg object-cover"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">{artist.name}</p>
    </div>
  );
};

export default ArtistCard;
