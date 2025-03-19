import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Settings, HelpCircle, Verified, Dock, Ruler, TrendingUp, LogOut } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, text: "Dashboard", path: "/dashboard" },
    { icon: Ruler, text: "Kriteria", path: "/kriteria" },
    { icon: Ruler, text: "Sub Kriteria", path: "/sub-kriteria" },
    { icon: Users, text: "Alternatif", path: "/alternatif" },
    { icon: TrendingUp, text: "Ranking", path: "/ranking" },
  ];

  return (
    <aside className="w-64 bg-[#1F2937] min-h-screen flex flex-col">
      <div className="flex flex-col flex-1">
        <nav className="flex-1 p-6 flex flex-col">
          <div className="space-y-1">
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
          </div>

          <NavLink
            className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-gray-300 hover:bg-red-700 hover:text-white mt-auto"
            to="/"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Keluar</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
