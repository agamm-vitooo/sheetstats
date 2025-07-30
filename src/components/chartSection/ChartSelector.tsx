interface Props {
  headers: string[];
  selectedCol: string;
  chartType: string;
  onColChange: (col: string) => void;
  onChartTypeChange: (type: string) => void;
  onTotalClick: () => void;
  isTotalActive: boolean;
}

export default function ChartSelector({
  headers,
  selectedCol,
  chartType,
  onColChange,
  onChartTypeChange,
  onTotalClick,
  isTotalActive,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kolom</label>
        <select
          value={selectedCol}
          onChange={(e) => onColChange(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {headers.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Chart</label>
        <select
          value={chartType}
          onChange={(e) => onChartTypeChange(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="pie">Pie</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
        </select>
      </div>

      <div>
        <button
          onClick={onTotalClick}
          className={`px-4 py-2 rounded-md text-white ${
            isTotalActive ? 'bg-blue-600' : 'bg-gray-500'
          } hover:bg-blue-700 transition`}
        >
          Total
        </button>
      </div>
    </div>
  );
}
