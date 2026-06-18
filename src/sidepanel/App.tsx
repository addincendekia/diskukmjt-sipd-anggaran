import "../styles/tailwind.css";
import { useState } from "react";
import SubKegiatan from "./components/SubKegiatan";
import FilterBar from "./components/FilterBar";
import KegiatanTable from "./components/KegiatanTable";
import useSubKegiatan from "./components/SubKegiatan.hook";
import BudgetProgress from "./components/BudgetProgress";

export default function App() {
  const { loading, fetchSubKegiatanInfo } = useSubKegiatan();

  const [jenisApbd, setJenisApbd] = useState("Murni");

  return (
    <div className="min-h-screen min-w-sm bg-slate-950 text-white p-6">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
            SIPD Anggaran Extension
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-slate-300">Anggaran</span>
            <span className="text-slate-500">/</span>
            <button
              onClick={() => {}}
              className="text-sky-400 hover:text-sky-300 hover:underline transition cursor-pointer"
            >
              Sub Kegiatan
            </button>
          </div>

          <SubKegiatan />
        </div>

        <div className="flex flex-col gap-4">
          {/* Pagu Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Pagu Anggaran
            </h2>

            <div className="flex flex-row justify-between mb-2">
              <div className="w-1/2">
                <p className="text-sm text-slate-400">Bidang</p>
                <p className="py-1 text-sm">Pembiayaan</p>
              </div>

              <div className="w-1/2">
                <p className="text-sm text-slate-400">Jenis APBD</p>
                <select
                  value={jenisApbd}
                  onChange={(e) => setJenisApbd(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-slate-800 text-white border border-slate-700 rounded cursor-pointer hover:border-slate-600 focus:outline-none focus:border-sky-500"
                >
                  <option value="Murni">Murni</option>
                  <option value="Perubahan Mendahului">
                    Perubahan Mendahului
                  </option>
                  <option value="Perubahan">Perubahan</option>
                </select>
              </div>
            </div>

            {/* Filter */}
            {/* <div className="mb-3">
              <p className="text-sm text-slate-400 mb-2">Filters</p>
              <FilterBar />
            </div> */}

            <div className="mb-3">
              <p className="text-sm text-slate-400">Total</p>
              <BudgetProgress budget={425000000} value={406850000} />
            </div>

            <p className="text-sm text-slate-400 mb-2">Rincian</p>
            <div className="overflow-x-auto rounded-lg border border-slate-700">
              <KegiatanTable
                items={[
                  { tag: "Transportasi", tim: "Tim A", subtotal: 125000000 },
                  { tag: "Transportasi", tim: "Tim B", subtotal: 150000000 },
                  { tag: "Transportasi", tim: "Tim C", subtotal: 175000000 },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="sticky bottom-0 left-0 w-full pb-6">
          <button
            onClick={fetchSubKegiatanInfo}
            disabled={loading}
            className="w-full rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>
    </div>
  );
}
