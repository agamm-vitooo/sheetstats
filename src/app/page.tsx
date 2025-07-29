'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import FileUpload from '../components/FileUpload';
import SheetPicker from '../components/SheetPicker';
import { useDataStore } from '../stores/dataStore';

export default function Home() {
  const [sheets, setSheets] = useState<Record<string, any[][]>>({});
  const headerRef = useRef<HTMLDivElement>(null);
  const { setData } = useDataStore();
  const router = useRouter();

  const handleSheetPick = (data: any[][]) => {
    const [headerRow, ...rows] = data;

    setData(headerRow, rows);

    setTimeout(() => {
      router.push('/charts');
    }, 200);
  };

  return (
    <main className="flex flex-col items-center justify-center p-6 text-center flex-grow">
      <div ref={headerRef}>
        <h1 className="text-2xl font-bold mb-6 text-black">📊 Upload Here</h1>
        <FileUpload onParse={setSheets} />
        {Object.keys(sheets).length > 0 && (
          <div className="mt-4">
            <SheetPicker sheets={sheets} onPick={handleSheetPick} />
          </div>
        )}
      </div>
    </main>
  );
}
