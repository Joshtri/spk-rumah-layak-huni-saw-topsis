import { useState, useEffect } from "react";
import { 
    getAllPenilaian, 
    getPenilaianById, 
    createPenilaian, 
    updatePenilaian, 
    deletePenilaian 
} from "../api/penilaianApi";
import { toast } from "sonner";

export const usePenilaian = () => {
    const [penilaian, setPenilaian] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 Fetch semua penilaian
    useEffect(() => {
        fetchPenilaian();
    }, []);

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

    // 🔥 Fetch satu penilaian berdasarkan ID
    const fetchPenilaianById = async (id) => {
        try {
            return await getPenilaianById(id);
        } catch (error) {
            console.error("❌ Error fetching penilaian by ID:", error);
            toast.error("Gagal mengambil data penilaian.");
        }
    };

    // 🔥 Tambahkan Penilaian baru
// 🔥 Tambahkan Penilaian baru
const addPenilaian = async (alternatifId, subKriteriaId) => {
    try {
        console.log("📤 Mengirim penilaian:", { alternatifId, subKriteriaId });
        const newPenilaian = await createPenilaian(alternatifId, subKriteriaId);
        setPenilaian([...penilaian, newPenilaian]);
        toast.success("Penilaian berhasil ditambahkan!");
    } catch (error) {
        console.error("❌ Error adding penilaian:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Gagal menambahkan penilaian.");
    }
};
  

    // 🔥 Update Penilaian
    const editPenilaian = async (id, nilai) => {
        try {
            const updatedPenilaian = await updatePenilaian(id, nilai);
            setPenilaian(penilaian.map((p) => (p.id_penilaian === id ? updatedPenilaian : p)));
            toast.success("Penilaian berhasil diperbarui!");
        } catch (error) {
            console.error("❌ Error updating penilaian:", error);
            toast.error("Gagal memperbarui penilaian.");
        }
    };

    // 🔥 Hapus Penilaian
    const removePenilaian = async (id) => {
        try {
            await deletePenilaian(id);
            setPenilaian(penilaian.filter((p) => p.id_penilaian !== id));
            toast.success("Penilaian berhasil dihapus!");
        } catch (error) {
            console.error("❌ Error deleting penilaian:", error);
            toast.error("Gagal menghapus penilaian.");
        }
    };

    return {
        penilaian,
        loading,
        fetchPenilaian,
        fetchPenilaianById,
        addPenilaian,
        editPenilaian,
        removePenilaian
    };
};
