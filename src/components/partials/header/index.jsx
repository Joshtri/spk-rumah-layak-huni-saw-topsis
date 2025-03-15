import { Bell, User } from "lucide-react";
import { NavLink } from "react-router-dom";
// import logoKabupatenRoteNdao from "../../../assets/logo-kab-rote-ndao.png";

export const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src=""
            alt="Kabupaten Rote Ndao Logo"
            className="h-10 w-10"
          />
          <h1 className="text-xl font-semibold">SPK Penentuan Rumah Layak Huni | Desa Lakamola</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
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
