import { useMemo, useState } from "react";

const NODES = ["A", "B", "C", "D", "E"];
const EDGES = [
  ["A", "B", 4],
  ["A", "C", 2],
  ["B", "C", -1],
  ["B", "D", 2],
  ["C", "D", 3],
  ["C", "E", 5],
  ["D", "E", 1],
];
const POSITIONS = {
  A: [14, 50],
  B: [35, 22],
  C: [35, 78],
  D: [67, 30],
  E: [87, 65],
};

const CODE = {
  bellman: {
    cpp: `for (int i = 1; i <= V - 1; i++)
  for (auto [u, v, w] : edges)
    if (dist[u] != INF)
      dist[v] = min(dist[v], dist[u] + w);`,
    java: `for (int i = 1; i <= V - 1; i++)
  for (Edge e : edges)
    if (dist[e.u] != INF)
      dist[e.v] = Math.min(dist[e.v], dist[e.u] + e.w);`,
    python: `for _ in range(len(graph) - 1):
    for u, v, w in edges:
        if dist[u] != INF:
            dist[v] = min(dist[v], dist[u] + w)`,
  },
  floyd: {
    cpp: `for (int k = 0; k < V; k++)
  for (int i = 0; i < V; i++)
    for (int j = 0; j < V; j++)
      dist[i][j] = min(dist[i][j],
        dist[i][k] + dist[k][j]);`,
    java: `for (int k = 0; k < n; k++)
  for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
      dist[i][j] = Math.min(dist[i][j],
        dist[i][k] + dist[k][j]);`,
    python: `for k in range(n):
    for i in range(n):
        for j in range(n):
            dist[i][j] = min(
                dist[i][j], dist[i][k] + dist[k][j])`,
  },
};

function createBellmanSteps() {
  const dist = Object.fromEntries(NODES.map((node) => [node, Infinity]));
  dist.A = 0;

  const steps = [{
    title: "Initialize",
    detail: "Start at A with distance 0. Every other vertex begins at ∞.",
    dist: { ...dist },
    active: null,
  }];

  for (let pass = 1; pass <= NODES.length - 1; pass += 1) {
    for (const [from, to, weight] of EDGES) {
      const nextDistance = dist[from] === Infinity ? Infinity : dist[from] + weight;
      const improved = nextDistance < dist[to];

      if (improved) dist[to] = nextDistance;

      steps.push({
        title: improved ? `Relax ${from} → ${to}` : `Check ${from} → ${to}`,
        detail: improved
          ? `dist(${to}) improves to ${dist[to]} using dist(${from}) + ${weight}.`
          : `No improvement. dist(${to}) remains ${dist[to] === Infinity ? "∞" : dist[to]}.`,
        dist: { ...dist },
        active: [from, to],
      });
    }
  }

  steps.push({
    title: "Complete",
    detail: "Bellman-Ford finished. A further relaxation pass can be used to detect a negative cycle.",
    dist: { ...dist },
    active: null,
  });

  return steps;
}

function createFloydSteps() {
  const dist = Object.fromEntries(
    NODES.map((from) => [
      from,
      Object.fromEntries(NODES.map((to) => [to, from === to ? 0 : Infinity])),
    ]),
  );

  EDGES.forEach(([from, to, weight]) => {
    dist[from][to] = Math.min(dist[from][to], weight);
  });

  const steps = [{
    title: "Initialize matrix",
    detail: "Set diagonal entries to 0, direct edges to their weights, and all other pairs to ∞.",
    dist: structuredClone(dist),
    active: null,
    via: null,
  }];

  for (const via of NODES) {
    for (const from of NODES) {
      for (const to of NODES) {
        const through = dist[from][via] === Infinity || dist[via][to] === Infinity
          ? Infinity
          : dist[from][via] + dist[via][to];
        const improved = through < dist[from][to];

        if (improved) dist[from][to] = through;

        steps.push({
          title: improved ? `Improve ${from} → ${to}` : `Check ${from} → ${to}`,
          detail: improved
            ? `Using ${via} as an intermediate gives ${through}, a shorter route.`
            : `Try ${from} → ${via} → ${to}. No shorter route is found.`,
          dist: structuredClone(dist),
          active: [from, to],
          via,
        });
      }
    }
  }

  steps.push({
    title: "Complete",
    detail: "Floyd-Warshall finished. The matrix now contains shortest distances between every pair of vertices.",
    dist: structuredClone(dist),
    active: null,
    via: null,
  });

  return steps;
}

const formatDistance = (value) => (value === Infinity ? "∞" : value);

export default function ShortestPathLab({ onClose, initialAlgorithm = "bellman" }) {
  const [algorithm, setAlgorithm] = useState(initialAlgorithm);
  const [language, setLanguage] = useState("cpp");
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () => (algorithm === "bellman" ? createBellmanSteps() : createFloydSteps()),
    [algorithm],
  );
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const progress = (stepIndex / Math.max(1, steps.length - 1)) * 100;

  const switchAlgorithm = (nextAlgorithm) => {
    setAlgorithm(nextAlgorithm);
    setStepIndex(0);
  };

  const next = () => setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  const previous = () => setStepIndex((index) => Math.max(index - 1, 0));

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6">
      <div className="flex h-[min(900px,94vh)] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08080c] shadow-2xl shadow-black/70">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">AlgoVerse · Graphs</p>
            <h2 className="mt-1 text-xl font-semibold">Shortest Path Lab</h2>
            <p className="mt-1 text-xs text-gray-600">Negative edges · all-pairs shortest paths · step-by-step visualization</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white">
            Esc · Close
          </button>
        </header>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <div className="flex gap-2">
            {[ ["bellman", "⚡ Bellman-Ford"], ["floyd", "▦ Floyd-Warshall"] ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => switchAlgorithm(id)}
                className={`rounded-xl px-4 py-2 text-xs transition ${
                  algorithm === id
                    ? "bg-violet-500/15 text-violet-200"
                    : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex rounded-xl border border-white/10 bg-white/[0.02] p-1">
            {[ ["cpp", "C++"], ["java", "Java"], ["python", "Python"] ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setLanguage(id)}
                className={`rounded-lg px-3 py-1.5 text-[10px] transition ${
                  language === id ? "bg-white/10 text-white" : "text-gray-600 hover:text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[1.25fr_0.9fr]">
          <section className="relative min-h-[420px] border-b border-white/10 lg:border-b-0 lg:border-r">
            {algorithm === "bellman" ? (
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {EDGES.map(([from, to, weight]) => {
                  const [x1, y1] = POSITIONS[from];
                  const [x2, y2] = POSITIONS[to];
                  const active = step.active?.[0] === from && step.active?.[1] === to;

                  return (
                    <g key={`${from}-${to}`}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={active ? "#a78bfa" : "#3f3f46"} strokeWidth={active ? "1.2" : "0.5"} />
                      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 1.5} fill="#a1a1aa" fontSize="3" textAnchor="middle">{weight}</text>
                    </g>
                  );
                })}

                {NODES.map((node) => (
                  <g key={node}>
                    <circle
                      cx={POSITIONS[node][0]}
                      cy={POSITIONS[node][1]}
                      r="5"
                      fill={step.active?.includes(node) ? "#7c3aed" : "#18181b"}
                      stroke="#52525b"
                      strokeWidth="0.8"
                    />
                    <text x={POSITIONS[node][0]} y={POSITIONS[node][1] + 1.1} fill="white" fontSize="3.2" textAnchor="middle">{node}</text>
                  </g>
                ))}
              </svg>
            ) : (
              <div className="absolute inset-0 overflow-auto p-6 sm:p-10">
                <div className="mb-5">
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">All-pairs distance matrix</p>
                  <p className="mt-2 text-sm text-gray-400">
                    Intermediate: <span className="font-semibold text-violet-300">{step.via || "None"}</span>
                  </p>
                </div>

                <div className="min-w-[420px] overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full border-collapse text-center text-xs">
                    <thead>
                      <tr>
                        <th className="border-b border-white/10 bg-white/[0.03] p-3 text-gray-600">from \ to</th>
                        {NODES.map((node) => <th key={node} className="border-b border-white/10 bg-white/[0.03] p-3 text-gray-400">{node}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {NODES.map((from) => (
                        <tr key={from}>
                          <th className="border-r border-white/10 bg-white/[0.02] p-3 text-gray-400">{from}</th>
                          {NODES.map((to) => (
                            <td
                              key={to}
                              className={`border-b border-white/5 p-3 font-mono ${
                                step.active?.[0] === from && step.active?.[1] === to
                                  ? "bg-violet-500/15 text-violet-200"
                                  : "text-gray-500"
                              }`}
                            >
                              {formatDistance(step.dist[from][to])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="absolute left-5 top-5">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[9px] uppercase tracking-widest text-violet-300">
                Step {stepIndex + 1} / {steps.length}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
              <p className="text-xs leading-5 text-gray-400">{step.detail}</p>
            </div>
          </section>

          <aside className="min-h-0 overflow-y-auto p-5">
            {algorithm === "bellman" && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-600">Distances from A</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                  {NODES.map((node) => (
                    <div key={node} className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <span className="text-xs text-gray-600">{node}</span>
                      <p className="mt-1 font-mono text-sm text-white">{formatDistance(step.dist[node])}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest text-gray-600">Implementation</p>
                <span className="text-[9px] text-gray-600">{language === "cpp" ? "C++" : language === "java" ? "Java" : "Python"}</span>
              </div>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-black/40 p-3 font-mono text-[10px] leading-5 text-gray-400"><code>{CODE[algorithm][language]}</code></pre>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={previous} disabled={stepIndex === 0} className="flex-1 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-gray-400 transition hover:bg-white/5 disabled:opacity-30">← Previous</button>
              <button onClick={next} disabled={stepIndex === steps.length - 1} className="flex-1 rounded-xl bg-violet-600 px-3 py-2.5 text-xs font-semibold transition hover:bg-violet-500 disabled:opacity-30">Next →</button>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
              <p className="text-[10px] uppercase tracking-widest text-amber-400">Key idea</p>
              <p className="mt-2 text-xs leading-5 text-gray-400">
                {algorithm === "bellman"
                  ? "Bellman-Ford relaxes every edge V−1 times and supports negative edge weights."
                  : "Floyd-Warshall uses dynamic programming to improve every route through each possible intermediate vertex."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
