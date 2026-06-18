import { useAppRoute } from "../AppContext";

export default function PageHome() {
  const { setCurrentPage } = useAppRoute();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white mb-4">Welcome</h2>

      <div className="grid gap-3">
        <button
          onClick={() => setCurrentPage("form-pagu-anggaran")}
          className="p-4 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 transition text-left"
        >
          <p className="font-semibold text-white">Pagu Anggaran</p>
          <p className="text-sm text-slate-400">
            Create and manage budget allocation
          </p>
        </button>

        <button
          onClick={() => setCurrentPage("sub-kegiatan")}
          className="p-4 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 transition text-left"
        >
          <p className="font-semibold text-white">Sub Kegiatan</p>
          <p className="text-sm text-slate-400">
            View and manage sub kegiatan data
          </p>
        </button>
      </div>
    </div>
  );
}
