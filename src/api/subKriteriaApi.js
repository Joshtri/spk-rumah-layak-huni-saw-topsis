import axios from "axios";
import { getAuthHeader } from "@/utils/authHeader";

const API_BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/subkriteria`;

export const getAllSubKriteria = async () => {
    const response = await axios.get(API_BASE_URL, { headers: getAuthHeader() });
    return response.data;
};

export const getSubKriteriaById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const createSubKriteria = async (data) => {
    const response = await axios.post(API_BASE_URL, data, { headers: getAuthHeader() });
    return response.data;
};

export const updateSubKriteria = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data, { headers: getAuthHeader() });
    return response.data;
};

export const deleteSubKriteria = async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
};
