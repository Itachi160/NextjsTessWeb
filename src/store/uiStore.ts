import { create } from 'zustand';

type CursorType = 'default' | 'hover' | 'magnetic' | 'view' | 'click';

interface UIState {
  isMenuOpen: boolean;
  toggleMenu: (open?: boolean) => void;
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (val: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  toggleMenu: (open) => set((state) => ({ isMenuOpen: open !== undefined ? open : !state.isMenuOpen })),
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
  preloaderDone: false,
  setPreloaderDone: (done) => set({ preloaderDone: done }),
  isTransitioning: false,
  setIsTransitioning: (val) => set({ isTransitioning: val }),
}));
