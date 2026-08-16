import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

export default function StepControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPrevious,
  onNext,
  onReset,
  onTogglePlay,
}) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 bg-[#09090b] px-5 py-4">

      {/* Restart */}

      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
      >
        <RotateCcw size={16} />

        Restart
      </button>


      {/* Main controls */}

      <div className="flex items-center gap-3">

        <button
          onClick={onPrevious}
          disabled={currentStep === 0 || isPlaying}
          className="flex items-center gap-1 rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />

          Previous
        </button>


        {/* Play / Pause */}

        <button
          onClick={onTogglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 transition hover:bg-violet-500"
        >
          {isPlaying ? (
            <Pause size={17} />
          ) : (
            <Play size={17} className="ml-0.5" />
          )}
        </button>


        <button
          onClick={onNext}
          disabled={
            currentStep === totalSteps - 1 ||
            isPlaying
          }
          className="flex items-center gap-1 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next

          <ChevronRight size={17} />
        </button>

      </div>


      {/* Step counter */}

      <div className="w-24 text-right">
        <span className="font-mono text-sm text-gray-400">
          {currentStep + 1}
        </span>

        <span className="mx-1 text-gray-700">
          /
        </span>

        <span className="font-mono text-sm text-gray-600">
          {totalSteps}
        </span>
      </div>

    </div>
  );
}