'use client';
import { create } from 'zustand';
import type { SheetMap } from '../types';

interface DataStore {
  sheets: SheetMap;
  setSheets: (sheets: SheetMap) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  sheets: {},
  setSheets: (sheets) => set({ sheets }),
}));