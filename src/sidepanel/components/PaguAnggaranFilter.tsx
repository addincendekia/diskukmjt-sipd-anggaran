interface PaguAnggaranFilterProps {
  jenisApbdList: string[];
  selectedJenisApbd: string | null;
  onFilterChange: (jenis: string | null) => void;
}

export default function PaguAnggaranFilter({
  jenisApbdList,
  selectedJenisApbd,
  onFilterChange,
}: PaguAnggaranFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-400">Filter by Jenis APBD</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange(null)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            selectedJenisApbd === null
              ? "bg-sky-500 text-white"
              : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
          }`}
        >
          All
        </button>
        {jenisApbdList.map((jenis) => (
          <button
            key={jenis}
            onClick={() => onFilterChange(jenis)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              selectedJenisApbd === jenis
                ? "bg-sky-500 text-white"
                : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            {jenis}
          </button>
        ))}
      </div>
    </div>
  );
}
