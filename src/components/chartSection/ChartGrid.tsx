'use client';

import ChartSection from './index';
import type { SheetCell } from '../../types';

interface Props {
  headers: string[];
  rows: SheetCell[][];
}

export default function ChartGrid({ headers, rows }: Props) {
  const chartableHeaders = headers.filter(h =>
    ['Incident', 'Unit Level 1', 'Unit Level 2', 'Unit Level 3', 'Service Group', 'Task Assign To', 'Task Assigned On'].includes(h)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {chartableHeaders.map((col) => (
        <ChartSection key={col} headers={headers} rows={rows} defaultCol={col} />
      ))}
    </div>
  );
}
