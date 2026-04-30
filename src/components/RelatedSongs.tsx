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
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Queue</p>
        <h1 className="mt-2 text-headline-lg text-white">{title}</h1>
      </div>
      <p className="hidden text-sm text-on-surface-variant sm:block">
        Sigue explorando sin salir del flujo del reproductor.
      </p>
    </div>

    <div className="flex w-full flex-col">
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
