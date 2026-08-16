import { create } from "zustand";

export const useAlgorithmStore = create((set) => ({
  steps: [],
  currentStep: 0,
  isPlaying: false,

  setSteps: (steps) =>
    set({
      steps,
      currentStep: 0,
      isPlaying: false,
    }),

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