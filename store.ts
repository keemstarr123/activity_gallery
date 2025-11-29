import { create } from 'zustand';
import { GameState } from './types';
import { TIMELINE_DATA } from './constants';

export const useStore = create<GameState>((set, get) => ({
  hasStarted: false,
  progress: 0,
  targetProgress: 0,
  activeEventId: null,
  
  setStarted: (started) => set({ hasStarted: started }),
  
  setTargetProgress: (val) => {
    // Clamp between 0 and 1
    const clamped = Math.max(0, Math.min(1, val));
    set({ targetProgress: clamped });
  },

  setActiveEventId: (id) => set({ activeEventId: id }),

  nextEvent: () => {
    const { activeEventId } = get();
    if (!activeEventId) {
      set({ activeEventId: TIMELINE_DATA[0].id, targetProgress: 0.05 });
      return;
    }
    const idx = TIMELINE_DATA.findIndex(e => e.id === activeEventId);
    if (idx < TIMELINE_DATA.length - 1) {
      const nextIdx = idx + 1;
      set({ 
        activeEventId: TIMELINE_DATA[nextIdx].id,
        targetProgress: (nextIdx / (TIMELINE_DATA.length - 1))
      });
    }
  },

  prevEvent: () => {
    const { activeEventId } = get();
    if (!activeEventId) return;
    const idx = TIMELINE_DATA.findIndex(e => e.id === activeEventId);
    if (idx > 0) {
      const prevIdx = idx - 1;
      set({ 
        activeEventId: TIMELINE_DATA[prevIdx].id,
        targetProgress: (prevIdx / (TIMELINE_DATA.length - 1))
      });
    }
  }
}));
