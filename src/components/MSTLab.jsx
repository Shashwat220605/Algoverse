import { useMemo, useState } from "react";

const GRAPH = {
  A: [["B", 4], ["C", 2]],
  B: [["A", 4], ["C", 1], ["D", 5]],
  C: [["A", 2], ["B", 1], ["D", 8], ["E", 10]],
  D: [["B", 5], ["C", 8], ["E", 2], ["F", 6]],
  E: [["C", 10], ["D", 2], ["F", 3]],
  F: [["D", 6], ["E", 3]],
};

const POS = { A: [14, 50], B: [35, 22], C: [35, 78], D: [62, 28], E: [66, 72], F: [88, 50] };
const NODES = Object.keys(GRAPH);
const EDGES = Object.entries(GRAPH).flatMap(([u, edges]) => edges.filter(([v]) => u < v).map(([v, w]) => [u, v, w]));

const CODE = {
  prim: {
    cpp: ["key[start] = 0;", "while (mst.size() < V - 1) {", "  u = minKey(key, inMST);", "  inMST[u] = true;", "  for (auto [v,w] : graph[u])", "    if (!inMST[v] && w < key[v]) key[v] = w;", "}"],
    java: ["key[start] = 0;", "while (mst.size() < vertices - 1) {", "  int u = minKey(key, inMst);", "  inMst[u] = true;", "  for (Edge e : graph[u])", "    if (!inMst[e.to] && e.weight < key[e.to]) key[e.to] = e.weight;", "}"],
    python: ["key[start] = 0", "while len(mst) < len(graph) - 1:", "    u = min_key(key, in_mst)", "    in_mst.add(u)", "    for v, weight in graph[u]:", "        if v not in in_mst and weight < key[v]: key[v] = weight", ""],
  },
  kruskal: {
    cpp: ["sort(edges.begin(), edges.end());", "for (auto [w,u,v] : edges) {", "  if (find(u) != find(v)) {", "    unite(u, v);", "    mst.push_back({u, v, w});", "  }", "}"],
    java: ["Arrays.sort(edges, Comparator.comparingInt(e -> e.weight));", "for (Edge e : edges) {", "  if (find(e.u) != find(e.v)) {", "    union(e.u, e.v);", "    mst.add(e);", "  }", "}"],
    python: ["edges.sort(key=lambda edge: edge[2])", "for u, v, weight in edges:", "    if find(u) != find(v):", "        union(u, v)", "        mst.append((u, v, weight))", ""],
  },
};

function edgeKey(a, b) { return [a, b].sort().join("-"); }

function buildPrim() {
  const key = Object.fromEntries(NODES.map((n) => [n, Infinity]));
  const parent = {};
  const used = new Set();
  const chosen = [];
  const steps = [{ action: "initialize", current: "A", chosen: [], comparing: [], explanation: "Start Prim's algorithm at A. Its key is 0; every other key begins at infinity." }];
  key.A = 0;
  while (used.size < NODES.length) {
    let u = null;
    for (const n of NODES) if (!used.has(n) && (u === null || key[n] < key[u])) u = n;
    if (u === null || key[u] === Infinity) break;
    if (parent[u]) {
      chosen.push([parent[u], u, key[u]]);
      steps.push({ action: "add", current: u, chosen: [...chosen], comparing: [parent[u], u], explanation: `Add edge ${parent[u]}–${u} with weight ${key[u]} to the MST.` });
    } else {
      steps.push({ action: "select", current: u, chosen: [...chosen], comparing: [], explanation: `Select ${u}, the unvisited vertex with the smallest key ${key[u]}.` });
    }
    used.add(u);
    for (const [v, w] of GRAPH[u]) {
      if (!used.has(v) && w < key[v]) {
        key[v] = w;
        parent[v] = u;
        steps.push({ action: "update", current: u, chosen: [...chosen], comparing: [u, v], explanation: `Update ${v}: edge ${u}–${v} has a better connecting weight of ${w}.` });
      }
    }
  }
  const total = chosen.reduce((sum, [, , w]) => sum + w, 0);
  steps.push({ action: "complete", current: null, chosen: [...chosen], comparing: [], explanation: `Prim's algorithm is complete. Minimum spanning tree weight = ${total}.` });
  return steps;
}

function buildKruskal() {
  const parent = Object.fromEntries(NODES.map((n) => [n, n]));
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const steps = [{ action: "initialize", current: null, chosen: [], comparing: [], explanation: "Sort all edges by weight, then consider them from smallest to largest." }];
  const chosen = [];
  for (const [u, v, w] of [...EDGES].sort((a, b) => a[2] - b[2])) {
    const rootU = find(u); const rootV = find(v);
    const comparing = [u, v];
    if (rootU !== rootV) {
      parent[rootU] = rootV;
      chosen.push([u, v, w]);
      steps.push({ action: "accept", current: u, chosen: [...chosen], comparing, explanation: `Accept ${u}–${v} (${w}) because it connects two different components.` });
    } else {
      steps.push({ action: "reject", current: u, chosen: [...chosen], comparing, explanation: `Reject ${u}–${v} (${w}) because it would create a cycle.` });
    }
    if (chosen.length === NODES.length - 1) break;
  }
  const total = chosen.reduce((sum, [, , w]) => sum + w, 0);
  steps.push({ action: "complete", current: null, chosen: [...chosen], comparing: [], explanation: `Kruskal's algorithm is complete. Minimum spanning tree weight = ${total}.` });
  return steps;
}

export default function MSTLab({ onClose }) {
  const [algorithm, setAlgorithm] = useState("prim");
  const [language, setLanguage] = useState("cpp");
  const [stepIndex, setStepIndex] = useState(0);
  const steps = useMemo(() => algorithm === "prim" ? buildPrim() : buildKruskal(), [algorithm]);
  const step = steps[stepIndex] || steps[0];
  const chosen = new Set(step.chosen.map(([a, b]) => edgeKey(a, b)));
  const comparing = new Set(step.comparing || []);
  const progress = Math.round((stepIndex / Math.max(1, steps.length - 1)) * 100);

  const switchAlgorithm = (value) => { setAlgorithm(value); setStepIndex(0); };

  return <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6">
    <div className="flex h-[min(900px,94vh)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08080c] shadow-2xl shadow-black/70">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div><p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">AlgoVerse · Graphs</p><h2 className="mt-1 text-xl font-semibold">Minimum Spanning Tree Lab</h2><p className="mt-1 text-xs text-gray-600">Learn how Prim's and Kruskal's algorithms build the same minimum-cost tree.</p></div>
        <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 hover:text-white">Esc · Close</button>
      </header>
      <div className="flex shrink-0 items-center justify-between gap-3 overflow-x-auto border-b border-white/10 px-5 py-3">
        <div className="flex gap-2"><button onClick={() => switchAlgorithm("prim")} className={`rounded-xl px-4 py-2 text-xs ${algorithm === "prim" ? "bg-violet-500/15 text-violet-200" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}>🌱 Prim's</button><button onClick={() => switchAlgorithm("kruskal")} className={`rounded-xl px-4 py-2 text-xs ${algorithm === "kruskal" ? "bg-violet-500/15 text-violet-200" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}>🔗 Kruskal's</button></div>
        <div className="flex rounded-xl border border-white/10 bg-white/[0.02] p-1">{[["cpp","C++"],["java","Java"],["python","Python"]].map(([id,label]) => <button key={id} onClick={() => setLanguage(id)} className={`rounded-lg px-3 py-1.5 text-[10px] ${language === id ? "bg-white/10 text-white" : "text-gray-600 hover:text-gray-300"}`}>{label}</button>)}</div>
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[1.5fr_0.9fr]">
        <section className="relative min-h-[420px] border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="absolute left-5 top-5 z-10"><span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[9px] uppercase tracking-widest text-violet-300">Step {stepIndex + 1} / {steps.length}</span><h3 className="mt-3 text-lg font-semibold">{algorithm === "prim" ? "Prim's Algorithm" : "Kruskal's Algorithm"}</h3></div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {EDGES.map(([u, v, w]) => { const [x1,y1]=POS[u]; const [x2,y2]=POS[v]; const key=edgeKey(u,v); const active=comparing.has(u)&&comparing.has(v); const inTree=chosen.has(key); return <g key={key}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={inTree ? "#34d399" : active ? "#c4b5fd" : "#3f3f46"} strokeWidth={inTree ? "1.2" : active ? "1" : "0.45"}/><rect x={(x1+x2)/2-2.5} y={(y1+y2)/2-2} width="5" height="4" rx="1" fill="#0b0b10"/><text x={(x1+x2)/2} y={(y1+y2)/2+0.8} fill="#a1a1aa" fontSize="3" textAnchor="middle">{w}</text></g>; })}
            {NODES.map((node) => { const [x,y]=POS[node]; const active=step.current===node; const compare=comparing.has(node); return <g key={node}><circle cx={x} cy={y} r={active?5.8:5} fill={active?"#7c3aed":compare?"#a78bfa":"#18181b"} stroke={active?"#ddd6fe":"#52525b"} strokeWidth="0.8"/><text x={x} y={y+1.1} fill="white" fontSize="3.2" textAnchor="middle">{node}</text></g>; })}
          </svg>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2 rounded-xl border border-white/10 bg-black/55 px-3 py-2 text-[9px] backdrop-blur-xl"><span className="text-emerald-300">● MST edge</span><span className="text-violet-300">● Current</span><span className="text-gray-500">Edge number = weight</span></div>
          <div className="absolute bottom-5 right-5 rounded-xl border border-white/10 bg-black/55 px-3 py-2 text-right backdrop-blur-xl"><p className="text-[9px] uppercase tracking-widest text-gray-600">MST weight</p><p className="mt-1 font-mono text-lg text-white">{step.chosen.reduce((s, [, , w]) => s + w, 0)}</p></div>
        </section>
        <aside className="min-h-0 overflow-y-auto p-5">
          <div className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-4"><p className="text-[10px] uppercase tracking-widest text-violet-400">What's happening</p><p className="mt-3 text-sm leading-6 text-gray-300">{step.explanation}</p></div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-widest text-gray-600">Implementation</p><span className="text-[9px] text-gray-600">{language === "cpp" ? "C++" : language === "java" ? "Java" : "Python"}</span></div><pre className="mt-3 overflow-x-auto rounded-xl bg-black/40 p-3 font-mono text-[10px] leading-5 text-gray-400"><code>{CODE[algorithm][language].join("\n")}</code></pre></div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><p className="text-[10px] uppercase tracking-widest text-gray-600">Selected edges</p>{step.chosen.length ? <div className="mt-3 grid grid-cols-2 gap-2">{step.chosen.map(([u,v,w]) => <div key={`${u}-${v}`} className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-2.5 text-xs text-emerald-200">{u} — {v}<span className="float-right font-mono text-gray-400">{w}</span></div>)}</div> : <p className="mt-3 text-xs text-gray-600">No edges selected yet.</p>}</div>
        </aside>
      </div>
      <footer className="shrink-0 border-t border-white/10 p-4"><div className="flex items-center justify-between text-[10px] text-gray-600"><span>Execution progress</span><span>{progress}%</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0} className="rounded-xl border border-white/10 px-4 py-2 text-xs disabled:opacity-30">← Previous</button><button onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))} disabled={stepIndex === steps.length - 1} className="rounded-xl bg-violet-600 px-5 py-2 text-xs font-medium hover:bg-violet-500 disabled:opacity-30">Next →</button><button onClick={() => setStepIndex(0)} className="rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-400 hover:text-white">Reset</button></div></footer>
    </div>
  </div>;
}
