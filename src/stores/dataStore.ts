import { create } from 'zustand';

interface DataStore {
  sheets: Record<string, any[][]>;
  setSheets: (sheets: Record<string, any[][]>) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  sheets: {},
  setSheets: (sheets) => set({ sheets }),
}));
