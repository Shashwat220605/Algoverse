import { useMemo, useState } from "react";

const QUESTIONS = [
  { id: "binary", algorithm: "Binary Search", category: "Searching", difficulty: "Easy", prompt: "A sorted array is [2, 5, 8, 12, 16, 23, 38]. What index contains 16?", options: ["3", "4", "5", "6"], answer: "4", hint: "Binary search starts from the middle and uses zero-based indexing." },
  { id: "bubble", algorithm: "Bubble Sort", category: "Sorting", difficulty: "Easy", prompt: "After one complete pass of Bubble Sort over [5, 1, 4, 2], what is the array?", options: ["[1, 4, 2, 5]", "[1, 2, 4, 5]", "[5, 4, 2, 1]", "[1, 5, 4, 2]"], answer: "[1, 4, 2, 5]", hint: "Adjacent larger elements move toward the end during a pass." },
  { id: "dijkstra", algorithm: "Dijkstra", category: "Graph", difficulty: "Medium", prompt: "For edges A-B=4, A-C=2, C-B=1, what is the shortest distance from A to B?", options: ["1", "2", "3", "4"], answer: "3", hint: "Try A → C → B and add the edge weights." },
  { id: "stack", algorithm: "Stack", category: "Data Structures", difficulty: "Easy", prompt: "A stack contains [10, 20, 30] with 30 on top. Which value is removed by pop()?", options: ["10", "20", "30", "None"], answer: "30", hint: "Stack follows LIFO: Last In, First Out." },
  { id: "queue", algorithm: "Queue", category: "Data Structures", difficulty: "Easy", prompt: "A queue contains [10, 20, 30] with 10 at the front. Which value leaves first?", options: ["10", "20", "30", "None"], answer: "10", hint: "Queue follows FIFO: First In, First Out." },
  { id: "bfs", algorithm: "BFS", category: "Graph", difficulty: "Easy", prompt: "Which data structure is normally used by Breadth-First Search?", options: ["Stack", "Queue", "Heap", "Hash Table"], answer: "Queue", hint: "BFS explores nodes level by level." },
];

export default function PracticeMode({ onClose }) {
  const [category, setCategory] = useState("All");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const categories = useMemo(() => ["All", ...new Set(QUESTIONS.map((q) => q.category))], []);
  const questions = useMemo(() => category === "All" ? QUESTIONS : QUESTIONS.filter((q) => q.category === category), [category]);
  const question = questions[index % questions.length];

  const chooseCategory = (value) => { setCategory(value); setIndex(0); setSelected(""); setAnswered(false); setShowHint(false); };
  const submit = () => { if (!selected || answered) return; setAnswered(true); if (selected === question.answer) setScore((s) => s + 1); };
  const next = () => { setIndex((i) => (i + 1) % questions.length); setSelected(""); setAnswered(false); setShowHint(false); };

  return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
    <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#09090d] shadow-2xl shadow-black/70">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">AlgoVerse</p><h2 className="mt-1 text-xl font-semibold">Practice Mode</h2></div><button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 hover:text-white">✕ Close</button></header>
      <div className="flex gap-2 overflow-x-auto border-b border-white/10 px-5 py-3">{categories.map((item) => <button key={item} onClick={() => chooseCategory(item)} className={`rounded-xl px-3 py-2 text-[10px] ${category === item ? "bg-violet-500/15 text-violet-200" : "text-gray-600 hover:bg-white/5 hover:text-white"}`}>{item}</button>)}<span className="ml-auto whitespace-nowrap rounded-xl border border-white/10 px-3 py-2 text-[10px] text-gray-500">Score: <b className="text-white">{score}</b> / {questions.length}</span></div>
      <main className="min-h-0 overflow-y-auto p-5 sm:p-8">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-600"><span>{question.algorithm} · {question.difficulty}</span><span>Question {(index % questions.length) + 1} / {questions.length}</span></div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${((index % questions.length) + 1) / questions.length * 100}%` }} /></div>
        <section className="mt-8 rounded-3xl border border-violet-500/15 bg-violet-500/[0.045] p-6 sm:p-8"><span className="rounded-full bg-white/5 px-2 py-1 text-[9px] text-violet-300">{question.category}</span><h3 className="mt-5 text-xl font-semibold leading-8 text-white sm:text-2xl">{question.prompt}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">{question.options.map((option) => { const correct = answered && option === question.answer; const wrong = answered && selected === option && option !== question.answer; return <button key={option} onClick={() => !answered && setSelected(option)} className={`rounded-2xl border p-4 text-left text-sm transition ${correct ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200" : wrong ? "border-red-400/30 bg-red-500/10 text-red-200" : selected === option ? "border-violet-400/40 bg-violet-500/10 text-violet-100" : "border-white/10 bg-white/[0.025] text-gray-400 hover:border-white/20 hover:text-white"}`}>{option}{correct && <span className="float-right">✓</span>}{wrong && <span className="float-right">✕</span>}</button>; })}</div>
          {answered && <div className={`mt-5 rounded-2xl border p-4 text-sm ${selected === question.answer ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200" : "border-amber-500/20 bg-amber-500/[0.06] text-amber-200"}`}>{selected === question.answer ? "Correct! Nice work." : `Not quite. The correct answer is ${question.answer}.`}</div>}
          {showHint && !answered && <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4 text-xs leading-5 text-amber-200">💡 {question.hint}</div>}
          <div className="mt-6 flex flex-wrap gap-2"><button onClick={() => setShowHint((v) => !v)} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-gray-500 hover:text-white">💡 {showHint ? "Hide hint" : "Hint"}</button>{!answered ? <button onClick={submit} disabled={!selected} className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold disabled:opacity-30">Check answer</button> : <button onClick={next} className="rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-semibold">Next question →</button>}</div>
        </section>
      </main>
    </div>
  </div>;
}
