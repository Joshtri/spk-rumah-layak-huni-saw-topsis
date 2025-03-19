import axios from "axios";



export const getAllKriteria = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/kriteria`);
    return response.data;
};

export const getKriteriaById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/kriteria/${id}`);
    return response.data;
};

export const createKriteria = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/kriteria`, data);
    return response.data;
};

export const updateKriteria = async (id, data) => {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/kriteria/${id}`, data);
    return response.data;
};

export const deleteKriteria = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/kriteria/${id}`);
    return response.data;
};


// 🔥 Ambil daftar subkriteria berdasarkan ID Kriteria
export const getSubKriteriaByKriteria = async (idKriteria) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/kriteria/${idKriteria}/subkriteria`);
    return response.data;
};