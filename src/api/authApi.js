import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL + "/api/auth"; // 🔥 Sesuaikan dengan backend

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) return null;
  
    try {
      const response = await axios.get(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
    //   console.error("❌ Gagal mengambil data user:", error);
      return null;
    }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  window.location = "/login"; // Redirect ke login setelah logout
};
