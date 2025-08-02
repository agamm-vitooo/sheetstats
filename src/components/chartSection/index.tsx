'use client';

import { useState, useMemo } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ChartSelector from './ChartSelector';
import type { SheetData } from '../../types';

interface Props {
  headers: string[];
  rows: SheetData;
  defaultCol?: string;
  height?: string;
}

export default function ChartSection({ headers, rows, defaultCol }: Props) {
  const [selectedCol, setSelectedCol] = useState(defaultCol || headers[0]);
  const [chartType, setChartType] = useState('pie');
  const [isTotalActive, setIsTotalActive] = useState(false);

  const selectedIndex = headers.indexOf(selectedCol);

  // Ambil array isi kolom
  const rawData = useMemo(() => {
    return rows.map(row => {
      const cell = row[selectedIndex];
      return (typeof cell === 'string' || typeof cell === 'number' || cell === null)
        ? cell
        : String(cell);
    });
  }, [rows, selectedIndex]);

  // Hitung jumlah data (total count)
  const totalCount = useMemo(() => {
    if (!isTotalActive) return null;
    return rawData.filter(val => val !== null && val !== undefined && val !== '').length;
  }, [isTotalActive, rawData]);

  // Hitung frekuensi nilai (jika total aktif)
  const countedData = useMemo(() => {
    if (!isTotalActive) return null;
    const freqMap: Record<string, number> = {};

    rawData.forEach(val => {
      const key = val === null || val === undefined || val === '' ? 'Unknown' : String(val);
      freqMap[key] = (freqMap[key] || 0) + 1;
    });

    return Object.entries(freqMap).map(([label, value]) => ({ label, value }));
  }, [isTotalActive, rawData]);

  // Gunakan countedData jika total aktif, rawData jika tidak
  const chartData = useMemo(() => {
    if (isTotalActive && countedData) {
      return countedData;
    } else {
      return rawData;
    }
  }, [isTotalActive, countedData, rawData]);

  return (
    <div className="border p-4 rounded-2xl bg-white w-full max-w-3xl mx-auto">
      <ChartSelector
        headers={headers}
        selectedCol={selectedCol}
        chartType={chartType}
        onColChange={(col) => {
          setSelectedCol(col);
          setIsTotalActive(false); 
        }}
        onChartTypeChange={setChartType}
        onTotalClick={() => setIsTotalActive(prev => !prev)}
        isTotalActive={isTotalActive}
      />

      {isTotalActive && totalCount !== null && (
        <div className="mb-4 text-sm text-gray-700 font-medium">
          Total data di kolom <span className="font-semibold">{selectedCol}</span>:{" "}
          <span className="font-bold">{totalCount}</span>
        </div>
      )}

      {chartType === 'pie' && <PieChart data={chartData} isCounted={isTotalActive} />}
      {chartType === 'bar' && <BarChart data={chartData} isCounted={isTotalActive} />}
      {chartType === 'line' && <LineChart data={chartData} isCounted={isTotalActive} />}
    </div>
  );
}
