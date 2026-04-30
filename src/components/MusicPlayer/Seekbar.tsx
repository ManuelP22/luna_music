import type { SeekbarProps } from './types';

const formatTime = (time: number) => {
  if (!Number.isFinite(time) || time < 0) return '0:00';
  return `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
};

const Seekbar = ({ value, min, max, onChange, onStepBackward, onStepForward }: SeekbarProps) => {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 0;
  const safeValue = Number.isFinite(value) ? Math.min(value, safeMax || 0) : 0;
  const progress = safeMax > 0 ? (safeValue / safeMax) * 100 : 0;

  return (
    <div className="flex w-full max-w-2xl items-center gap-3">
      <button
        type="button"
        onClick={onStepBackward}
        className="hidden text-label-sm text-white/55 transition-colors hover:text-white lg:block"
      >
        -5
      </button>

      <span className="w-10 text-right text-label-sm text-on-surface-variant">
        {formatTime(safeValue)}
      </span>

      <div className="relative flex-1">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          <div className="progress-thumb" style={{ left: `${progress}%` }} />
        </div>

        <input
          type="range"
          step="any"
          value={safeValue}
          min={min}
          max={safeMax}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Barra de progreso"
        />
      </div>

      <span className="w-10 text-label-sm text-on-surface-variant">
        {formatTime(safeMax)}
      </span>

      <button
        type="button"
        onClick={onStepForward}
        className="hidden text-label-sm text-white/55 transition-colors hover:text-white lg:block"
      >
        +5
      </button>
    </div>
  );
};

export default Seekbar;
