import { useEffect, useState } from "react";
import { loginUser, logoutUser } from "../api/authApi";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Gagal parse user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
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
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setUser(null);
    toast.info("🚪 Logout berhasil!");
    window.location.href = "/";
  };

  return { user, loading, login, logout };
};
