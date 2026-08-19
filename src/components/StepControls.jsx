import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Gauge,
} from "lucide-react";

import { PLAYBACK_SPEEDS } from "../store/algorithmStore.js";

export default function StepControls({
  currentStep,
  totalSteps,
  isPlaying,
  playbackSpeed,
  onSpeedChange,
  onPrevious,
  onNext,
  onReset,
  onTogglePlay,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#09090b] px-5 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
        >
          <RotateCcw size={16} />
          Restart
        </button>

        <div className="hidden items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1 sm:flex">
          <Gauge size={14} className="ml-2 mr-1 text-gray-600" />
          {PLAYBACK_SPEEDS.map((speed) => (
            <button
              key={speed.value}
              onClick={() => onSpeedChange(speed.value)}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium transition ${
                playbackSpeed === speed.value
                  ? "bg-violet-500/20 text-violet-200"
                  : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>

        <select
          value={playbackSpeed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
          className="rounded-lg border border-white/10 bg-[#09090b] px-2.5 py-2 text-xs text-gray-300 outline-none sm:hidden"
          aria-label="Playback speed"
        >
          {PLAYBACK_SPEEDS.map((speed) => (
            <option key={speed.value} value={speed.value}>
              {speed.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPrevious}
          disabled={currentStep === 0 || isPlaying}
          className="flex items-center gap-1 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        <button
          onClick={onTogglePlay}
          disabled={totalSteps <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isPlaying ? (
            <Pause size={17} />
          ) : (
            <Play size={17} className="ml-0.5" />
          )}
        </button>

        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1 || isPlaying}
          className="flex items-center gap-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="w-24 text-right">
        <span className="font-mono text-sm text-gray-400">
          {currentStep + 1}
        </span>
        <span className="mx-1 text-gray-700">/</span>
        <span className="font-mono text-sm text-gray-600">
          {totalSteps}
        </span>
      </div>
    </div>
  );
}
