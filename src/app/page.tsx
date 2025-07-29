'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import FileUpload from '../components/FileUpload';
import SheetPicker from '../components/SheetPicker';
import { useDataStore } from '../stores/dataStore';
import type { SheetMap, SheetData, SheetCell } from '../types';

export default function Home() {
  const [sheets, setSheets] = useState<SheetMap>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const { setData } = useDataStore();
  const router = useRouter();

  const handleSheetPick = (data: SheetData) => {
    const [rawHeaderRow, ...rows] = data;

    // Filter agar hanya header string yang diambil
    const headerRow = rawHeaderRow.filter((cell): cell is string => typeof cell === 'string');

    setData(headerRow, rows);

    router.push('/charts');
  };

  return (
    <main className="flex flex-col items-center justify-center p-6 text-center min-h-screen bg-gray-50">
      <div ref={headerRef} className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-black">📊 Upload Excel File</h1>

        <FileUpload onParse={setSheets} />

        {Object.keys(sheets).length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">Select a sheet to visualize:</p>
            <SheetPicker sheets={sheets} onPick={handleSheetPick} />
          </div>
        )}
      </div>
    </main>
  );
}
