import { useState, useEffect } from "react";
import { loginUser, getCurrentUser, logoutUser } from "../api/authApi";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("❌ Gagal mengambil user:", error);
        logout(); // Jika token invalid, langsung logout
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      
      // Simpan token dan informasi user di localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("id", data.user.id);

      setUser(data.user);
      toast.success("✅ Login berhasil!");

      return data;
    } catch (error) {
      toast.error("❌ Gagal login! Periksa email atau password.");
      throw error.response?.data?.message || "Gagal login";
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("id");

    setUser(null);
    toast.info("🚪 Logout berhasil!");
    window.location.href = "/"; // Redirect ke halaman login setelah logout
  };

  return { user, loading, login, logout };
};
