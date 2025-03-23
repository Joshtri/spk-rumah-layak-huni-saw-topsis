import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/hasil-perhitungan`;

export const getHasilPerhitunganByPeriode = async (periodeId) => {
  const response = await axios.get(`${API_URL}/${periodeId}`);
  return response.data;
};

export const getHasilPerhitungan = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

export const saveHasilPerhitungan = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const deleteHasilPerhitungan = async (periodeId) => {
  const response = await axios.delete(`${API_URL}/${periodeId}`);
  return response.data;
};
