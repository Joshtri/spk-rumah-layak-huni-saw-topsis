import { useEffect } from "react";
import { CalculatorIcon, Calendar, LayoutDashboard, LogOut, Ruler, Users, Menu, X } from "lucide-react";
import { MdGrade } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    onClose?.();
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Ruler, text: "Kriteria", path: "/kriteria" },
    { icon: Ruler, text: "Sub Kriteria", path: "/sub-kriteria" },
    { icon: Users, text: "Alternatif", path: "/alternatif" },
    { icon: Users, text: "Alternatif Periode", path: "/alternatif-periode" },
    { icon: Calendar, text: "Periode", path: "/periode" },
    { icon: Users, text: "Users Management", path: "/users-management" },
    { icon: MdGrade, text: "Penilaian Alternatif", path: "/penilaian" },
    {
      icon: CalculatorIcon,
      text: "Perhitungan TOPSIS &  SAW",
      path: "/perhitungan-intro",
    },
    {
      icon: CalculatorIcon,
      text: "Hasil Perhitungan",
      path: "/hasil-perhitungan",
    },
  ];

  // 🚫 Saat user belum tersedia (misalnya masih loading), jangan render menu
  if (!user) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar fixed md:static w-72 bg-[#1F2937] min-h-screen flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col flex-1">
          <nav className="flex-1 p-6 flex flex-col">
            <div className="space-y-1">
              {menuItems
                .filter((item) => {
                  // 🎯 Role KEPALA_DESA hanya akses 2 menu
                  if (user.role === "KEPALA_DESA") {
                    return (
                      item.text === "Kriteria" ||
                      item.text === "Sub Kriteria" ||
                      item.text === "Dashboard" ||
                      item.text === "Alternatif" ||
                      item.text === "Hasil Perhitungan"
                    );
                  }

                  // ADMIN dan PERANGKAT_DESA bisa akses semua
                  if (user.role === "ADMIN" || user.role === "PERANGKAT_DESA") {
                    return true;
                  }

                  return false;
                })
                .map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                        isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </NavLink>
                ))}
            </div>

            {/* 🔥 Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-gray-300 hover:bg-red-700 hover:text-white mt-auto"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Keluar</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};
