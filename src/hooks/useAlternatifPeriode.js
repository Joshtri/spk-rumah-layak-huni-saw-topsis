import { useState, useEffect } from "react";
import { 
    daftarAlternatifKePeriode, 
    hapusAlternatifDariPeriode, 
    getPeriodeByAlternatif, 
    getAlternatifByPeriode, 
    getAllAlternatifPeriode 
} from "@/api/alternatifPeriodeApi";

export const useAlternatifPeriode = (periodeId = null, alternatifId = null) => {
    const [alternatifPeriode, setAlternatifPeriode] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 Ambil semua data Alternatif-Periode
    const fetchAllAlternatifPeriode = async () => {
        setLoading(true);
        try {
            console.log("🔥 Fetching semua Alternatif-Periode...");
            const data = await getAllAlternatifPeriode();
            console.log("✅ Data Alternatif-Periode dari API:", data);
            setAlternatifPeriode(data);
        } catch (error) {
            console.error("❌ Error fetching all alternatif periode:", error);
        }
        setLoading(false);
    };

    // 🔥 Ambil daftar Alternatif dalam Periode tertentu
    const fetchAlternatifByPeriode = async () => {
        if (!periodeId) return; // 🔥 Hanya fetch jika periodeId diberikan
        setLoading(true);
        try {
            console.log(`🔥 Fetching Alternatif untuk Periode ID: ${periodeId}`);
            const data = await getAlternatifByPeriode(periodeId);
            console.log("✅ Data Alternatif dari Periode:", data);
            setAlternatifPeriode(data);
        } catch (error) {
            console.error("❌ Error fetching alternatif by periode:", error);
        }
        setLoading(false);
    };

    // 🔥 Ambil daftar Periode yang pernah diikuti oleh Alternatif tertentu
    const fetchPeriodeByAlternatif = async () => {
        if (!alternatifId) return; // 🔥 Hanya fetch jika alternatifId diberikan
        setLoading(true);
        try {
            console.log(`🔥 Fetching Periode untuk Alternatif ID: ${alternatifId}`);
            const data = await getPeriodeByAlternatif(alternatifId);
            console.log("✅ Data Periode dari Alternatif:", data);
            setAlternatifPeriode(data);
        } catch (error) {
            console.error("❌ Error fetching periode by alternatif:", error);
        }
        setLoading(false);
    };

    // 🔥 Daftarkan Alternatif ke Periode baru
    const daftarAlternatifPeriode = async (alternatifId, periodeId) => {
        try {
            console.log(`🔥 Menambahkan Alternatif ID: ${alternatifId} ke Periode ID: ${periodeId}`);
            await daftarAlternatifKePeriode(alternatifId, periodeId);
            await fetchAlternatifByPeriode(); // Refresh data setelah daftar ulang
        } catch (error) {
            console.error("❌ Error registering alternatif to periode:", error);
            throw error;
        }
    };

    // 🔥 Hapus Alternatif dari Periode tertentu
    const hapusAlternatif = async (alternatifId, periodeId) => {
        try {
            console.log(`🔥 Menghapus Alternatif ID: ${alternatifId} dari Periode ID: ${periodeId}`);
            await hapusAlternatifDariPeriode(alternatifId, periodeId);
            await fetchAlternatifByPeriode(); // Refresh data setelah dihapus
        } catch (error) {
            console.error("❌ Error removing alternatif from periode:", error);
            throw error;
        }
    };

    // 🔥 Ambil semua data saat pertama kali komponen dirender
    useEffect(() => {
        console.log("🔥 useEffect: Fetching semua Alternatif-Periode saat mount");
        fetchAllAlternatifPeriode();
    }, []);

    // 🔥 Fetch Alternatif berdasarkan Periode setiap kali `periodeId` berubah
    useEffect(() => {
        if (periodeId) {
            console.log(`🔥 useEffect: Fetching Alternatif untuk Periode ID ${periodeId}`);
            fetchAlternatifByPeriode();
        }
    }, [periodeId]);

    // 🔥 Fetch Periode berdasarkan Alternatif setiap kali `alternatifId` berubah
    useEffect(() => {
        if (alternatifId) {
            console.log(`🔥 useEffect: Fetching Periode untuk Alternatif ID ${alternatifId}`);
            fetchPeriodeByAlternatif();
        }
    }, [alternatifId]);

    return {
        alternatifPeriode,
        loading,
        fetchAllAlternatifPeriode,
        fetchAlternatifByPeriode,
        fetchPeriodeByAlternatif,
        daftarAlternatifPeriode,
        hapusAlternatif,
    };
};
