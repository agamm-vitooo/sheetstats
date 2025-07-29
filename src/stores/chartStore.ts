// stores/chartStore.ts
import { create } from 'zustand';

interface ChartState {
  selectedCols: string[];
  addCol: (col: string) => void;
  removeCol: (col: string) => void;
  clear: () => void;
}

export const useChartStore = create<ChartState>((set) => ({
  selectedCols: [],
  addCol: (col) =>
    set((state) =>
      state.selectedCols.includes(col)
        ? state
        : { selectedCols: [...state.selectedCols, col] }
    ),
  removeCol: (col) =>
    set((state) => ({
      selectedCols: state.selectedCols.filter((c) => c !== col),
    })),
  clear: () => set({ selectedCols: [] }),
}));
