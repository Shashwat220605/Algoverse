import { create } from "zustand";

export const PLAYBACK_SPEEDS = [
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "1.5×", value: 1.5 },
  { label: "2×", value: 2 },
  { label: "4×", value: 4 },
];

export const useAlgorithmStore = create((set, get) => {
  let playbackTimer = null;

  const clearPlaybackTimer = () => {
    if (playbackTimer !== null) {
      clearTimeout(playbackTimer);
      playbackTimer = null;
    }
  };

  const schedulePlayback = () => {
    clearPlaybackTimer();

    const state = get();
    if (!state.isPlaying || state.steps.length <= 1) return;

    if (state.currentStep >= state.steps.length - 1) {
      set({ isPlaying: false });
      return;
    }

    const delay = 1400 / state.playbackSpeed;

    playbackTimer = setTimeout(() => {
      const current = get();

      if (!current.isPlaying) return;

      if (current.currentStep >= current.steps.length - 1) {
        playbackTimer = null;
        set({ isPlaying: false });
        return;
      }

      set((latest) => ({
        currentStep: Math.min(
          latest.currentStep + 1,
          latest.steps.length - 1
        ),
      }));

      schedulePlayback();
    }, delay);
  };

  return {
    steps: [],
    currentStep: 0,
    isPlaying: false,
    playbackSpeed: 1,

    setSteps: (steps) => {
      clearPlaybackTimer();
      set({
        steps,
        currentStep: 0,
        isPlaying: false,
      });
    },

    setPlaybackSpeed: (playbackSpeed) => {
      set({ playbackSpeed });
      if (get().isPlaying) schedulePlayback();
    },

    nextStep: () => {
      // The workspace has its legacy 1.4s timer. While autoplay is active,
      // the store owns the playback clock, so that legacy callback is ignored.
      if (get().isPlaying) return;

      set((state) => ({
        currentStep: Math.min(
          state.currentStep + 1,
          state.steps.length - 1
        ),
      }));
    },

    previousStep: () => {
      if (get().isPlaying) return;
      set((state) => ({
        currentStep: Math.max(
          state.currentStep - 1,
          0
        ),
      }));
    },

    goToStep: (step) => {
      clearPlaybackTimer();
      set((state) => ({
        currentStep: Math.max(
          0,
          Math.min(step, state.steps.length - 1)
        ),
        isPlaying: false,
      }));
    },

    togglePlaying: () => {
      const state = get();

      if (state.isPlaying) {
        clearPlaybackTimer();
        set({ isPlaying: false });
        return;
      }

      if (state.steps.length <= 1 || state.currentStep >= state.steps.length - 1) {
        set({ currentStep: 0, isPlaying: true });
      } else {
        set({ isPlaying: true });
      }

      schedulePlayback();
    },

    reset: () => {
      clearPlaybackTimer();
      set({
        currentStep: 0,
        isPlaying: false,
      });
    },
  };
});
