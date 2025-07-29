'use client';

import { useState } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ChartSelector from './ChartSelector';
import type { SheetData } from '../../types';

interface Props {
  headers: string[];
  rows: SheetData;
  defaultCol?: string;
}

export default function ChartSection({ headers, rows, defaultCol }: Props) {
  const [selectedCol, setSelectedCol] = useState(defaultCol || headers[0]);
  const [chartType, setChartType] = useState('pie');

  const data = rows.map(row => row[headers.indexOf(selectedCol)]);

  return (
    <div className="border p-4 rounded-md shadow bg-white w-full max-w-xl mx-auto">
      <ChartSelector
        headers={headers}
        selectedCol={selectedCol}
        chartType={chartType}
        onColChange={setSelectedCol}
        onChartTypeChange={setChartType}
      />

      {chartType === 'pie' && <PieChart data={data} />}
      {chartType === 'bar' && <BarChart data={data} />}
      {chartType === 'line' && <LineChart data={data} />}
    </div>
  );
}
