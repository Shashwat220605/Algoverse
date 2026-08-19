export default function StepTimeline({ currentStep, totalSteps, onStepClick }) {
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 100;

  return (
    <div className="w-full px-5 pb-4 pt-3 sm:px-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-600">Execution Journey</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {currentStep === totalSteps - 1 ? "Algorithm complete" : `Step ${currentStep + 1} of ${totalSteps}`}
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs text-violet-300">{Math.round(progress)}%</span>
          <span className="ml-1 text-[10px] text-gray-600">complete</span>
        </div>
      </div>

      <div className="relative px-1">
        <div className="absolute left-1 right-1 top-1.5 h-1 rounded-full bg-white/5" />
        <div
          className="absolute left-1 top-1.5 h-1 rounded-full bg-violet-500 shadow-[0_0_14px_rgba(139,92,246,0.45)] transition-all duration-300"
          style={{ width: `calc(${progress}% - ${progress === 100 ? 8 : 0}px)` }}
        />

        <div className="relative flex items-center justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to step ${index + 1}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => onStepClick(index)}
                className="group relative z-10 flex h-4 w-4 items-center justify-center rounded-full"
              >
                <span
                  className={`block rounded-full border transition-all duration-300 ${
                    isActive
                      ? "h-4 w-4 border-violet-200 bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,0.9)]"
                      : isCompleted
                        ? "h-2.5 w-2.5 border-violet-400 bg-violet-500"
                        : "h-2.5 w-2.5 border-white/15 bg-[#09090b] group-hover:border-violet-300 group-hover:bg-violet-500/40"
                  }`}
                />
                <span className={`pointer-events-none absolute top-5 whitespace-nowrap text-[9px] transition-colors ${isActive ? "text-violet-300" : "text-gray-700 group-hover:text-gray-400"}`}>
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
