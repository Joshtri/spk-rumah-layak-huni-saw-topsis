import { Bell, BookOpen, Menu, X, User, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ConfirmationDialog from "../ui/ConfirmationDialogComponent";
import { Tooltip, Dropdown, Avatar } from "flowbite-react";
import logoRoteNdao from "../../assets/logo-rote-ndao.png";
import { useAuth } from "../../hooks/useAuth";

export const Header = ({ onMenuClick, isSidebarOpen }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b">
      <ConfirmationDialog
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        toConfirm={"Apakah anda yakin ingin logout?"}
        onConfirm={() => {
          console.log("🔒 Logged Out!");
          // Lakukan logout di sini (hapus token, redirect, dll)
        }}
      />

      <div className="flex justify-between items-center px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo + Title */}
          <img
            src={logoRoteNdao}
            alt="Kabupaten Rote Ndao Logo"
            className="h-14 w-auto object-contain"
          />
          <h1 className="text-xl font-semibold hidden sm:block">SPK Penentuan Rumah Layak Huni | Desa Lakamola</h1>
          <h1 className="text-xl font-semibold sm:hidden">SPK RLH</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Tombol How-To (desktop only) */}
          <Tooltip content="Cara Kerja Perhitungan SAW TOPSIS">
            <NavLink
              to={"/how-to"}
              className="p-1 rounded-full hidden md:inline"
            >
              <BookOpen className="h-5 w-5 text-gray-600" />
            </NavLink>
          </Tooltip>

          {/* Notifikasi (desktop only) */}
          <button
            className="p-1 rounded-full hover:bg-gray-100 hidden md:inline"
            onClick={() => alert("Notifikasi belum tersedia")}
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </button>

          {/* Avatar Dropdown (desktop & mobile) */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                img="https://ui-avatars.com/api/?name=User"
                rounded
                className="w-8 h-8 cursor-pointer"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-medium">Nama User</span>
              <span className="block truncate text-sm text-gray-500">user@example.com</span>
            </Dropdown.Header>
            <Dropdown.Item
              as={NavLink}
              to="/profile"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={logout}
              className="text-red-600 hover:bg-red-100 focus:bg-red-100"
            >
              <LogOut className="h-4 w-4 mr-2 text-red-600" />
              Logout
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};
