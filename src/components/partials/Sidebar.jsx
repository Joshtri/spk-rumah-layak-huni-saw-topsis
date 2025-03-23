import {
  CalculatorIcon,
  Calendar,
  LayoutDashboard,
  LogOut,
  Ruler,
  Users,
} from "lucide-react";
import { MdGrade } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = () => {
  const { user, logout } = useAuth(); // ✅ Ambil user & logout dari auth

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
    <aside className="w-72 bg-[#1F2937] min-h-screen flex flex-col">
      <div className="flex flex-col flex-1">
        <nav className="flex-1 p-6 flex flex-col">
          <div className="space-y-1">
            {menuItems
              .filter((item) => {
                // 🎯 Role KEPALA_DESA hanya akses 2 menu
                if (user.role === "KEPALA_DESA") {
                  return (
                    item.text === "Kriteria" || item.text === "Sub Kriteria" || item.text === "Dashboard" || item.text === "Alternatif"
                  );
                }

                // ADMIN dan PERANGKAT_DESA bisa akses semua
                if (
                  user.role === "ADMIN" ||
                  user.role === "PERANGKAT_DESA"
                ) {
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
                      isActive
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
  );
};
