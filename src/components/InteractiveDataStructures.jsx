import { useMemo, useState } from "react";

const TABS = ["Array", "Stack", "Queue", "Linked List", "BST", "Heap"];

export default function InteractiveDataStructures() {
  const [tab, setTab] = useState("Array");
  const [values, setValues] = useState([7, 3, 9, 2]);
  const [input, setInput] = useState(5);
  const [message, setMessage] = useState("Ready to experiment.");

  const reset = () => {
    const defaults = { Array: [7, 3, 9, 2], Stack: [4, 8, 2], Queue: [12, 18, 24], "Linked List": [10, 20, 30], BST: [50, 30, 70, 20, 40, 60, 80], Heap: [90, 70, 60, 40, 50, 20] };
    setValues(defaults[tab]);
    setMessage(`${tab} reset to the example structure.`);
  };

  const add = () => {
    const value = Number(input);
    if (!Number.isFinite(value)) return setMessage("Enter a valid number.");
    if (tab === "Queue") setValues((items) => [...items, value]);
    else if (tab === "Stack") setValues((items) => [...items, value]);
    else if (tab === "BST") setValues((items) => [...items, value]);
    else if (tab === "Heap") setValues((items) => [...items, value]);
    else setValues((items) => [...items, value]);
    setMessage(`${value} added to ${tab}.`);
  };

  const remove = () => {
    if (!values.length) return setMessage("Nothing to remove.");
    if (tab === "Queue") setValues((items) => items.slice(1));
    else setValues((items) => items.slice(0, -1));
    setMessage(tab === "Queue" ? "Front element removed." : "Top/end element removed.");
  };

  const shuffle = () => {
    setValues((items) => [...items].sort(() => Math.random() - 0.5));
    setMessage("Structure shuffled.");
  };

  const tree = useMemo(() => buildTree(values), [values]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#07070a] text-white">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">Interactive Lab</p>
        <h2 className="mt-1 text-xl font-semibold">Build Data Structures</h2>
        <p className="mt-1 text-xs text-gray-500">Change the structure and see what each operation actually does.</p>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((item) => <button key={item} onClick={() => { setTab(item); setMessage(`${item} playground selected.`); }} className={`whitespace-nowrap rounded-xl border px-3 py-2 text-xs transition ${tab === item ? "border-violet-500/40 bg-violet-500/15 text-violet-200" : "border-white/10 bg-white/[0.03] text-gray-500 hover:text-white"}`}>{item}</button>)}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_300px]">
        <div className="flex min-h-[420px] flex-col p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] uppercase tracking-widest text-gray-600">Current structure</p><p className="mt-1 text-sm text-gray-300">{tab}</p></div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-500">{values.length} items</span>
          </div>
          <div className="relative mt-6 flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-3xl border border-white/10 bg-black/20 p-8">
            {tab === "BST" ? <TreeView root={tree} /> : <LinearView values={values} vertical={tab === "Stack"} />}
          </div>
          <div className="mt-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.04] px-4 py-3 text-xs text-gray-400"><span className="text-violet-300">●</span> {message}</div>
        </div>

        <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">Operations</p>
          <div className="mt-4 space-y-3">
            <label className="block text-xs text-gray-500">Value</label>
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-sm outline-none focus:border-violet-500/50" />
            <button onClick={add} className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-medium hover:bg-violet-500">Insert / Add</button>
            <button onClick={remove} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/10">Remove</button>
            <button onClick={shuffle} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/10">Shuffle</button>
            <button onClick={reset} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/10">Reset Example</button>
          </div>
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <p className="text-[10px] uppercase tracking-widest text-gray-600">Learn the rule</p>
            <p className="mt-2 text-xs leading-6 text-gray-400">{rules[tab]}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LinearView({ values, vertical }) {
  return <div className={`flex items-center justify-center gap-3 ${vertical ? "flex-col-reverse" : "flex-wrap"}`}>
    {values.map((value, index) => <div key={`${index}-${value}`} className="relative flex h-16 min-w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/[0.07] px-4 font-mono text-lg font-semibold shadow-lg shadow-violet-950/10"><span>{value}</span>{vertical && index === values.length - 1 && <span className="absolute -right-16 text-[9px] uppercase tracking-widest text-violet-400">TOP</span>}</div>)}
  </div>;
}

function buildTree(values) {
  let root = null;
  values.forEach((value) => {
    const node = { value, left: null, right: null };
    if (!root) { root = node; return; }
    let current = root;
    while (true) {
      if (value === current.value) break;
      if (value < current.value) {
        if (!current.left) { current.left = node; break; }
        current = current.left;
      } else {
        if (!current.right) { current.right = node; break; }
        current = current.right;
      }
    }
  });
  return root;
}

function TreeView({ root }) {
  if (!root) return <p className="text-sm text-gray-600">Empty tree</p>;
  return <div className="min-w-[500px]"><div className="flex justify-center"><TreeNode node={root} /></div></div>;
}

function TreeNode({ node }) {
  if (!node) return null;
  return <div className="flex flex-col items-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-mono font-semibold text-violet-100">{node.value}</div>
    {(node.left || node.right) && <div className="mt-3 flex items-start gap-12"><div className="flex flex-col items-center">{node.left ? <TreeNode node={node.left} /> : <span className="mt-5 text-xs text-gray-700">∅</span>}</div><div className="flex flex-col items-center">{node.right ? <TreeNode node={node.right} /> : <span className="mt-5 text-xs text-gray-700">∅</span>}</div></div>}
  </div>;
}

const rules = {
  Array: "Arrays keep elements in indexed positions. Adding or removing in the middle may require shifting other elements.",
  Stack: "Stack = LIFO. Push and pop happen at the top, so the newest item leaves first.",
  Queue: "Queue = FIFO. Enqueue at the rear and dequeue from the front, so the oldest item leaves first.",
  "Linked List": "Each node points to the next node. Insertions can avoid shifting existing nodes, but traversal is sequential.",
  BST: "Values smaller than a node go left; larger values go right. A balanced BST can make search very fast.",
  Heap: "A max heap keeps the largest value at the root. Insertions bubble upward and removals restore the heap downward.",
};
