import axios from "axios";
import { getAuthHeader } from "../utils/authHeader";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/alternatif-periode";

export const daftarAlternatifKePeriode = async (alternatifId, periodeId) => {
    const response = await axios.post(
        `${API_BASE_URL}/daftar`, 
        { alternatifId, periodeId }, 
        { headers: getAuthHeader() }
    );
    return response.data;
};

export const getAllAlternatifPeriode = async () => {
    const response = await axios.get(API_BASE_URL, { headers: getAuthHeader() });
    console.log("Data dari API:", response.data);
    return response.data;
};

export const hapusAlternatifDariPeriode = async (alternatifId, periodeId) => {
    const response = await axios.delete(`${API_BASE_URL}/hapus`, {
        headers: getAuthHeader(),
        data: { alternatifId, periodeId }
    });
    return response.data;
};

export const getPeriodeByAlternatif = async (alternatifId) => {
    const response = await axios.get(`${API_BASE_URL}/${alternatifId}/periode`, { headers: getAuthHeader() });
    return response.data;
};

export const getAlternatifByPeriode = async (periodeId) => {
    const response = await axios.get(`${API_BASE_URL}/${periodeId}/alternatif`, { headers: getAuthHeader() });
    return response.data;
};
