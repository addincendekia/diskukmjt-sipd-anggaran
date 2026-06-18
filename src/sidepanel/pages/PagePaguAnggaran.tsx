import { usePagePaguAnggaran } from "./PagePaguAnggaran.hook";
import PaguAnggaranModal from "../components/PaguAnggaranModal";
import PaguAnggaranModalDelete from "../components/PaguAnggaranModalDelete";
import PaguAnggaranTable from "../components/PaguAnggaranTable";
import PaguAnggaranFilter from "../components/PaguAnggaranFilter";

export default function PagePaguAnggaran() {
  const {
    filteredData,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteConfirmOpen,
    selectedData,
    jenisApbdList,
    selectedJenisApbdFilter,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    addData,
    updateData,
    deleteData,
    addJenisApbd,
    setSelectedJenisApbdFilter,
  } = usePagePaguAnggaran();

  const handleSubmit = (
    formData: Omit<
      {
        id: string;
        jenisApbd: string;
        tag: string;
        tim: string;
        budget: number;
      },
      "id"
    >,
  ) => {
    if (isEditModalOpen && selectedData) {
      // updateData(selectedData.id, formData);
    } else {
      addData(formData);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Pagu Anggaran</h2>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold hover:bg-sky-400 transition"
          >
            + Add Data
          </button>
        </div>
      </div>

      {/* Filter */}
      <PaguAnggaranFilter
        jenisApbdList={jenisApbdList}
        selectedJenisApbd={selectedJenisApbdFilter}
        onFilterChange={setSelectedJenisApbdFilter}
      />

      {/* Table */}
      <PaguAnggaranTable
        data={filteredData}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
      />

      {/* Modals */}
      <PaguAnggaranModal
        isOpen={isAddModalOpen}
        isEditMode={false}
        jenisApbdList={jenisApbdList}
        onSubmit={handleSubmit}
        onClose={closeAddModal}
        onAddJenisApbd={addJenisApbd}
      />

      <PaguAnggaranModal
        isOpen={isEditModalOpen}
        isEditMode={true}
        data={selectedData}
        jenisApbdList={jenisApbdList}
        onSubmit={handleSubmit}
        onClose={closeEditModal}
        onAddJenisApbd={addJenisApbd}
      />

      <PaguAnggaranModalDelete
        isOpen={isDeleteConfirmOpen}
        title="Delete Pagu Anggaran"
        message={`Are you sure you want to delete "${selectedData?.tag}"? This action cannot be undone.`}
        // onConfirm={() => selectedData && deleteData(selectedData.id)}
        onCancel={closeDeleteConfirm}
      />
    </div>
  );
}
