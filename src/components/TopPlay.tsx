/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import type { ArtistSummary, PlayerTrack, TrackSummary } from '../types/music';

import PlayPause from './PlayPause';
import { lunaApi } from '../services/lunaApi';
import { useApiQuery } from '../hooks/useApiQuery';
import { usePlayerStore } from '../store/playerStore';

import 'swiper/css';
import 'swiper/css/free-mode';

type TopChartCardProps = {
  song: TrackSummary;
  i: number;
  isPlaying: boolean;
  activeSong: PlayerTrack | null;
  handlePauseClick: () => void;
  handlePlayClick: (song: TrackSummary, index: number) => void;
};

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: TopChartCardProps) => (
  <div className={`track-row group mb-3 rounded-[22px] border border-white/5 ${activeSong?.id === song.id ? 'bg-primary-container/10 shadow-cyan-glow-sm' : 'bg-white/[0.02]'}`}>
    <div className="w-8 flex-shrink-0 text-center text-label-sm text-white/45">
      {String(i + 1).padStart(2, '0')}
    </div>

    <img className="h-16 w-16 flex-shrink-0 rounded-[18px] object-cover" src={song.imageUrl || 'https://placehold.co/300x300/0d1626/e8f4ff?text=Luna'} alt={song.title} />

    <div className="min-w-0 flex-1">
      <Link to={`/songs/${song.id}`} className="block">
        <p className="truncate text-body-lg text-white transition-colors group-hover:text-primary-fixed">
          {song.title}
        </p>
      </Link>
      <p className="mt-1 truncate text-sm text-on-surface-variant">
        {song.artistName}
      </p>
    </div>

    <div className="ml-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md">
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  </div>
);

const ArtistOrb = ({ artist }: { artist: ArtistSummary }) => (
  <Link to={`/artists/${artist.id}`} className="group block min-w-0 w-full">
    <div className="glass-card flex flex-col items-center rounded-[28px] p-3">
      <div className="relative w-full">
        <div className="absolute inset-0 rounded-full bg-primary-container/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={artist.imageUrl || 'https://placehold.co/400x400/0d1626/e8f4ff?text=Luna'}
          alt={artist.name}
          className="relative aspect-square w-full rounded-full border border-white/10 object-cover"
        />
      </div>
      <div className="mt-3 w-full text-center">
        <p className="truncate text-sm font-medium text-white transition-colors group-hover:text-primary-fixed">
          {artist.name}
        </p>
        <p className="mt-1 truncate text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">
          {artist.genre || 'Artist'}
        </p>
      </div>
    </div>
  </Link>
);

const TopPlay = () => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setActiveSong = usePlayerStore((state) => state.setActiveSong);
  const playPause = usePlayerStore((state) => state.playPause);
  const { data: chartData } = useApiQuery(() => lunaApi.getGlobalCharts(), []);
  const { data: artistData } = useApiQuery(() => lunaApi.getTopArtists(), []);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const topPlays = chartData?.tracks.slice(0, 5) ?? [];
  const topArtists = artistData?.artists.slice(0, 5) ?? [];

  const handlePauseClick = () => {
    playPause(false);
  };

  const handlePlayClick = (song: TrackSummary, index: number) => {
    setActiveSong({ song, data: topPlays, i: index });
    playPause(true);
  };

  return (
    <div ref={divRef} className="flex min-w-0 max-w-full flex-1 flex-col overflow-hidden">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Global Pulse</p>
            <h2 className="mt-2 text-headline-md text-white">Top Charts</h2>
          </div>
          <Link to="/top-charts" className="text-sm text-on-surface-variant transition-colors hover:text-white">
            Ver todo
          </Link>
        </div>

      <div className="mt-5 flex flex-col">
          {topPlays.map((song, i) => (
            <TopChartCard
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

      <div className="mt-10 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Voices</p>
            <h2 className="mt-2 text-headline-md text-white">Top Artists</h2>
          </div>
          <Link to="/top-artists" className="text-sm text-on-surface-variant transition-colors hover:text-white">
            Ver todo
          </Link>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[26px]">
          <Swiper
          slidesPerView={2.15}
          spaceBetween={14}
          freeMode
          modules={[FreeMode]}
          breakpoints={{
            520: { slidesPerView: 2.35 },
            640: { slidesPerView: 2.8 },
            1024: { slidesPerView: 2.15 },
            1280: { slidesPerView: 2.45 },
          }}
          className="mt-5 w-full !overflow-visible"
        >
          {topArtists.map((artist: ArtistSummary) => (
            <SwiperSlide
              key={artist.id}
              className="h-auto min-w-0 animate-slideright"
            >
              <ArtistOrb artist={artist} />
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>

      <div className="glass-card mt-8 rounded-[24px] p-4">
        <p className="text-label-sm uppercase tracking-[0.24em] text-primary-fixed">Mood Signal</p>
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">
          Charts vivos, artistas en orbita y una biblioteca visual que responde al flujo del reproductor.
        </p>
      </div>
    </div>
  );
};

export default TopPlay;
