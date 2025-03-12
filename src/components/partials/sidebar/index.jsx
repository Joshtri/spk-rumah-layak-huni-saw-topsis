import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings, HelpCircle, School2, Verified, Dock, Ruler, Calculator } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Users, text: "Pengguna", path: "/pengguna" },
    { icon: School2, text: "Calon Penerima", path: "/calon-penerima" },
    { icon: Ruler, text: "Kriteria", path: "/kriteria" },
    { icon: Calculator, text: "HasilPerhitungan", path: "/hasil-perhitungan"},
    { icon: Verified, text: "Verifikasi Dokumen", path: "/verifikasi-dokumen" },
    { icon: Dock, text: "Laporan", path: "/laporan" },
    { icon: Settings, text: "Pengaturan", path: "/pengaturan" },
    { icon: HelpCircle, text: "Bantuan", path: "/bantuan" },
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