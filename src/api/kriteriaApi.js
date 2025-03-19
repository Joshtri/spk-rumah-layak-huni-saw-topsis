import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/kriteria`;

import { getAuthHeader } from "../utils/authHeader";


export const getAllKriteria = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
};

export const getKriteriaById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const createKriteria = async (data) => {
    const response = await axios.post(API_URL, data, { headers: getAuthHeader() });
    return response.data;
};

export const updateKriteria = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });
    return response.data;
};

export const deleteKriteria = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

export const getSubKriteriaByKriteria = async (idKriteria) => {
    const response = await axios.get(`${API_URL}/${idKriteria}/subkriteria`, { headers: getAuthHeader() });
    return response.data;
};
