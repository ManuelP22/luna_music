import { Link } from 'react-router-dom';
import type { ArtistDetails, TrackDetails } from '../types/music';

type DetailsHeaderProps = {
  artistData?: ArtistDetails | null;
  songData?: TrackDetails | null;
};

const DetailsHeader = ({ artistData, songData }: DetailsHeaderProps) => {
  const imageUrl = artistData?.imageUrl ?? songData?.imageUrl ?? 'https://placehold.co/800x800/0d1626/e8f4ff?text=Luna';
  const title = artistData?.name ?? songData?.title ?? 'Luna';
  const subtitle = songData?.artistName;
  const genre = artistData?.genre ?? songData?.genre;

  return (
    <section className="glass-panel relative overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-8">
      <div
        className="bg-immersive"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="bg-immersive-overlay" />
      <div className="ambient-glow right-[-10rem] top-[-8rem]" />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end">
        <div className="relative h-28 w-28 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
          <img
            className="h-full w-full rounded-[30px] object-cover shadow-ambient-album"
            alt={title}
            src={imageUrl}
          />
          <div className="liquid-border absolute inset-0 rounded-[30px]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-label-sm uppercase tracking-[0.28em] text-primary-fixed">
            {artistData ? 'Artist Detail' : 'Track Detail'}
          </p>

          <h1 className="mt-3 truncate text-display-xl text-white">{title}</h1>

          {songData?.artistId && !artistData ? (
            <Link to={`/artists/${songData.artistId}`} className="mt-3 inline-flex">
              <p className="text-body-lg text-on-surface-variant transition-colors hover:text-white">
                {subtitle}
              </p>
            </Link>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
            {genre ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                {genre}
              </span>
            ) : null}
            {songData?.albumName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                {songData.albumName}
              </span>
            ) : null}
            {songData?.isPlayable ? (
              <span className="rounded-full border border-primary-container/20 bg-primary-container/10 px-4 py-2 text-primary-fixed">
                Preview Ready
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsHeader;
