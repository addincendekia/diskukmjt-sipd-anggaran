import "../styles/tailwind.css";

export default function App() {
  return (
    <div className="min-h-screen min-w-sm bg-slate-950 text-white p-6">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
            sub-kegiatan
          </p>
          <h1 className="text-2xl font-semibold text-white">2.xx.xx.0012</h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm text-slate-100">
                tag
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm text-slate-100">
                tag
              </span>
            </div>
            <button className="h-10 rounded-2xl border border-slate-700 bg-sky-500 px-4 text-sm font-medium text-white transition hover:bg-sky-400">
              +
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
            <div className="grid gap-3 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Tag</span>
                <span className="font-semibold text-white">Pagu</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-4 py-3">
                <span>Transportasi</span>
                <span className="font-semibold text-white">Rp 1.000.000</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-4 py-3">
                <span>Penginapan</span>
                <span className="font-semibold text-white">Rp 2.500.000</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-800/80 px-4 py-3">
                <span>Lainnya</span>
                <span className="font-semibold text-white">Rp 1.200.000</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="mb-4 text-sm text-slate-400">
              Total Terinput pagu
            </div>
            <div className="grid gap-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Tag</span>
                <span>Pagu</span>
              </div>
              <div className="h-0.5 w-full rounded-full bg-white/10" />
              <div className="flex justify-between">
                <span className="text-slate-200">Sub-item</span>
                <span className="font-semibold text-white">Rp 4.700.000</span>
              </div>
            </div>
          </div>

          <button className="mt-2 w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Update data
          </button>
        </div>
      </div>
    </div>
  );
}
