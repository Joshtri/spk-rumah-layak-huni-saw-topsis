import { Bell, BookOpen, User, Menu, X, MoreVertical } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ConfirmationDialog from "../ui/ConfirmationDialogComponent";
import { Tooltip, Dropdown } from "flowbite-react";
import logoRoteNdao from "../../assets/logo-rote-ndao.png";

export const Header = ({ onMenuClick, isSidebarOpen }) => {
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
          {/* Hamburger menu in header */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <img
            src={logoRoteNdao}
            alt="Kabupaten Rote Ndao Logo"
            className="h-14 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold hidden sm:block">SPK Penentuan Rumah Layak Huni | Desa Lakamola</h1>
          <h1 className="text-xl font-semibold sm:hidden">SPK RLH</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Tooltip content="Cara Kerja Perhitungan SAW TOPSIS">
            <NavLink
              to={"/how-to"}
              className="p-1 rounded-full"
            >
              <BookOpen className="h-5 w-5 text-gray-600" />
            </NavLink>
          </Tooltip>
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

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            }
          >
            <Dropdown.Item
              as={NavLink}
              to="/how-to"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Cara Kerja
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setIsModalOpen(true)}>
              <Bell className="h-4 w-4 mr-2" />
              Notifikasi
            </Dropdown.Item>
            <Dropdown.Item
              as={NavLink}
              to="/profile"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
