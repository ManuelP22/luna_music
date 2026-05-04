import { useEffect, useState } from 'react';

import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { usePlayerStore } from '../../store/playerStore';

type MusicPlayerProps = {
  renderAudio?: boolean;
};

const MusicPlayer = ({ renderAudio = true }: MusicPlayerProps) => {
  const activeSong = usePlayerStore((state) => state.activeSong);
  const currentSongs = usePlayerStore((state) => state.currentSongs);
  const currentIndex = usePlayerStore((state) => state.currentIndex);
  const isActive = usePlayerStore((state) => state.isActive);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const nextSong = usePlayerStore((state) => state.nextSong);
  const prevSong = usePlayerStore((state) => state.prevSong);
  const playPause = usePlayerStore((state) => state.playPause);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const hasQueue = currentSongs.length > 0;
  const hasActiveSong = Boolean(activeSong);
  const canPlayTrack = Boolean(activeSong?.previewUrl);

  useEffect(() => {
    if (currentSongs.length) playPause(true);
  }, [currentIndex, currentSongs.length, playPause]);

  useEffect(() => {
    setAppTime(0);
    setSeekTime(0);
    setDuration(0);
  }, [activeSong?.id]);

  const handlePlayPause = () => {
    if (!isActive || !canPlayTrack) return;
    if (isPlaying) {
      playPause(false);
    } else {
      playPause(true);
    }
  };

  const handleNextSong = () => {
    if (!hasQueue) return;
    playPause(false);
    if (!shuffle) {
      nextSong((currentIndex + 1) % currentSongs.length);
    } else {
      nextSong(Math.floor(Math.random() * currentSongs.length));
    }
  };

  const handlePrevSong = () => {
    if (!hasQueue) return;
    if (currentIndex === 0) {
      prevSong(currentSongs.length - 1);
    } else if (shuffle) {
      prevSong(Math.floor(Math.random() * currentSongs.length));
    } else {
      prevSong(currentIndex - 1);
    }
  };

  const handleSeekChange = (nextTime: number) => {
    const safeTime = Math.max(0, Math.min(duration || 0, nextTime));
    setSeekTime(safeTime);
    setAppTime(safeTime);
  };

  return (
    <div className="flex h-full w-full items-center px-3 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-0">
      <div className={`w-full ${hasActiveSong ? 'opacity-100' : 'opacity-95'}`}>
        <div className="flex items-center gap-3 lg:hidden">
          <div className="min-w-0 flex-1">
            <Track
              isPlaying={isPlaying}
              isActive={isActive}
              activeSong={activeSong}
              canPlayTrack={canPlayTrack}
              compact
            />
          </div>

          <Controls
            isPlaying={isPlaying}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
            canPlayTrack={canPlayTrack}
            compact
          />
        </div>

        <div className="hidden lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(220px,0.9fr)] lg:items-center lg:gap-2">
          <Track
            isPlaying={isPlaying}
            isActive={isActive}
            activeSong={activeSong}
            canPlayTrack={canPlayTrack}
          />

          <div className="flex min-w-0 flex-col items-center justify-center gap-2">
            <Controls
              isPlaying={isPlaying}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
              currentSongs={currentSongs}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
              canPlayTrack={canPlayTrack}
            />

            <Seekbar
              value={appTime}
              min={0}
              max={duration}
              onChange={handleSeekChange}
              onStepBackward={() => handleSeekChange(appTime - 5)}
              onStepForward={() => handleSeekChange(appTime + 5)}
            />
          </div>

          <VolumeBar
            value={volume}
            min={0}
            max={1}
            onChange={(nextVolume) => setVolume(nextVolume)}
            setVolume={setVolume}
          />
        </div>

        {renderAudio ? (
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => setAppTime(event.currentTarget.currentTime)}
            onLoadedData={(event) => {
              setDuration(event.currentTarget.duration || 0);
              setSeekTime(event.currentTarget.currentTime || 0);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MusicPlayer;
