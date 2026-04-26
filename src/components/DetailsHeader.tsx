import { Link } from 'react-router-dom';
import type { ArtistDetails, TrackDetails } from '../types/music';

type DetailsHeaderProps = {
  artistData?: ArtistDetails | null;
  songData?: TrackDetails | null;
};

const DetailsHeader = ({ artistData, songData }: DetailsHeaderProps) => {
  const imageUrl = artistData?.imageUrl ?? songData?.imageUrl;
  const title = artistData?.name ?? songData?.title;
  const subtitle = songData?.artistName;
  const genre = artistData?.genre ?? songData?.genre;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          className="sm:w-44 w-24 sm:h-44 h-24 rounded-full object-cover border-2 shadow-xl shadow-black"
          alt={title || 'cover art'}
          src={imageUrl}
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {title}
          </p>
          {songData?.artistId && !artistData && (
            <Link to={`/artists/${songData.artistId}`}>
              <p className="text-base text-gray-400 mt-2">
                {subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 ">
            {genre}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-48 h-28" />
    </div>
  );
};

export default DetailsHeader;
