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
  const [newFilterValue, setNewFilterValue] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  const tagOptions = ["Transportasi", "Pendidikan", "Kesehatan"];
  const timOptions = ["Tim A", "Tim B", "Tim C"];

  const addFilter = () => {
    if (newFilterType === "description") {
      if (!newKeyword.trim()) return;
      onSubmit(newFilterType, newKeyword);
      setNewKeyword("");
    } else {
      if (newFilterValue.length === 0) return;
      onSubmit(newFilterType, newFilterValue.join(","));
      setNewFilterValue([]);
    }
    onClose();
  };

  const toggleMultiSelect = (value: string) => {
    setNewFilterValue((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const getOptions = () => {
    if (newFilterType === "tag") return tagOptions;
    if (newFilterType === "tim") return timOptions;
    return [];
  };

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/80 p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
        <label className="flex flex-col gap-2 text-slate-400">
          Select Tag
          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2">
            {tagOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={newFilterValue.includes(option)}
                  onChange={() => toggleMultiSelect(option)}
                  className="w-4 h-4 rounded accent-sky-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-2 text-slate-400">
          Select Tim
          <div className="flex flex-wrap gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2">
            {timOptions.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={newFilterValue.includes(option)}
                  onChange={() => toggleMultiSelect(option)}
                  className="w-4 h-4 rounded accent-sky-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        </label>

        <label className="flex flex-col gap-2 text-slate-400">
          Description
          <input
            value={newKeyword}
            onChange={(event) => setNewKeyword(event.target.value)}
            placeholder="Search description or value"
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-400"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addFilter}
          className="inline-flex h-8 items-center justify-center rounded-lg bg-sky-500 px-4 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Apply filter
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-4 text-sm text-white transition hover:bg-slate-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
