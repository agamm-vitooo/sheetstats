import { Table2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-blue-950 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
        <Table2 className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-white">Sheet Visualize</h1>
      </div>
    </nav>
  );
}
