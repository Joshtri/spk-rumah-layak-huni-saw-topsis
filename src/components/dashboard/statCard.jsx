import { Card, Button } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { FiBarChart2, FiTrendingUp, FiDatabase } from "react-icons/fi"; // 🔥 Ikon tambahan

export default function StatCard({ children, title, navTo, navText, icon }) {
  return (
    <Card
      className="w-full h-[12rem] flex flex-col justify-between border border-gray-300 rounded-lg shadow-lg transition-all duration-300 
      hover:shadow-xl hover:scale-105 hover:border-gray-400"
    >
      {/* 🔥 Ikon dan Title */}
      <div className="flex items-center gap-3">
        {icon && <div className="text-4xl text-gray-700">{icon}</div>}
        {title && <h5 className="text-2xl font-semibold text-gray-900">{title}</h5>}
      </div>

      {/* Konten utama */}
      <div className="text-lg text-gray-700">{children}</div>

      {/* Tombol navigasi */}
      {navTo && (
        <div className="mt-auto flex justify-end w-full">
          <NavLink to={navTo}>
            <Button className="bg-blue-600 text-white hover:bg-blue-800 hover:shadow-md transition-all">
              {navText}
            </Button>
          </NavLink>
        </div>
      )}
    </Card>
  );
}
