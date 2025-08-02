'use client';

import { useDataStore } from '../../stores/dataStore';
import ChartSection from '../../components/chartSection';

export default function ChartsPage() {
  const sheets = useDataStore((state) => state.sheets);

  if (!sheets || !sheets.SelectedSheet) {
    return <p className="text-gray-700 text-center mt-20 text-lg">Belum ada sheet dipilih.</p>;
  }

  const data = sheets.SelectedSheet;
  const rawHeaders = data[0];
  const rows = data.slice(1);

  const headers = rawHeaders.filter((h): h is string => typeof h === 'string');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 tracking-tight">
            📊 Visualisasi Data Sheet
          </h1>
          <p className="text-center text-sm text-gray-500 mt-2">
            Pilih kolom data untuk melihat distribusi dalam bentuk chart
          </p>
        </div>
      </header>

      {/* Chart Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Incident', 'Unit Level 1', 'Task Assign To'].map((col) => (
            <div key={col} className="transition duration-300 ease-in-out transform hover:-translate-y-1">
              <ChartSection headers={headers} rows={rows} defaultCol={col} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
