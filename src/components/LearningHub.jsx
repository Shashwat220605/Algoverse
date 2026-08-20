import { useEffect, useMemo, useState } from "react";
import InteractiveDataStructures from "./InteractiveDataStructures.jsx";
import { createDijkstraTrace, defaultDijkstraGraph, dijkstraCode } from "../algorithms/graph/dijkstra.js";
import { loadProgress, markAlgorithmComplete, resetProgress, TRACKED_ALGORITHMS } from "../data/learningProgress.js";

const NODE_POSITIONS = { A: [14, 50], B: [35, 22], C: [35, 78], D: [62, 28], E: [66, 72], F: [88, 50] };
const NODE_NAMES = Object.keys(NODE_POSITIONS);

export default function LearningHub() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("progress");
  const [progress, setProgress] = useState(() => loadProgress());
  const refresh = () => setProgress(loadProgress());

  return <>
    <button onClick={() => setOpen(true)} aria-label="Open Learning Hub" title="Learning Hub" className="fixed left-[clamp(18rem,31vw,28rem)] top-3 z-[100] flex items-center gap-2 rounded-xl border border-violet-400/20 bg-[#101016]/95 px-4 py-2.5 text-xs font-semibold text-violet-200 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-[#17131f] max-sm:left-auto max-sm:right-4">✦ <span>Learning Hub</span></button>
    {open && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6">
      <div className="flex h-[min(900px,94vh)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08080c] shadow-2xl shadow-black/70">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div><p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">AlgoVerse</p><h2 className="mt-1 text-lg font-semibold">Learning Hub</h2></div>
          <button onClick={() => setOpen(false)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-400 hover:text-white">Esc · Close</button>
        </div>
        <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-white/10 px-5 py-3">
          {[['progress','📊 Progress'],['dijkstra','🧭 Dijkstra Lab'],['structures','🌳 Data Structure Lab']].map(([value,label]) => <button key={value} onClick={() => setTab(value)} className={`rounded-xl px-4 py-2 text-xs transition ${tab === value ? 'bg-violet-500/15 text-violet-200' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>{label}</button>)}
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {tab === "progress" && <ProgressPanel progress={progress} refresh={refresh} />}
          {tab === "dijkstra" && <DijkstraLab onComplete={() => { markAlgorithmComplete("dijkstra"); refresh(); }} />}
          {tab === "structures" && <InteractiveDataStructures />}
        </div>
      </div>
    </div>}
  </>;
}

function ProgressPanel({ progress, refresh }) {
  const completed = new Set(progress.completed);
  const percentage = Math.round((completed.size / TRACKED_ALGORITHMS.length) * 100);
  const groups = TRACKED_ALGORITHMS.reduce((acc, item) => { (acc[item[2]] ||= []).push(item); return acc; }, {});
  return <div className="h-full overflow-y-auto p-5 sm:p-8">
    <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr]">
      <div className="rounded-3xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.10] to-white/[0.02] p-6"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">Your learning journey</p><h3 className="mt-2 text-2xl font-semibold">Keep building your DSA streak.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">Explore an algorithm in the workspace, then mark it learned here. Progress stays on this browser with no account required.</p></div><div className="text-right"><p className="font-mono text-4xl font-bold text-white">{percentage}%</p><p className="text-[10px] uppercase tracking-widest text-gray-600">mastery</p></div></div><div className="mt-6 h-3 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${percentage}%` }} /></div><div className="mt-3 flex justify-between text-[10px] text-gray-600"><span>{completed.size} completed</span><span>{TRACKED_ALGORITHMS.length} tracked</span></div></div>
      <div className="grid grid-cols-2 gap-3"><Stat label="XP" value={progress.xp} icon="⚡" /><Stat label="Streak" value={progress.streak} icon="🔥" /><Stat label="Completed" value={completed.size} icon="✓" /><Stat label="Remaining" value={TRACKED_ALGORITHMS.length - completed.size} icon="→" /></div>
    </div>
    <div className="mt-7 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-widest text-gray-600">Algorithm mastery</p><h3 className="mt-1 text-lg font-semibold">Pick your next win</h3></div><button onClick={() => { resetProgress(); refresh(); }} className="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-gray-600 hover:text-red-300">Reset progress</button></div>
    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Object.entries(groups).map(([group, items]) => <div key={group} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="mb-3 flex items-center justify-between"><p className="text-xs font-medium text-gray-300">{group}</p><span className="text-[10px] text-gray-600">{items.filter((item) => completed.has(item[0])).length}/{items.length}</span></div>{items.map(([id,name]) => <div key={id} className="flex items-center justify-between gap-3 border-t border-white/5 py-2.5"><span className="text-xs text-gray-500">{name}</span>{completed.has(id) ? <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-300">✓ Learned</span> : <button onClick={() => { markAlgorithmComplete(id); refresh(); }} className="rounded-lg border border-white/10 px-2 py-1 text-[9px] text-gray-500 hover:border-violet-500/30 hover:text-violet-200">Mark learned</button>}</div>)}</div>)}</div>
  </div>;
}

function Stat({ label, value, icon }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"><span className="text-lg">{icon}</span><p className="mt-3 font-mono text-2xl font-semibold text-white">{value}</p><p className="text-[10px] uppercase tracking-widest text-gray-600">{label}</p></div>; }

function DijkstraLab({ onComplete }) {
  const [source, setSource] = useState("A");
  const [target, setTarget] = useState("F");
  const [stepIndex, setStepIndex] = useState(0);
  const [language, setLanguage] = useState("cpp");
  const steps = useMemo(() => createDijkstraTrace(defaultDijkstraGraph, source, target), [source, target]);
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const isComplete = stepIndex >= steps.length - 1;
  useEffect(() => setStepIndex(0), [source, target]);
  const move = (delta) => setStepIndex((value) => Math.max(0, Math.min(steps.length - 1, value + delta)));
  const progress = steps.length > 1 ? Math.round((stepIndex / (steps.length - 1)) * 100) : 100;
  const codeLines = dijkstraCode[language] || [];
  const shortestPath = step?.shortestPath || step?.path || [];

  return <div className="grid h-full min-h-0 lg:grid-cols-[1.45fr_0.95fr]">
    <div className="flex min-h-0 flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4"><div><div className="flex items-center gap-2"><span className="rounded-full bg-violet-500/10 px-2 py-1 text-[9px] uppercase tracking-widest text-violet-300">Interactive Lab</span><span className="text-[9px] text-gray-600">Weighted graph</span></div><h3 className="mt-2 text-xl font-semibold">Dijkstra's Shortest Path</h3><p className="mt-1 text-xs text-gray-600">Watch the algorithm discover the cheapest route, one decision at a time.</p></div><div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-1"><label className="px-2 text-[9px] uppercase tracking-widest text-gray-600">From</label><select value={source} onChange={(e)=>setSource(e.target.value)} className="rounded-lg border border-white/10 bg-[#0b0b10] px-2 py-2 text-xs"><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option></select><span className="text-gray-600">→</span><label className="px-1 text-[9px] uppercase tracking-widest text-gray-600">To</label><select value={target} onChange={(e)=>setTarget(e.target.value)} className="rounded-lg border border-white/10 bg-[#0b0b10] px-2 py-2 text-xs"><option>A</option><option>B</option><option>C</option><option>D</option><option>E</option><option>F</option></select></div></div>
      <div className="relative min-h-[390px] flex-1 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.08),transparent_58%)]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">{Object.entries(defaultDijkstraGraph).flatMap(([u,edges])=>edges.filter(([v])=>u<v).map(([v,w])=>{const [x1,y1]=NODE_POSITIONS[u], [x2,y2]=NODE_POSITIONS[v]; const active=(step?.activeEdge?.includes(u)&&step?.activeEdge?.includes(v)); const pathEdge=shortestPath.some((node,i)=>i<shortestPath.length-1&&((node===u&&shortestPath[i+1]===v)||(node===v&&shortestPath[i+1]===u))); return <g key={`${u}-${v}`}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={active?'#c4b5fd':pathEdge?'#34d399':'#3f3f46'} strokeWidth={active?'1.2':pathEdge?'0.9':'0.5'} /><rect x={(x1+x2)/2-2.2} y={(y1+y2)/2-2.2} width="4.4" height="3.8" rx="1" fill="#0b0b10" opacity=".9" /><text x={(x1+x2)/2} y={(y1+y2)/2+.8} fill="#a1a1aa" fontSize="3" textAnchor="middle">{w}</text></g>}))}</svg>
        {Object.entries(NODE_POSITIONS).map(([node,[x,y]]) => {const dist=step?.distances?.[node]; const active=step?.activeNode===node; const visited=step?.visited?.includes(node); const sourceNode=node===source; const targetNode=node===target; return <div key={node} className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 font-semibold shadow-xl transition-all duration-300 ${active?'scale-110 border-violet-300 bg-violet-500/30 text-white shadow-violet-500/20':sourceNode?'border-sky-400/60 bg-sky-500/10 text-sky-200':targetNode?'border-amber-400/60 bg-amber-500/10 text-amber-200':visited?'border-emerald-400/50 bg-emerald-500/10 text-emerald-200':'border-white/15 bg-[#111116] text-gray-300'}`} style={{left:`${x}%`,top:`${y}%`}}><span>{node}</span><span className="text-[9px] font-mono text-gray-500">{dist === Infinity ? '∞' : dist ?? '—'}</span></div>})}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[9px] backdrop-blur-xl"><span className="text-sky-300">● Start</span><span className="text-amber-300">● Target</span><span className="text-emerald-300">● Visited</span><span className="text-violet-300">● Current</span></div>
      </div>
      <div className="shrink-0 border-t border-white/10 p-4"><div className="flex items-center justify-between text-[10px] text-gray-600"><span>Execution · Step {stepIndex+1} / {steps.length}</span><span>{progress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-violet-500 transition-all" style={{width:`${progress}%`}} /></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>move(-1)} disabled={stepIndex===0} className="rounded-xl border border-white/10 px-4 py-2 text-xs disabled:opacity-30">← Previous</button><button onClick={()=>move(1)} disabled={isComplete} className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-medium hover:bg-violet-500 disabled:opacity-30">Next →</button>{isComplete && <button onClick={onComplete} className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300">✓ Mark learned</button>}</div></div>
    </div>
    <aside className="min-h-0 overflow-y-auto p-5">
      <div className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-4"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-widest text-violet-400">Current step</p><span className="rounded-full bg-white/5 px-2 py-1 text-[9px] text-gray-500">Dijkstra</span></div><p className="mt-3 text-sm leading-6 text-gray-300">{step?.explanation || "Select a source and destination, then step through the shortest-path algorithm."}</p></div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-widest text-gray-600">Distances</p><span className="text-[9px] text-gray-600">tentative</span></div><div className="mt-3 grid grid-cols-2 gap-2">{NODE_NAMES.map((node)=><div key={node} className={`rounded-xl border p-3 ${step?.activeNode===node?'border-violet-500/30 bg-violet-500/[0.06]':'border-white/10 bg-black/10'}`}><div className="flex justify-between"><span className="text-xs font-semibold text-gray-300">{node}</span><span className="font-mono text-sm text-white">{step?.distances?.[node]===Infinity?'∞':step?.distances?.[node] ?? '—'}</span></div></div>)}</div></div>
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] uppercase tracking-widest text-gray-600">Code · synced</p><div className="mt-3 flex gap-1 rounded-xl border border-white/10 bg-black/20 p-1">{['cpp','java','python'].map((item)=><button key={item} onClick={()=>setLanguage(item)} className={`flex-1 rounded-lg px-2 py-2 text-[10px] ${language===item?'bg-violet-500/15 text-violet-200':'text-gray-600 hover:text-gray-300'}`}>{item==='cpp'?'C++':item[0].toUpperCase()+item.slice(1)}</button>)}</div><pre className="mt-3 max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 font-mono text-[10px] leading-5 text-gray-500">{codeLines.map((line,index)=><div key={`${index}-${line}`} className={index+1===step?.codeLine?'rounded bg-violet-500/15 px-2 text-violet-200 ring-1 ring-violet-500/20':''}><span className="mr-3 select-none text-gray-700">{String(index+1).padStart(2,'0')}</span>{line}</div>)}</pre></div>
      {isComplete && <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4"><p className="text-[10px] uppercase tracking-widest text-emerald-400">Path complete</p><h4 className="mt-2 text-lg font-semibold text-white">Shortest route discovered.</h4><p className="mt-2 text-xs leading-5 text-gray-500">{shortestPath.length ? shortestPath.join(' → ') : 'See the highlighted route on the graph.'}</p><button onClick={onComplete} className="mt-4 w-full rounded-xl bg-emerald-500/15 px-4 py-2 text-xs text-emerald-200 hover:bg-emerald-500/20">✓ Add to progress</button></div>}
    </aside>
  </div>;
}
