import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllPenilaian,
  getPenilaianById,
  createPenilaian,
  updatePenilaian,
  deletePenilaian,
} from "../api/penilaianApi";
import { toast } from "sonner";

const PenilaianContext = createContext();

export const usePenilaianContext = () => useContext(PenilaianContext);

export const PenilaianProvider = ({ children }) => {
  const [penilaian, setPenilaian] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Ambil semua data penilaian
  const fetchPenilaian = async () => {
    setLoading(true);
    try {
      const data = await getAllPenilaian();
      setPenilaian(data);
    } catch (error) {
      console.error("❌ Error fetching penilaian:", error);
      toast.error("Gagal mengambil data penilaian.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPenilaian();
  }, []);

  // 🔥 Ambil penilaian by ID
  const fetchPenilaianById = async (id) => {
    try {
      return await getPenilaianById(id);
    } catch (error) {
      console.error("❌ Error fetching penilaian by ID:", error);
      toast.error("Gagal mengambil data penilaian.");
    }
  };

  // 🔥 Tambah penilaian baru
  const addPenilaian = async (alternatifId, subKriteriaId) => {
    try {
      const newPenilaian = await createPenilaian(alternatifId, subKriteriaId);
      setPenilaian((prev) => [...prev, newPenilaian]);
      toast.success("✅ Penilaian berhasil ditambahkan!");
    } catch (error) {
      console.error("❌ Error adding penilaian:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Gagal menambahkan penilaian.");
    }
  };

  // 🔥 Edit penilaian
  const editPenilaian = async (id, nilai) => {
    try {
      const updated = await updatePenilaian(id, nilai);
      setPenilaian((prev) =>
        prev.map((p) => (p.id_penilaian === id ? updated : p))
      );
      toast.success("✅ Penilaian berhasil diperbarui!");
    } catch (error) {
      console.error("❌ Error updating penilaian:", error);
      toast.error("Gagal memperbarui penilaian.");
    }
  };

  // 🔥 Hapus penilaian
  const removePenilaian = async (id) => {
    try {
      await deletePenilaian(id);
      setPenilaian((prev) => prev.filter((p) => p.id_penilaian !== id));
      toast.success("✅ Penilaian berhasil dihapus!");
    } catch (error) {
      console.error("❌ Error deleting penilaian:", error);
      toast.error("Gagal menghapus penilaian.");
    }
  };

  return (
    <PenilaianContext.Provider
      value={{
        penilaian,
        loading,
        fetchPenilaian,
        fetchPenilaianById,
        addPenilaian,
        editPenilaian,
        removePenilaian,
      }}
    >
      {children}
    </PenilaianContext.Provider>
  );
};
