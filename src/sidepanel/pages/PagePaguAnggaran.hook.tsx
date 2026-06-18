import { useState } from "react";

export interface PaguAnggaranData {
  id: string;
  jenisApbd: string;
  tag: string;
  tim: string;
  budget: number;
}

interface UsePagePaguAnggaranReturn {
  data: PaguAnggaranData[];
  filteredData: PaguAnggaranData[];
  isLoading: boolean;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteConfirmOpen: boolean;
  selectedData: PaguAnggaranData | null;
  jenisApbdList: string[];
  selectedJenisApbdFilter: string | null;
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (data: PaguAnggaranData) => void;
  closeEditModal: () => void;
  openDeleteConfirm: (data: PaguAnggaranData) => void;
  closeDeleteConfirm: () => void;
  addData: (formData: Omit<PaguAnggaranData, "id">) => void;
  updateData: (id: string, formData: Omit<PaguAnggaranData, "id">) => void;
  deleteData: (id: string) => void;
  addJenisApbd: (jenisApbd: string) => void;
  setSelectedJenisApbdFilter: (filter: string | null) => void;
}

export function usePagePaguAnggaran(): UsePagePaguAnggaranReturn {
  const [data, setData] = useState<PaguAnggaranData[]>([
    {
      id: "1",
      jenisApbd: "Murni",
      tag: "Transportasi",
      tim: "Tim A",
      budget: 425000000,
    },
    {
      id: "2",
      jenisApbd: "Perubahan",
      tag: "Pendidikan",
      tim: "Tim B",
      budget: 325000000,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<PaguAnggaranData | null>(
    null,
  );
  const [jenisApbdList, setJenisApbdList] = useState([
    "Murni",
    "Perubahan Mendahului",
    "Perubahan",
  ]);
  const [selectedJenisApbdFilter, setSelectedJenisApbdFilter] = useState<
    string | null
  >(null);

  const filteredData = selectedJenisApbdFilter
    ? data.filter((item) => item.jenisApbd === selectedJenisApbdFilter)
    : data;

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (data: PaguAnggaranData) => {
    setSelectedData(data);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedData(null);
    setIsEditModalOpen(false);
  };

  const openDeleteConfirm = (data: PaguAnggaranData) => {
    setSelectedData(data);
    setIsDeleteConfirmOpen(true);
  };
  const closeDeleteConfirm = () => {
    setSelectedData(null);
    setIsDeleteConfirmOpen(false);
  };

  const addData = (formData: Omit<PaguAnggaranData, "id">) => {
    const newData: PaguAnggaranData = {
      ...formData,
      id: Date.now().toString(),
    };
    setData((prev) => [...prev, newData]);
    closeAddModal();
  };

  const updateData = (id: string, formData: Omit<PaguAnggaranData, "id">) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...formData, id } : item)),
    );
    closeEditModal();
  };

  const deleteData = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    closeDeleteConfirm();
  };

  const addJenisApbd = (jenisApbd: string) => {
    if (!jenisApbdList.includes(jenisApbd)) {
      setJenisApbdList((prev) => [...prev, jenisApbd]);
    }
  };

  return {
    data,
    filteredData,
    isLoading,
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
  };
}
