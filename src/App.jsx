import { useState } from "react";
import AlgorithmWorkspace from "./pages/AlgorithmWorkspace";
import LearningHub from "./components/LearningHub.jsx";
import PracticeMode from "./components/PracticeMode.jsx";

function App() {
  const [practiceOpen, setPracticeOpen] = useState(false);

  return (
    <>
      <AlgorithmWorkspace />
      <LearningHub />
      <button onClick={() => setPracticeOpen(true)} className="fixed bottom-5 right-5 z-[100] rounded-2xl border border-emerald-400/20 bg-[#101016]/95 px-4 py-3 text-xs font-semibold text-emerald-200 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-[#17131f]">🧪 Practice Mode</button>
      {practiceOpen && <PracticeMode onClose={() => setPracticeOpen(false)} />}
    </>
  );
}

export default App;
