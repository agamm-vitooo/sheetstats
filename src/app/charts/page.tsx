'use client';

import { useDataStore } from '../../stores/dataStore';
import ChartSection from '../../components/chartSection';

export default function ChartsPage() {
  const sheets = useDataStore((state) => state.sheets);

  if (!sheets || !sheets.SelectedSheet) {
    return <p className="text-black text-center mt-20">Belum ada sheet dipilih.</p>;
  }

  const data = sheets.SelectedSheet;
  const rawHeaders = data[0];
  const rows = data.slice(1);

  // Filter hanya yang bertipe string
  const headers = rawHeaders.filter((h): h is string => typeof h === 'string');

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        📊 Visualisasi Data Sheet
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {['Incident', 'Unit Level 1', 'Unit Level 2', 'Task Assign To'].map((col) => (
          <div key={col} className="p-1">
            <ChartSection headers={headers} rows={rows} defaultCol={col} />
          </div>
        ))}
      </div>
    </div>
  );
}
