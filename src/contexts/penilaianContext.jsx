import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllPenilaian,
  getPenilaianById,
  createPenilaian,
  updatePenilaian,
  deletePenilaian,
  deletePenilaianByAlternatifId,
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
  const addPenilaian = async (alternatifId, subKriteriaId, periodeId) => {
    try {
      const newPenilaian = await createPenilaian(alternatifId, subKriteriaId, periodeId);
      setPenilaian((prev) => [...prev, newPenilaian]);
      return { success: true, data: newPenilaian }; // ✅ return hasil
    } catch (error) {
      console.error("❌ Error adding penilaian:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || "Gagal menambahkan penilaian.",
      };
    }
  };
  
  

  // 🔥 Edit penilaian
  const editPenilaian = async (id, payload) => {
    try {
      const updated = await updatePenilaian(id, payload);
      setPenilaian((prev) =>
        prev.map((p) => (p.id_penilaian === id ? updated : p))
      );
     } catch (error) {
      console.error("❌ Error updating penilaian:", error);
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

  const removePenilaianByAlternatif = async (alternatifId) => {
    try {
      await deletePenilaianByAlternatifId(alternatifId);
      // Refresh data setelah hapus
      fetchPenilaian();
      toast.success("✅ Semua penilaian untuk alternatif berhasil dihapus!");
    } catch (error) {
      console.error("❌ Error deleting penilaian by alternatifId:", error);
      toast.error("Gagal menghapus penilaian berdasarkan alternatif.");
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
        removePenilaianByAlternatif,
      }}
    >
      {children}
    </PenilaianContext.Provider>
  );
};
