import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/alternatif"; // Menggunakan env

export const getAllAlternatif = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const getAlternatifById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

export const createAlternatif = async (data) => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
};

export const updateAlternatif = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
};

export const deleteAlternatif = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};
