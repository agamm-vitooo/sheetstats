'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import type { SheetMap, SheetData } from '../types';

interface FileUploadProps {
  onParse?: (sheets: SheetMap) => void;
}

export default function FileUpload({ onParse }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });

      const parsed: SheetMap = {};
      workbook.SheetNames.forEach((name) => {
        parsed[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }) as SheetData;
      });

      onParse?.(parsed); // kirim ke parent
      setIsLoading(false);
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

  return (
    <div className="flex flex-col items-center justify-center px-4">
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

      {/* Loader */}
      {isLoading && (
        <div className="mt-6 text-gray-600 text-sm flex items-center gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-gray-600 rounded-full"></div>
          <span>Processing file...</span>
        </div>
      )}
    </div>
  );
}
