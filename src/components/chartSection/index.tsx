'use client';

import { useState } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ChartSelector from './ChartSelector';
import type { SheetData } from '../../types';

import { useMemo } from 'react';

interface Props {
  headers: string[];
  rows: SheetData;
  defaultCol?: string;
}

export default function ChartSection({ headers, rows, defaultCol }: Props) {
  const [selectedCol, setSelectedCol] = useState(defaultCol || headers[0]);
  const [chartType, setChartType] = useState('pie');

  const selectedIndex = headers.indexOf(selectedCol);
  const isIncidentCol = selectedCol.toLowerCase() === 'incident';

// Hitung total hanya jika numeric
const totalIncident = useMemo(() => {
  if (!isIncidentCol) return null;

  return rows.reduce((sum, row) => {
    const value = row[headers.indexOf(selectedCol)];
    const number = typeof value === 'number' ? value : parseFloat(value as string);
    return sum + (isNaN(number) ? 0 : number);
  }, 0);
}, [rows, selectedCol, headers]);
  
  const data = rows.map(row => {
    const cell = row[selectedIndex];
    return (typeof cell === 'string' || typeof cell === 'number' || cell === null) ? cell : String(cell);
  });

  return (
<div className="border p-2 rounded-md shadow bg-white w-full max-w-xl mx-auto">
  <ChartSelector
    headers={headers}
    selectedCol={selectedCol}
    chartType={chartType}
    onColChange={setSelectedCol}
    onChartTypeChange={setChartType}
  />

  {isIncidentCol && (
    <div className="mb-4 text-sm text-gray-700 font-medium">
      Total Incident: <span className="font-bold">{totalIncident}</span>
    </div>
  )}

  {chartType === 'pie' && <PieChart data={data} />}
  {chartType === 'bar' && <BarChart data={data} />}
  {chartType === 'line' && <LineChart data={data} />}
</div>
  );
}
