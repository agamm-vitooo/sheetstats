interface Props {
  sheets: Record<string, any[][]>;
  onPick: (data: any[][]) => void;
}

export default function SheetPicker({ sheets, onPick }: Props) {
  return (
    <select
      onChange={(e) => {
        const value = e.target.value;
        if (value) onPick(sheets[value]);
      }}
      defaultValue=""
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        📄 Choose Sheet
      </option>
      {Object.keys(sheets).map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
