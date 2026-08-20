import { useState } from "react";
import AlgorithmWorkspace from "./pages/AlgorithmWorkspace";
import LearningHub from "./components/LearningHub.jsx";
import PracticeMode from "./components/PracticeMode.jsx";
import DSANotes from "./components/DSANotes.jsx";

function App() {
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <>
      <AlgorithmWorkspace />
      <LearningHub />
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-2 sm:flex-row">
        <button onClick={() => setNotesOpen(true)} className="rounded-2xl border border-sky-400/20 bg-[#101016]/95 px-4 py-3 text-xs font-semibold text-sky-200 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-[#17131f]">📚 DSA Notes</button>
        <button onClick={() => setPracticeOpen(true)} className="rounded-2xl border border-emerald-400/20 bg-[#101016]/95 px-4 py-3 text-xs font-semibold text-emerald-200 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#17131f]">🧪 Practice Mode</button>
      </div>
      {practiceOpen && <PracticeMode onClose={() => setPracticeOpen(false)} />}
      {notesOpen && <DSANotes onClose={() => setNotesOpen(false)} />}
    </>
  );
}

export default App;
