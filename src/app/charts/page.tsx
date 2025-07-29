'use client';

import { useDataStore } from '../../stores/dataStore';
import ChartSection from '../../components/chartSection';

export default function ChartsPage() {
  const sheets = useDataStore((state) => state.sheets);

  if (!sheets || !sheets.SelectedSheet) {
    return <p className="text-white text-center mt-20">Belum ada sheet dipilih.</p>;
  }

  const data = sheets.SelectedSheet;
  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="p-6 text-black min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">📈 Visualisasi Sheet Terpilih</h1>

      {/* Grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartSection headers={headers} rows={rows} defaultCol="Incident" />
        <ChartSection headers={headers} rows={rows} defaultCol="Unit Level 1" />
        <ChartSection headers={headers} rows={rows} defaultCol="Unit Level 2" />
        <ChartSection headers={headers} rows={rows} defaultCol="Task Assign To" />
        {/* Tambah ChartSection lain sesuai kolom */}
        {/* <ChartSection headers={headers} rows={rows} defaultCol="Service Group" /> */}
      </div>
    </div>
  );
}
