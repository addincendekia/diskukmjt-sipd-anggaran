import { useState } from "react";
import "../styles/tailwind.css";
import SubKegiatan from "./components/SubKegiatan";
import useSubKegiatan from "./components/SubKegiatan.hook";

type FilterType = "tag" | "group" | "description";

type ActiveFilter = {
  type: FilterType;
  value: string;
};

// Added fetchSubKegiatanInfo to the destructured return of useApp
export default function App() {
  const { loading, error, subKegiatanInfo, fetchSubKegiatanInfo } =
    useSubKegiatan();

  const [filterOpen, setFilterOpen] = useState(false);
  const [newFilterType, setNewFilterType] = useState<FilterType>("tag");
  const [newFilterValue, setNewFilterValue] = useState("");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([
    { type: "tag", value: "Transportasi" },
    { type: "group", value: "Logistik" },
    { type: "description", value: "Logistik" },
  ]);

  const addFilter = () => {
    const value = newFilterValue.trim();
    if (!value) return;
    setActiveFilters((prev) => [...prev, { type: newFilterType, value }]);
    setNewFilterValue("");
    setFilterOpen(false);
  };

  const removeFilter = (index: number) => {
    setActiveFilters((prev) => prev.filter((_, idx) => idx !== index));
  };

  const filterBadgeStyle = (type: FilterType) => {
    switch (type) {
      case "tag":
        return "bg-green-500/90 text-white";
      default:
        return "bg-slate-600/90 text-white";
    }
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
          <div className="py-4">
            <h2 className="text-lg font-semibold text-white mb-2">Filters</h2>
            <div className="relative">
              <div className="min-w-0 flex-1 overflow-x-auto custom-scrollbar">
                <div className="flex min-w-[0] gap-2 whitespace-nowrap pb-1">
                  {activeFilters.length > 0 ? (
                    <>
                      {activeFilters.map((filter, index) => (
                        <span
                          key={`${filter.type}-${filter.value}-${index}`}
                          className={`${filterBadgeStyle(filter.type)} inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium`}
                        >
                          <span>
                            {filter.type === "tag"
                              ? "🎯"
                              : filter.type === "group"
                                ? "📌"
                                : "🔍"}
                          </span>
                          {filter.value}
                          <button
                            type="button"
                            onClick={() => removeFilter(index)}
                            className="rounded-full bg-white/10 p-1 text-slate-200 transition hover:bg-white/20"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {/* Spacer to prevent last badge from being cut off */}
                      <div className="flex-shrink-0 w-8" />
                    </>
                  ) : (
                    <span className="rounded-full border border-slate-700 bg-slate-800/90 px-3 py-1 text-xs text-slate-300">
                      No active filters
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                className="absolute right-0 top-0 flex-none inline-flex h-8 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                +
              </button>
            </div>

            {filterOpen && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-sm">
                <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Filter type
                    <select
                      value={newFilterType}
                      onChange={(event) =>
                        setNewFilterType(event.target.value as FilterType)
                      }
                      className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                    >
                      <option value="tag">Tag</option>
                      <option value="group">Group</option>
                      <option value="description">Description</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                    Keyword
                    <input
                      value={newFilterValue}
                      onChange={(event) =>
                        setNewFilterValue(event.target.value)
                      }
                      placeholder="Search description or value"
                      className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
                    />
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={addFilter}
                    className="inline-flex h-10 items-center justify-center rounded-2xl bg-sky-500 px-4 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Apply filter
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterOpen(false)}
                    className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-4 text-sm text-white transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            {" "}
            <h2 className="text-lg font-semibold text-white mb-2">Rincian</h2>
            <div className="space-y-3">
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
                  <p className="text-sm text-slate-300">
                    Biaya perjalanan dinas
                  </p>
                  <span className="ml-auto text-right">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-xs line-through text-slate-500">
                      Rp 1.200.000
                    </p>
                    <p className="font-semibold text-white">Rp 1.000.000</p>
                  </span>
                </div>
              </div>
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
