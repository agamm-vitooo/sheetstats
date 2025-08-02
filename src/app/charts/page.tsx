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

  const chartClass = "rounded-2xl bg-white p-4 transition transform duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 auto-rows-fr">
          {/* Baris 1 */}
          <div className={`col-span-6 sm:col-span-4 ${chartClass}`}>
            <ChartSection headers={headers} rows={rows} defaultCol="Incident" height="100%" />
          </div>
          <div className={`col-span-6 sm:col-span-2 ${chartClass}`}>
            <ChartSection headers={headers} rows={rows} defaultCol="Task Assign To" height="100%" />
          </div>

          {/* Baris 2 */}
          <div className={`col-span-6 sm:col-span-2 ${chartClass}`}>
            <ChartSection headers={headers} rows={rows} defaultCol="Service Group" height="100%" />
          </div>
          <div className={`col-span-6 sm:col-span-2 ${chartClass}`}>
            <ChartSection headers={headers} rows={rows} defaultCol="Unit Level 1" height="100%" />
          </div>
          <div className={`col-span-6 sm:col-span-2 ${chartClass}`}>
            <ChartSection headers={headers} rows={rows} defaultCol="Unit Level 2" height="100%" />
          </div>
        </div>
      </main>
    </div>
  );
}
