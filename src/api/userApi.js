import axios from "axios";

 export const getAllUsers = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`);
    return response.data;
};

export const createUser = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user`, data);
    return response.data;
};

export const updateUser = async (id, data) => {
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`, data);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/user/${id}`);
};
