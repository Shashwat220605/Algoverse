export default function StepTimeline({
  currentStep,
  totalSteps,
  onStepClick,
}) {
  return (
    <div className="w-full px-6 py-3">
      <div className="relative flex items-center justify-between">
        {/* Connecting line */}

        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className="group relative z-10 flex flex-col items-center"
            >
              <span
                className={`
                  flex h-3 w-3 items-center justify-center rounded-full
                  border transition-all duration-300
                  ${
                    isActive
                      ? "h-4 w-4 border-violet-300 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                      : isCompleted
                        ? "border-violet-500 bg-violet-500"
                        : "border-white/20 bg-[#09090b]"
                  }
                `}
              />

              <span
                className={`
                  absolute top-6 text-[10px] transition-colors
                  ${
                    isActive
                      ? "text-violet-300"
                      : "text-gray-600 group-hover:text-gray-400"
                  }
                `}
              >
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}