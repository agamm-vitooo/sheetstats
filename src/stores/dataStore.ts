'use client';
import { create } from 'zustand';
import type { SheetMap, SheetCell } from '../types';

interface DataStore {
  sheets: SheetMap;
  setSheets: (sheets: SheetMap) => void;
  setData: (headers: string[], rows: SheetCell[][]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  sheets: {},
  setSheets: (sheets) => set({ sheets }),
  setData: (headers, rows) => set({ sheets: { SelectedSheet: [headers, ...rows] } }),
}));
