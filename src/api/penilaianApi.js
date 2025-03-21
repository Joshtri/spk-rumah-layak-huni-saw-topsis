import axios from "axios";
import { getAuthHeader } from "../utils/authHeader";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/penilaian`;

// 🔥 Ambil semua data Penilaian
export const getAllPenilaian = async () => {
    const response = await axios.get(API_BASE_URL, { headers: getAuthHeader() });
    return response.data;
};

// 🔥 Ambil satu Penilaian berdasarkan ID
export const getPenilaianById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

// 🔥 Tambah Penilaian baru (dengan nilai dari bobot sub_kriteria)
export const createPenilaian = async (alternatifId, subKriteriaId) => {
    const response = await axios.post(API_BASE_URL, {
        alternatifId,
        subKriteriaId,
    });

    return response.data;
};

// 🔥 Update nilai pada Penilaian
export const updatePenilaian = async (id, nilai) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, { nilai }, { headers: getAuthHeader() });
    return response.data;
};

// 🔥 Hapus Penilaian
export const deletePenilaian = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
};
