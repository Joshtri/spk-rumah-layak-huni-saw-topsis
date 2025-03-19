import { Bell, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import ConfirmationDialog from "../ui/ConfirmationDialogComponent";

import logoRoteNdao from "../../assets/logo-rote-ndao.png";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className="bg-white border-b">
      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        toConfirm={"Apakah anda yakin"}
        onConfirm={() => {
          console.log("Confirmed");
        }}
      />

      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src={logoRoteNdao}
            alt="Kabupaten Rote Ndao Logo"
            className="h-14 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold">SPK Penentuan Rumah Layak Huni | Desa Lakamola</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <NavLink
            to={"/profile"}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <User className="h-5 w-5 text-gray-600" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

// export default Header
