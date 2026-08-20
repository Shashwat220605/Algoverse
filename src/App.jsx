import { useEffect, useState } from "react";
import AlgorithmWorkspace from "./pages/AlgorithmWorkspace";
import LearningHub from "./components/LearningHub.jsx";
import PracticeMode from "./components/PracticeMode.jsx";
import DSANotes from "./components/DSANotes.jsx";
import MSTLab from "./components/MSTLab.jsx";
import ShortestPathLab from "./components/ShortestPathLab.jsx";

function App() {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [mstOpen, setMstOpen] = useState(false);
  const [shortestPath, setShortestPath] = useState(null);

  useEffect(() => {
    const openShortestPath = (event) => {
      setShortestPath(event.detail === "floydWarshall" ? "floyd" : "bellman");
    };

    const closeModals = (event) => {
      if (event.key !== "Escape") return;
      setPracticeOpen(false);
      setNotesOpen(false);
      setMstOpen(false);
      setShortestPath(null);
    };

    window.addEventListener("algoverso:open-shortest-path", openShortestPath);
    window.addEventListener("keydown", closeModals);

    return () => {
      window.removeEventListener("algoverso:open-shortest-path", openShortestPath);
      window.removeEventListener("keydown", closeModals);
    };
  }, []);

  return (
    <>
      <AlgorithmWorkspace />
      <LearningHub />

      <div className="algo-tools-dock fixed bottom-4 right-4 z-[100] flex max-w-[calc(100vw-2rem)] items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b10]/90 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:bottom-5 sm:right-5">
        <span className="hidden px-2 text-[9px] font-medium uppercase tracking-[0.18em] text-gray-600 lg:inline">Learn</span>

        <button
          onClick={() => setMstOpen(true)}
          title="Prim's and Kruskal's algorithms"
          className="shrink-0 whitespace-nowrap rounded-xl border border-amber-400/10 bg-amber-500/[0.06] px-3 py-2.5 text-xs font-semibold text-amber-200 transition hover:border-amber-400/30 hover:bg-amber-500/10"
        >
          🌐 <span className="hidden sm:inline">MST Lab</span>
        </button>

        <button
          onClick={() => setShortestPath("bellman")}
          title="Bellman-Ford and Floyd-Warshall"
          className="shrink-0 whitespace-nowrap rounded-xl border border-violet-400/10 bg-violet-500/[0.06] px-3 py-2.5 text-xs font-semibold text-violet-200 transition hover:border-violet-400/30 hover:bg-violet-500/10"
        >
          ⚡ <span className="hidden sm:inline">Shortest Path</span>
        </button>

        <button
          onClick={() => setNotesOpen(true)}
          title="DSA Notes"
          className="shrink-0 whitespace-nowrap rounded-xl border border-sky-400/10 bg-sky-500/[0.06] px-3 py-2.5 text-xs font-semibold text-sky-200 transition hover:border-sky-400/30 hover:bg-sky-500/10"
        >
          📚 <span className="hidden sm:inline">DSA Notes</span>
        </button>

        <button
          onClick={() => setPracticeOpen(true)}
          title="Practice Mode"
          className="shrink-0 whitespace-nowrap rounded-xl border border-emerald-400/10 bg-emerald-500/[0.06] px-3 py-2.5 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400/30 hover:bg-emerald-500/10"
        >
          🧪 <span className="hidden sm:inline">Practice Mode</span>
        </button>
      </div>

      {practiceOpen && <PracticeMode onClose={() => setPracticeOpen(false)} />}
      {notesOpen && <DSANotes onClose={() => setNotesOpen(false)} />}
      {mstOpen && <MSTLab onClose={() => setMstOpen(false)} />}
      {shortestPath && (
        <ShortestPathLab
          initialAlgorithm={shortestPath}
          onClose={() => setShortestPath(null)}
        />
      )}
    </>
  );
}

export default App;
