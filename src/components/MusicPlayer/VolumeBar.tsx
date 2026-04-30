import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import type { VolumeBarProps } from './types';

const VolumeBar = ({ value, min, max, onChange, setVolume }: VolumeBarProps) => {
  const progress = Math.max(0, Math.min(100, value * 100));

  return (
    <div className="hidden items-center justify-end gap-3 lg:flex">
      <button
        type="button"
        aria-label="Toggle volume"
        className="text-on-surface-variant transition-colors hover:text-white"
        onClick={() => setVolume(value === 0 ? 1 : 0)}
      >
        {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={20} />}
        {value <= 0.5 && value > 0 && <BsVolumeDownFill size={20} />}
        {value === 0 && <BsFillVolumeMuteFill size={20} />}
      </button>

      <div className="relative w-28">
        <div className="progress-track">
          <div className="absolute left-0 top-0 h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        </div>

        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Control de volumen"
        />
      </div>
    </div>
  );
};

export default VolumeBar;
