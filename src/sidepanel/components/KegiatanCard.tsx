export default function KegiatanCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-600/80 px-2 py-1 text-xs text-white">
          <span>🎯</span>
          Transportasi
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-600/80 px-2 py-1 text-xs text-white">
          <span>📌</span>
          Logistik
        </span>
      </div>
      <div className="flex items-end gap-2 mb-1">
        <p className="text-sm text-slate-300">Biaya perjalanan dinas</p>
        <span className="ml-auto text-right">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-xs line-through text-slate-500">Rp 1.200.000</p>
          <p className="font-semibold text-white">Rp 1.000.000</p>
        </span>
      </div>
    </div>
  );
}
