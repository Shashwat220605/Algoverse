import { getAlgorithmExplanation } from "../data/algorithmExplanations.js";

const ACTION_INFO = {
  initialize: { label: "Ready", icon: "01" }, highlight: { label: "Check", icon: "02" }, move_pointer: { label: "Move", icon: "03" },
  compare: { label: "Compare", icon: "04" }, eliminate: { label: "Eliminate", icon: "05" }, swap: { label: "Swap", icon: "06" },
  found: { label: "Found", icon: "07" }, complete: { label: "Complete", icon: "✓" },
};

export default function ExplanationPanel({ step, totalSteps, algorithm }) {
  const { variables = {}, action, array = [], target } = step;
  const actionInfo = ACTION_INFO[action] || { label: "Step", icon: "•" };
  const info = getAlgorithmExplanation(algorithm);
  const progress = totalSteps > 1 ? Math.round((step.id / (totalSteps - 1)) * 100) : 100;
  const finished = step.id >= totalSteps - 1 || action === "complete";
  const isBinarySearch = algorithm === "binarySearch";
  const isBubbleSort = algorithm === "bubbleSort";
  const middleValue = variables.mid !== null && variables.mid !== undefined && array[variables.mid] !== undefined ? array[variables.mid] : null;
  const comparingValues = variables.comparing?.map((index) => array[index]) || [];
  const swappingValues = variables.swapping?.map((index) => array[index]) || [];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#09090b] p-5">
      <div className="rounded-2xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-transparent p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-[10px] font-bold text-violet-200">{actionInfo.icon}</span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">{actionInfo.label}</p>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-white">Learn by doing.</h2>
            <p className="mt-1 text-xs leading-5 text-gray-500">Watch the algorithm make one decision at a time.</p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] text-gray-400">{progress}%</span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        <div className="mt-2 flex justify-between text-[10px] text-gray-600"><span>Step {step.id + 1} / {totalSteps}</span><span>{finished ? "Session complete" : "Keep going"}</span></div>
      </div>

      {finished ? (
        <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.055] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">Nice work</p>
          <h3 className="mt-2 text-lg font-bold text-white">You reached the end of the trace.</h3>
          <p className="mt-1 text-xs leading-5 text-gray-400">Replay it, switch languages, or change the input to see how the algorithm behaves differently.</p>
        </div>
      ) : (
        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">What's happening?</p>
          <p className="mt-3 text-sm leading-7 text-gray-200">{step.explanation || step.detail || info.what}</p>
        </div>
      )}

      <section className="mt-3 rounded-2xl border border-violet-500/15 bg-violet-500/[0.035] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">The big idea</p>
        <p className="mt-2 text-xs leading-6 text-gray-400">{info.what}</p>
      </section>

      {isBinarySearch && middleValue !== null && <div className="mt-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-4"><p className="text-[10px] uppercase tracking-widest text-violet-400">Current comparison</p><div className="mt-3 flex items-center justify-center gap-3"><ValueCard label="arr[mid]" value={middleValue} /><div className="text-lg font-bold text-violet-300">{middleValue === target ? "=" : middleValue < target ? "<" : ">"}</div><ValueCard label="target" value={target} /></div></div>}
      {isBubbleSort && comparingValues.length === 2 && <div className="mt-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.06] p-4"><p className="text-[10px] uppercase tracking-widest text-violet-400">Current comparison</p><div className="mt-3 flex items-center justify-center gap-3"><ValueCard label={`arr[${variables.comparing[0]}]`} value={comparingValues[0]} /><div className="text-lg font-bold text-violet-300">{comparingValues[0] > comparingValues[1] ? ">" : "≤"}</div><ValueCard label={`arr[${variables.comparing[1]}]`} value={comparingValues[1]} /></div></div>}
      {isBubbleSort && swappingValues.length === 2 && <div className="mt-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-4"><p className="text-[10px] uppercase tracking-widest text-amber-400">Swap operation</p><p className="mt-3 text-center text-sm text-gray-300">{swappingValues[0]} <span className="mx-2 text-amber-400">↔</span> {swappingValues[1]}</p></div>}
      {isBinarySearch && <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] uppercase tracking-widest text-gray-600">Search range</p><p className="mt-1 text-sm text-gray-300">{variables.left !== null && variables.right !== null ? `Index ${variables.left} → ${variables.right}` : "Not initialized"}</p></div>}
      {isBubbleSort && <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="grid grid-cols-2 gap-3"><Variable name="pass (i)" value={variables.i} /><Variable name="comparison (j)" value={variables.j} /></div></div>}

      <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">How it works</p><ol className="mt-3 space-y-2">{info.how.map((item, index) => <li key={item} className="flex gap-3 text-xs leading-5 text-gray-400"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-[9px] text-violet-300">{index + 1}</span><span>{item}</span></li>)}</ol></section>
      <section className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">When to use it</p><p className="mt-2 text-xs leading-6 text-gray-400">{info.use}</p></section>
      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2"><InfoList title="Advantages" items={info.advantages} /><InfoList title="Limitations" items={info.disadvantages} /></div>
      <section className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Real-world use</p><p className="mt-2 text-xs leading-6 text-gray-400">{info.realWorld}</p></section>
      <div className="mt-4"><p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-600">Live variables</p>{isBinarySearch ? <div className="grid grid-cols-3 gap-2"><Variable name="left" value={variables.left} /><Variable name="mid" value={variables.mid} /><Variable name="right" value={variables.right} /></div> : <div className="grid grid-cols-2 gap-2"><Variable name="i" value={variables.i} /><Variable name="j" value={variables.j} /><Variable name="sortedFrom" value={variables.sortedFrom} /><Variable name="array size" value={array.length} /></div>}</div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Why this step?</p><p className="mt-2 text-xs leading-6 text-gray-400">{step.detail || info.what}</p></div>
    </div>
  );
}

function InfoList({ title, items }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">{title}</p><ul className="mt-3 space-y-2">{items.map((item) => <li key={item} className="text-xs leading-5 text-gray-400">• {item}</li>)}</ul></div>; }
function ValueCard({ label, value }) { return <div className="min-w-20 rounded-xl border border-white/10 bg-black/25 px-4 py-2 text-center"><p className="text-[9px] uppercase tracking-wider text-gray-600">{label}</p><p className="mt-1 font-mono text-lg font-semibold text-white">{value}</p></div>; }
function Variable({ name, value }) { return <div className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-[10px] text-gray-600">{name}</p><p className="mt-1 font-mono text-lg text-white">{value ?? "-"}</p></div>; }
