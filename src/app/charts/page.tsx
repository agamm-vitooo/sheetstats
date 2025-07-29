'use client';

import { useDataStore } from '../../stores/dataStore';
import ChartSection from '../../components/chartSection';

export default function ChartsPage() {
  const sheets = useDataStore((state) => state.sheets);

  if (!sheets || !sheets.SelectedSheet) {
    return <p className="text-white text-center mt-20">Belum ada sheet dipilih.</p>;
  }

  const data = sheets.SelectedSheet;
  const rawHeaders = data[0];
  const rows = data.slice(1);

  // ⛑️ Filter agar hanya string
  const headers = rawHeaders.filter((h): h is string => typeof h === 'string');

  return (
    <div className="p-6 text-black min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">📈 Visualisasi Sheet Terpilih</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['Incident', 'Unit Level 1', 'Unit Level 2', 'Task Assign To'].map((col) => (
          <ChartSection key={col} headers={headers} rows={rows} defaultCol={col} />
        ))}
      </div>
    </div>
  );
}
