const ACTION_INFO = {
  initialize: {
    label: "Initialize",
    icon: "01",
  },

  highlight: {
    label: "Check",
    icon: "02",
  },

  move_pointer: {
    label: "Move",
    icon: "03",
  },

  compare: {
    label: "Compare",
    icon: "04",
  },

  eliminate: {
    label: "Eliminate",
    icon: "05",
  },

  swap: {
    label: "Swap",
    icon: "06",
  },

  found: {
    label: "Found",
    icon: "07",
  },

  complete: {
    label: "Complete",
    icon: "✓",
  },
};


export default function ExplanationPanel({
  step,
  totalSteps,
  algorithm,
}) {
  const {
    variables = {},
    action,
    array = [],
    target,
  } = step;

  const actionInfo =
    ACTION_INFO[action] || {
      label: "Step",
      icon: "•",
    };


  const isBinarySearch =
    algorithm === "binarySearch";


  const isBubbleSort =
    algorithm === "bubbleSort";


  const middleValue =
    variables.mid !== null &&
    variables.mid !== undefined &&
    array[variables.mid] !== undefined
      ? array[variables.mid]
      : null;


  const comparingValues =
    variables.comparing
      ?.map(
        (index) =>
          array[index]
      ) || [];


  const swappingValues =
    variables.swapping
      ?.map(
        (index) =>
          array[index]
      ) || [];


  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#09090b] p-5">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-2">

            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/15 text-[10px] font-bold text-violet-300">
              {actionInfo.icon}
            </span>

            <p className="text-xs uppercase tracking-[0.18em] text-violet-400">
              {actionInfo.label}
            </p>

          </div>


          <h2 className="mt-3 text-xl font-semibold text-white">
            Step {step.id + 1}

            <span className="ml-2 text-sm font-normal text-gray-600">
              / {totalSteps}
            </span>
          </h2>

        </div>


        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-500">
          {isBinarySearch
            ? "Binary Search"
            : "Bubble Sort"}
        </div>

      </div>


      {/* Main explanation */}

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5">

        <p className="text-[11px] uppercase tracking-widest text-gray-600">
          What's happening?
        </p>

        <p className="mt-3 text-sm leading-7 text-gray-200">
          {step.explanation}
        </p>

      </div>


      {/* Binary Search comparison */}

      {isBinarySearch &&
        middleValue !== null && (

        <div className="mt-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-4">

          <p className="text-[10px] uppercase tracking-widest text-violet-400">
            Current Comparison
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">

            <ValueCard
              label="arr[mid]"
              value={middleValue}
            />

            <div className="text-lg font-bold text-violet-300">
              {middleValue === target
                ? "="
                : middleValue < target
                  ? "<"
                  : ">"}
            </div>

            <ValueCard
              label="target"
              value={target}
            />

          </div>

        </div>
      )}


      {/* Bubble Sort comparison */}

      {isBubbleSort &&
        comparingValues.length === 2 && (

        <div className="mt-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-4">

          <p className="text-[10px] uppercase tracking-widest text-violet-400">
            Current Comparison
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">

            <ValueCard
              label={`arr[${variables.comparing[0]}]`}
              value={comparingValues[0]}
            />

            <div className="text-lg font-bold text-violet-300">
              {comparingValues[0] >
              comparingValues[1]
                ? ">"
                : "≤"}
            </div>

            <ValueCard
              label={`arr[${variables.comparing[1]}]`}
              value={comparingValues[1]}
            />

          </div>

        </div>
      )}


      {/* Bubble Sort swap */}

      {isBubbleSort &&
        swappingValues.length === 2 && (

        <div className="mt-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4">

          <p className="text-[10px] uppercase tracking-widest text-amber-400">
            Swap Operation
          </p>

          <p className="mt-3 text-center text-sm text-gray-300">

            {swappingValues[0]}

            <span className="mx-2 text-amber-400">
              ↔
            </span>

            {swappingValues[1]}

          </p>

        </div>
      )}


      {/* Search range */}

      {isBinarySearch && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-[10px] uppercase tracking-widest text-gray-600">
                Search Range
              </p>

              <p className="mt-1 text-sm text-gray-300">

                {variables.left !== null &&
                variables.right !== null
                  ? `Index ${variables.left} → ${variables.right}`
                  : "Not initialized"}

              </p>

            </div>

          </div>

        </div>
      )}


      {/* Bubble Sort pass */}

      {isBubbleSort && (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

          <div className="grid grid-cols-2 gap-3">

            <Variable
              name="pass (i)"
              value={variables.i}
            />

            <Variable
              name="comparison (j)"
              value={variables.j}
            />

          </div>

        </div>
      )}


      {/* Variables */}

      <div className="mt-4">

        <p className="mb-3 text-[10px] uppercase tracking-widest text-gray-600">
          Live Variables
        </p>


        {isBinarySearch ? (

          <div className="grid grid-cols-3 gap-2">

            <Variable
              name="left"
              value={variables.left}
            />

            <Variable
              name="mid"
              value={variables.mid}
            />

            <Variable
              name="right"
              value={variables.right}
            />

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-2">

            <Variable
              name="i"
              value={variables.i}
            />

            <Variable
              name="j"
              value={variables.j}
            />

            <Variable
              name="sortedFrom"
              value={variables.sortedFrom}
            />

            <Variable
              name="array size"
              value={array.length}
            />

          </div>

        )}

      </div>


      {/* Why */}

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">

        <p className="text-[10px] uppercase tracking-widest text-gray-600">
          Why?
        </p>

        <p className="mt-2 text-xs leading-6 text-gray-400">
          {step.detail}
        </p>

      </div>


      {/* Complexity */}

      <div className="mt-auto pt-5">

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] p-4">

          <div className="flex items-center justify-between">

            <p className="text-[10px] uppercase tracking-widest text-violet-400">
              Complexity
            </p>

            <span className="text-[10px] text-gray-600">
              {isBinarySearch
                ? "Binary Search"
                : "Bubble Sort"}
            </span>

          </div>


          <div className="mt-4 grid grid-cols-2 gap-3">

            <Complexity
              label="Time"
              value={
                isBinarySearch
                  ? "O(log n)"
                  : "O(n²)"
              }
            />

            <Complexity
              label="Space"
              value="O(1)"
            />

          </div>

        </div>

      </div>

    </div>
  );
}


function ValueCard({
  label,
  value,
}) {
  return (
    <div className="min-w-20 rounded-xl border border-white/10 bg-black/25 px-4 py-2 text-center">

      <p className="text-[9px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-lg font-semibold text-white">
        {value}
      </p>

    </div>
  );
}


function Variable({
  name,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">

      <p className="text-[10px] text-gray-600">
        {name}
      </p>

      <p className="mt-1 font-mono text-lg text-white">
        {value ?? "-"}
      </p>

    </div>
  );
}


function Complexity({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-black/20 p-3">

      <p className="text-[10px] text-gray-600">
        {label}
      </p>

      <p className="mt-1 font-mono text-sm text-white">
        {value}
      </p>

    </div>
  );
}