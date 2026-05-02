import { Link } from 'react-router-dom';
import type { ArtistSummary } from '../types/music';

type ArtistCardProps = {
  artist: ArtistSummary;
};

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const portrait = artist.imageUrl || 'https://placehold.co/600x600/0d1626/e8f4ff?text=Artist';

  return (
    <Link to={`/artists/${artist.id}`} className="group block h-full w-full min-w-0 animate-slideup">
      <div className="glass-card flex h-full flex-col gap-4 rounded-[28px] p-4 select-none">
        <div className="relative aspect-[0.95] overflow-hidden rounded-[22px] bg-surface-container-high">
          <img
            alt={artist.name}
            src={portrait}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-white/5" />

          <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-fixed backdrop-blur-md">
            {artist.genre || 'Artist'}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-body-lg text-white transition-colors group-hover:text-white/90">{artist.name}</p>
            <p className="mt-1 truncate text-sm text-on-surface-variant">
              {artist.genre || 'Perfil destacado'}
            </p>
          </div>

          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 transition-transform duration-300 group-hover:scale-105">
            <span className="text-lg">+</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
