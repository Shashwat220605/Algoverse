import { useMemo } from "react";

const SORTING = ["bubbleSort", "insertionSort", "selectionSort", "mergeSort", "quickSort", "heapSort"];
const GRAPH = ["bfs", "dfs"];

export default function InteractiveInputPanel({
  algorithm,
  arrayInput,
  targetInput,
  setArrayInput,
  setTargetInput,
  onRun,
  onReset,
  onShuffle,
  onRandom,
  onClear,
  error,
}) {
  const isGraph = GRAPH.includes(algorithm);
  const isSorting = SORTING.includes(algorithm);
  const needsTarget = !isSorting && !["stackPop", "stackPeek", "queueDequeue", "queueFront", "linkedListTraversal", "binaryTreePreorder", "binaryTreeInorder", "binaryTreePostorder", "binaryTreeLevelOrder", "buildMaxHeap", "heapExtractMax"].includes(algorithm);
  const targetLabel = useMemo(() => {
    if (isGraph) return "Start Node";
    if (algorithm === "linkedListInsertion") return "Value, Position";
    if (algorithm === "linkedListDeletion") return "Delete Position";
    if (algorithm === "stackPush") return "Push Value";
    if (algorithm === "queueEnqueue") return "Enqueue Value";
    if (algorithm === "heapInsert") return "Insert Value";
    if (algorithm === "bstInsert") return "Insert Value";
    if (algorithm === "bstSearch") return "Search Value";
    if (algorithm === "bstDelete") return "Delete Value";
    return "Target";
  }, [algorithm, isGraph]);

  return (
    <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-violet-500/15 bg-[#08080c]/95 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.6)]" /><p className="text-xs font-semibold text-gray-200">Interactive Playground</p></div>
          <p className="mt-1 text-[10px] text-gray-600">Change the data, then watch the algorithm react.</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/5 bg-white/[0.025] px-2 py-1 text-[9px] text-gray-600">LIVE INPUT</div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_150px_auto]">
        <div>
          <label className="mb-1.5 block text-[10px] uppercase tracking-widest text-gray-600">{isGraph ? "Graph Edges" : "Data"}</label>
          <input value={arrayInput} onChange={(e) => setArrayInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onRun(); }} className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 font-mono text-xs text-white outline-none transition placeholder:text-gray-700 focus:border-violet-500/50 focus:bg-violet-500/[0.035]" placeholder={isGraph ? "A-B, A-C, B-D" : "7, 3, 9, 2, 5"} />
        </div>
        {needsTarget ? <div><label className="mb-1.5 block text-[10px] uppercase tracking-widest text-gray-600">{targetLabel}</label><input value={targetInput} onChange={(e) => setTargetInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onRun(); }} className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2.5 font-mono text-xs text-white outline-none transition placeholder:text-gray-700 focus:border-violet-500/50 focus:bg-violet-500/[0.035]" placeholder={isGraph ? "A" : "25"} /></div> : <div className="hidden md:block" />}
        <button onClick={onRun} className="self-end rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-900/20 hover:bg-violet-500">▶ Run</button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={onRandom} disabled={isGraph} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">🎲 Random</button>
        <button onClick={onShuffle} disabled={isGraph} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">🔀 Shuffle</button>
        <button onClick={onClear} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Clear</button>
        <button onClick={onReset} className="rounded-lg border border-violet-500/15 bg-violet-500/[0.05] px-3 py-1.5 text-[10px] text-violet-300 hover:bg-violet-500/10">↺ Reset example</button>
        <span className="ml-auto hidden text-[9px] text-gray-700 sm:block">Press Enter to run</span>
      </div>
      {error && <div className="mt-3 rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-2 text-[10px] text-red-400">{error}</div>}
    </div>
  );
}
