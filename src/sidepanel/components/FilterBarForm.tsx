import { useState } from "react";
import { FilterType } from "../types";

type FilterBarFormProps = {
  onSubmit: (type: FilterType, value: string) => void;
  onClose: () => void;
};

export default function FilterBarForm({
  onSubmit,
  onClose,
}: FilterBarFormProps) {
  const [newFilterType, setNewFilterType] = useState<FilterType>("tag");
  const [newFilterValue, setNewFilterValue] = useState("");

  const addFilter = () => {
    const value = newFilterValue.trim();
    if (!value) return;

    onSubmit(newFilterType, value);
    setNewFilterValue("");
    onClose();
  };

  return (
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
            onChange={(event) => setNewFilterValue(event.target.value)}
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
          onClick={onClose}
          className="inline-flex h-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-4 text-sm text-white transition hover:bg-slate-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
