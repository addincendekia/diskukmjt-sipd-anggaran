import { PaguAnggaranData } from "../pages/PagePaguAnggaran.hook";

interface PaguAnggaranTableProps {
  data: PaguAnggaranData[];
  onEdit: (data: PaguAnggaranData) => void;
  onDelete: (data: PaguAnggaranData) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function PaguAnggaranTable({
  data,
  onEdit,
  onDelete,
}: PaguAnggaranTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">
          No data found. Add a new record to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="sticky top-0 z-10 bg-slate-800 text-slate-200">
          <tr>
            <th className="px-4 py-3 font-semibold">Jenis APBD</th>
            <th className="px-4 py-3 font-semibold">Tag</th>
            <th className="px-4 py-3 font-semibold">Tim</th>
            <th className="px-4 py-3 font-semibold text-right">Budget</th>
            <th className="px-4 py-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-slate-800/50 transition">
              <td className="px-4 py-3 font-medium text-sky-400">
                {row.jenisApbd}
              </td>
              <td className="px-4 py-3">{row.tag}</td>
              <td className="px-4 py-3">{row.tim}</td>
              <td className="px-4 py-3 text-right text-slate-200">
                {formatCurrency(row.budget)}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1 rounded text-sm bg-sky-500 text-white hover:bg-sky-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="px-3 py-1 rounded text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
