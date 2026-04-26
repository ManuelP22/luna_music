import type { PlayerTrack, TrackSummary } from '../types/music';
import SongBar from './SongBar';

type RelatedSongsProps = {
  title?: string;
  data: TrackSummary[];
  isPlaying?: boolean;
  activeSong?: PlayerTrack | null;
  handlePlayClick?: (song: TrackSummary, index: number) => void;
  handlePauseClick?: () => void;
};

const RelatedSongs = ({
  title = 'Canciones Relacionadas:',
  data,
  isPlaying = false,
  activeSong = null,
  handlePlayClick,
  handlePauseClick,
}: RelatedSongsProps) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">{title}</h1>

    <div className="mt-6 w-full flex flex-col">
      {data.map((song, i) => (
        <SongBar
          key={song.id}
          song={song}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
