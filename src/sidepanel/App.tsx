import { useState } from "react";
import "../styles/tailwind.css";
import SubKegiatan from "./components/SubKegiatan";
import FilterBar from "./components/FilterBar";
import KegiatanCard from "./components/KegiatanCard";
import { FilterType, ActiveFilter } from "./types";
import useSubKegiatan from "./components/SubKegiatan.hook";

export default function App() {
  const { loading, fetchSubKegiatanInfo } = useSubKegiatan();

  const [activeItems, setActiveItems] = useState<ActiveFilter[]>([
    { type: "tag", value: "Transportasi" },
    { type: "group", value: "Logistik" },
    { type: "description", value: "Logistik" },
  ]);

  const handleAddItem = (type: FilterType, value: string) => {
    setActiveItems((prev) => [...prev, { type, value }]);
  };

  const handleRemoveItem = (index: number) => {
    setActiveItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="min-h-screen min-w-sm bg-slate-950 text-white p-6">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80 mb-6">
            SIPD Anggaran Extension
          </p>

          <SubKegiatan />
        </div>

        {/* Filter Section */}
        <div className="flex flex-col gap-4">
          <FilterBar
            activeItems={activeItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />

          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Rincian</h2>
            <div className="space-y-3">
              <KegiatanCard />
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchSubKegiatanInfo}
          disabled={loading}
          className="w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>
    </div>
  );
}
