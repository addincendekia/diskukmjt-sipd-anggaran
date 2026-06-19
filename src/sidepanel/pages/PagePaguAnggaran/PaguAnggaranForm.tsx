import React, { useState } from "react";

const PaguAnggaranForm = () => {
  const [formData, setFormData] = useState({
    bidang: "Pembiayaan",
    jenisApbd: "Murni",
    tag: "Murni",
    tim: "Tim A",
    budget: 425000000,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "subtotal" || name === "budget" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Bidang */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Bidang</label>
        <input
          type="text"
          name="bidang"
          value={formData.bidang}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-sky-500"
          disabled
        />
      </div>

      {/* Jenis APBD */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Jenis APBD</label>
        <select
          name="jenisApbd"
          value={formData.jenisApbd}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-sky-500"
        >
          <option value="Murni">Murni</option>
          <option value="Perubahan Mendahului">Perubahan Mendahului</option>
          <option value="Perubahan">Perubahan</option>
        </select>
      </div>

      {/* Tag */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Tag</label>
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Tim */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Tim</label>
        <input
          type="text"
          name="tim"
          value={formData.tim}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-slate-400">Budget</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-400"
      >
        Submit
      </button>
    </form>
  );
};

export default PaguAnggaranForm;
