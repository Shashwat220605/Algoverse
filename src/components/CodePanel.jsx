export default function CodePanel({
  code,
  activeLine,
  step,
}) {
  const array =
    step?.array || [];

  const target =
    step?.target;

  const variables =
    step?.variables || {};

  const {
    left,
    right,
    mid,
    i,
    j,
    comparing = [],
    swapping = [],
    sortedFrom,
  } = variables;


  const currentValue =
    mid !== null &&
    mid !== undefined &&
    array[mid] !== undefined
      ? array[mid]
      : null;


  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#09090b]">

      {/* Header */}

      <div className="shrink-0 border-b border-white/10 p-5">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400">
              Implementation
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">
              C++
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">
            Live
          </div>

        </div>

      </div>


      {/* Code */}

      <div className="min-h-0 flex-1 overflow-auto p-4">

        <div className="font-mono text-xs">

          {code.map((line, index) => {

            const isActive =
              index === activeLine;

            return (
              <div
                key={index}
                className={`group flex min-h-7 items-center rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-violet-500/15 text-violet-100"
                    : "text-gray-500"
                }`}
              >

                <span
                  className={`w-9 shrink-0 select-none pr-3 text-right text-[10px] ${
                    isActive
                      ? "text-violet-400"
                      : "text-gray-700"
                  }`}
                >
                  {index + 1}
                </span>

                <span
                  className={`mr-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive
                      ? "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                      : "bg-transparent"
                  }`}
                />

                <code className="whitespace-pre">
                  {line || "\u00A0"}
                </code>

              </div>
            );
          })}

        </div>

      </div>


      {/* Live Execution */}

      <div className="shrink-0 border-t border-white/10 p-4">

        <p className="mb-3 text-[10px] uppercase tracking-widest text-gray-600">
          Live Execution
        </p>


        {/* Binary Search */}

        {target !== null &&
          target !== undefined && (

          <div className="grid grid-cols-2 gap-2">

            <ExecutionValue
              label="left"
              value={left}
            />

            <ExecutionValue
              label="right"
              value={right}
            />

            <ExecutionValue
              label="mid"
              value={mid}
            />

            <ExecutionValue
              label="arr[mid]"
              value={currentValue}
            />

          </div>

        )}


        {/* Bubble Sort */}

        {(target === null ||
          target === undefined) && (

          <div className="grid grid-cols-2 gap-2">

            <ExecutionValue
              label="pass (i)"
              value={i}
            />

            <ExecutionValue
              label="comparison (j)"
              value={j}
            />

            <ExecutionValue
              label="comparing"
              value={
                comparing.length
                  ? comparing.join(" ↔ ")
                  : "-"
              }
            />

            <ExecutionValue
              label="swapping"
              value={
                swapping.length
                  ? swapping.join(" ↔ ")
                  : "-"
              }
            />

          </div>

        )}


        {/* Target */}

        {target !== null &&
          target !== undefined && (

          <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">

            <div className="flex items-center justify-between">

              <span className="text-[10px] text-gray-600">
                target
              </span>

              <span className="font-mono text-xs text-violet-300">
                {target}
              </span>

            </div>

          </div>

        )}


        {/* Sorted section */}

        {sortedFrom !== undefined && (

          <div className="mt-2 rounded-xl border border-green-500/10 bg-green-500/[0.03] px-3 py-2">

            <div className="flex items-center justify-between">

              <span className="text-[10px] text-gray-600">
                sorted from
              </span>

              <span className="font-mono text-xs text-green-400">
                index {sortedFrom}
              </span>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


function ExecutionValue({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2">

      <p className="text-[9px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-sm text-white">
        {value ?? "-"}
      </p>

    </div>
  );
}