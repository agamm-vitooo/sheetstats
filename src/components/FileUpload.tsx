'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import SheetPicker from './SheetPicker';

export default function FileUpload() {
  const [sheets, setSheets] = useState<Record<string, any[][]>>({});
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });

      const parsed: Record<string, any[][]> = {};
      workbook.SheetNames.forEach((name) => {
        parsed[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
      });

      setSheets(parsed);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  const handlePick = async (data: any[][]) => {
    const store = await import('../stores/dataStore');
    store.useDataStore.getState().setSheets({ SelectedSheet: data });
    router.push('/charts');
  };

  return (
    <div className=" flex flex-col items-center justify-center px-4 bg-gray-100">
      <div
        {...getRootProps()}
        className="w-full max-w-lg border border-gray-300 bg-white rounded-lg p-8 text-center shadow hover:shadow-md transition"
      >
        <input {...getInputProps()} />
        <p className="text-gray-700 text-sm">
          {isDragActive
            ? '📂 Drop your Excel file here...'
            : '📁 Drag & drop an Excel file here or click to browse'}
        </p>
      </div>

      {Object.keys(sheets).length > 0 && (
        <div className="mt-6 w-full max-w-sm">
          <p className="mb-2 text-sm text-gray-700 text-center">Select a sheet to preview:</p>
          <SheetPicker sheets={sheets} onPick={handlePick} />
        </div>
      )}
    </div>
  );
}
