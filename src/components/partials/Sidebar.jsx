import { useEffect } from "react";
import {
  CalculatorIcon,
  Calendar,
  LayoutDashboard,
  LogOut,
  Ruler,
  Users,
  ClipboardList, // ✅ Pengganti MdGrade
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    onClose?.();
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const menuGroups = [
    {
      title: "Utama",
      items: [{ icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" }],
    },
    {
      title: "Data Primary",
      items: [
        { icon: Ruler, text: "Kriteria", path: "/kriteria" },
        { icon: Ruler, text: "Sub Kriteria", path: "/sub-kriteria" },
        { icon: Users, text: "Alternatif", path: "/alternatif" },
        { icon: Users, text: "Alternatif Periode", path: "/alternatif-periode" },
        { icon: Calendar, text: "Periode", path: "/periode" },
      ],
    },
    {
      title: "Perhitungan",
      items: [
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
      ],
    },
    {
      title: "Manajemen",
      items: [
        { icon: Users, text: "Users Management", path: "/users-management" },
        {
          icon: ClipboardList, // ✅ Gantikan MdGrade
          text: "Penilaian Alternatif",
          path: "/penilaian",
        },
      ],
    },
  ];

  if (!user) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar fixed md:static w-72 bg-[#1F2937] min-h-screen flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col flex-1">
          <nav className="flex-1 p-6 flex flex-col">
            <div className="space-y-4">
              {menuGroups.map((group, groupIdx) => {
                const filteredItems = group.items.filter((item) => {
                  if (user.role === "KEPALA_DESA") {
                    return (
                      item.text === "Kriteria" ||
                      item.text === "Sub Kriteria" ||
                      item.text === "Dashboard" ||
                      item.text === "Alternatif" ||
                      item.text === "Hasil Perhitungan"
                    );
                  }
                  if (user.role === "ADMIN" || user.role === "PERANGKAT_DESA") {
                    return true;
                  }
                  return false;
                });

                if (filteredItems.length === 0) return null;

                return (
                  <div key={groupIdx} className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wide px-3">
                      {group.title}
                    </p>
                    {filteredItems.map((item, index) => (
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
                    {groupIdx !== menuGroups.length - 1 && (
                      <hr className="border-t border-gray-600 my-2 mx-3" />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-3 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 mt-auto transition-colors"
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
