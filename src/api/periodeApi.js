import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/periode"; // Menggunakan env

// Ambil semua periode
export const getAllPeriode = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data.data; // Asumsikan API mengembalikan { success: true, data: [...] }
    } catch (error) {
        console.error("Error fetching periode:", error);
        throw error;
    }
};

// Ambil periode berdasarkan ID
export const getPeriodeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching periode dengan ID ${id}:`, error);
        throw error;
    }
};

// Buat periode baru
export const createPeriode = async (data) => {
    try {
        const response = await axios.post(API_BASE_URL, data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating periode:", error);
        throw error;
    }
};

// Update periode berdasarkan ID
export const updatePeriode = async (id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error(`Error updating periode dengan ID ${id}:`, error);
        throw error;
    }
};

// Hapus periode berdasarkan ID
export const deletePeriode = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting periode dengan ID ${id}:`, error);
        throw error;
    }
};
