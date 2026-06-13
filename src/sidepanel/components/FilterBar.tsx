import { useState } from "react";
import { FilterType, ActiveFilter } from "../types";
import FilterBarForm from "./FilterBarForm";

type FilterBarProps = {
  activeItems: ActiveFilter[];
  onAddItem: (type: FilterType, value: string) => void;
  onRemoveItem: (index: number) => void;
};

export default function FilterBar({
  activeItems,
  onAddItem,
  onRemoveItem,
}: FilterBarProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const filterBadgeStyle = (type: FilterType) =>
    type === "tag"
      ? "bg-green-500/90 text-white"
      : "bg-slate-600/90 text-white";

  const filterBadgeIcon = (type: FilterType) => {
    if (type === "tag") return "🎯";
    return type === "group" ? "📌" : "🔍";
  };

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold text-white mb-2">Filters</h2>
      <div className="relative">
        <div className="min-w-0 flex-1 overflow-x-auto custom-scrollbar">
          <div className="flex min-w-0 gap-2 whitespace-nowrap pb-1">
            {activeItems.length > 0 ? (
              <>
                {activeItems.map((filter, index) => (
                  <span
                    key={`${filter.type}-${filter.value}-${index}`}
                    className={`${filterBadgeStyle(filter.type)} inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium`}
                  >
                    <span>{filterBadgeIcon(filter.type)}</span>
                    {filter.value}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(index)}
                      className="p-1 text-slate-200 transition hover:text-white/20"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <div className="shrink-0 w-8" />
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
        <FilterBarForm
          onSubmit={onAddItem}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}
