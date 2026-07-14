import { create } from 'zustand';

interface CanvasState {
  activeSection: string;
  setActiveSection: (section: string) => void;
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  setCameraState: (pos: [number, number, number], target: [number, number, number]) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  hoveredTech: string | null;
  setHoveredTech: (tech: string | null) => void;
  activeOffice: string | null;
  setActiveOffice: (office: string | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  cameraPos: [0, 0, 5],
  cameraTarget: [0, 0, 0],
  setCameraState: (pos, target) => set({ cameraPos: pos, cameraTarget: target }),
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  hoveredTech: null,
  setHoveredTech: (tech) => set({ hoveredTech: tech }),
  activeOffice: 'New York',
  setActiveOffice: (office) => set({ activeOffice: office }),
}));
