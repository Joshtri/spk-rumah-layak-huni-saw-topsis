import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaTools, FaQuestionCircle, FaSchool, FaCheckCircle, FaFileAlt, FaRuler, FaCalculator } from "react-icons/fa";

export const Sidebar = () => {
  const menuItems = [
    { icon: FaTachometerAlt, text: "Dashboard", path: "/dashboard" },
    { icon: FaUsers, text: "Pengguna", path: "/pengguna" },
    { icon: FaSchool, text: "Calon Penerima", path: "/calon-penerima" },
    { icon: FaRuler, text: "Kriteria", path: "/kriteria" },
    { icon: FaCalculator, text: "Hasil Perhitungan", path: "/hasil-perhitungan" },
    { icon: FaCheckCircle, text: "Verifikasi Dokumen", path: "/verifikasi-dokumen" },
    { icon: FaFileAlt, text: "Laporan", path: "/laporan" },
    { icon: FaTools, text: "Pengaturan", path: "/pengaturan" },
    { icon: FaQuestionCircle, text: "Bantuan", path: "/bantuan" },
  ];

  return (
    <aside className="w-64 bg-[#1F2937] min-h-screen">
      <div className="p-6">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
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
        </nav>
      </div>
    </aside>
  );
};