import type { PlayerTrack } from '../../types/music';

type TrackProps = {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: PlayerTrack | null;
};

const Track = ({ isPlaying, isActive, activeSong }: TrackProps) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.imageUrl} alt="cover art" className="rounded-full w-full h-full object-cover" />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title || 'No active song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.artistName || 'No active artist'}
      </p>
    </div>
  </div>
);

export default Track;
