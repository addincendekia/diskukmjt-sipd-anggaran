import { PaguAnggaranData } from "@/data";
import { useState, useEffect } from "react";

interface PaguAnggaranModalProps {
  isOpen: boolean;
  isEditMode?: boolean;
  data?: PaguAnggaranData | null;
  jenisApbdList: string[];
  onSubmit: (formData: Omit<PaguAnggaranData, "id">) => void;
  onClose: () => void;
  onAddJenisApbd?: (jenisApbd: string) => void;
}

export default function PaguAnggaranModal({
  isOpen,
  isEditMode = false,
  data,
  jenisApbdList,
  onSubmit,
  onClose,
  onAddJenisApbd,
}: PaguAnggaranModalProps) {
  const [formData, setFormData] = useState({
    jenisApbd: "",
    tag: "",
    tim: "",
    budget: 0,
  });
  const [newJenisApbd, setNewJenisApbd] = useState("");
  const [isAddingJenisApbd, setIsAddingJenisApbd] = useState(false);

  useEffect(() => {
    if (isEditMode && data) {
      setFormData({
        jenisApbd: data.jenisApbd,
        tag: data.tag,
        tim: data.tim,
        budget: data.budget,
      });
    } else {
      setFormData({
        jenisApbd: "",
        tag: "",
        tim: "",
        budget: 0,
      });
    }
    setNewJenisApbd("");
    setIsAddingJenisApbd(false);
  }, [isOpen, isEditMode, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "budget" ? parseInt(value) || 0 : value,
    }));
  };

  const handleAddJenisApbd = () => {
    if (newJenisApbd.trim()) {
      onAddJenisApbd?.(newJenisApbd.trim());
      setFormData((prev) => ({
        ...prev,
        jenisApbd: newJenisApbd.trim(),
      }));
      setNewJenisApbd("");
      setIsAddingJenisApbd(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.jenisApbd ||
      !formData.tag ||
      !formData.tim ||
      !formData.budget
    ) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-white mb-4">
          {isEditMode ? "Edit Pagu Anggaran" : "Add Pagu Anggaran"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Jenis APBD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Jenis APBD</label>
            <div className="flex gap-2">
              <select
                name="jenisApbd"
                value={formData.jenisApbd}
                onChange={handleChange}
                disabled={isAddingJenisApbd}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500 disabled:opacity-50"
              >
                <option value="">Select Jenis APBD</option>
                {jenisApbdList.map((jenis) => (
                  <option key={jenis} value={jenis}>
                    {jenis}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsAddingJenisApbd(!isAddingJenisApbd)}
                className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm hover:bg-slate-800 transition"
              >
                {isAddingJenisApbd ? "✕" : "+"}
              </button>
            </div>
            {isAddingJenisApbd && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newJenisApbd}
                  onChange={(e) => setNewJenisApbd(e.target.value)}
                  placeholder="Enter new Jenis APBD"
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleAddJenisApbd}
                  className="px-3 py-2 rounded-lg bg-sky-500 text-white text-sm hover:bg-sky-400 transition"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Tag */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Transportasi"
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Tim */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Tim</label>
            <input
              type="text"
              name="tim"
              value={formData.tim}
              onChange={handleChange}
              placeholder="e.g. Tim A"
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="0"
              className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white text-sm focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-400 transition"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
