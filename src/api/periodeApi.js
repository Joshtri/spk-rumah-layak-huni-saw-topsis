import axios from "axios";
import { getAuthHeader } from "@/utils/authHeader";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/periode";

export const getAllPeriode = async () => {
    try {
        const response = await axios.get(API_BASE_URL, { headers: getAuthHeader() });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching periode:", error);
        throw error;
    }
};

export const getPeriodeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching periode dengan ID ${id}:`, error);
        throw error;
    }
};

export const createPeriode = async (data) => {
    try {
        const response = await axios.post(API_BASE_URL, data, { headers: getAuthHeader() });
        return response.data.data;
    } catch (error) {
        console.error("Error creating periode:", error);
        throw error;
    }
};

export const updatePeriode = async (id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, data, { headers: getAuthHeader() });
        return response.data.data;
    } catch (error) {
        console.error(`Error updating periode dengan ID ${id}:`, error);
        throw error;
    }
};

export const deletePeriode = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeader() });
    } catch (error) {
        console.error(`Error deleting periode dengan ID ${id}:`, error);
        throw error;
    }
};
