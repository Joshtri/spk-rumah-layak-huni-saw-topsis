import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/alternatif-periode"; // Menggunakan ENV untuk base URL

// 🔥 Daftarkan Alternatif ke Periode
export const daftarAlternatifKePeriode = async (alternatifId, periodeId) => {
    const response = await axios.post(`${API_BASE_URL}/daftar`, { alternatifId, periodeId });
    return response.data;
};



// 🔥 Ambil semua data Alternatif yang sudah masuk ke Periode
export const getAllAlternatifPeriode = async () => {
    const response = await axios.get(API_BASE_URL);
    console.log("Data dari API:", response.data); // 🔥 Debugging API Response
    return response.data;
};




// 🔥 Hapus Alternatif dari Periode tertentu
export const hapusAlternatifDariPeriode = async (alternatifId, periodeId) => {
    const response = await axios.delete(`${API_BASE_URL}/hapus`, { data: { alternatifId, periodeId } });
    return response.data;
};

// 🔥 Ambil daftar Periode yang pernah diikuti oleh Alternatif
export const getPeriodeByAlternatif = async (alternatifId) => {
    const response = await axios.get(`${API_BASE_URL}/${alternatifId}/periode`);
    return response.data;
};

// 🔥 Ambil daftar Alternatif dalam Periode tertentu
export const getAlternatifByPeriode = async (periodeId) => {
    const response = await axios.get(`${API_BASE_URL}/${periodeId}/alternatif`);
    return response.data;
};
