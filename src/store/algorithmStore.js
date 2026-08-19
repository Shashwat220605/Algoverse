import { create } from "zustand";

export const PLAYBACK_SPEEDS = [
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2 },
  { label: "4×", value: 4 },
];

export const useAlgorithmStore = create((set) => ({
  steps: [],
  currentStep: 0,
  isPlaying: false,
  playbackSpeed: 1,

  setSteps: (steps) =>
    set({
      steps,
      currentStep: 0,
      isPlaying: false,
    }),

  setPlaybackSpeed: (playbackSpeed) =>
    set({ playbackSpeed }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(
        state.currentStep + 1,
        state.steps.length - 1
      ),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(
        state.currentStep - 1,
        0
      ),
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep: Math.max(
        0,
        Math.min(step, state.steps.length - 1)
      ),
    })),

  togglePlaying: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  reset: () =>
    set({
      currentStep: 0,
      isPlaying: false,
    }),
}));
