import React, { useState } from "react";
import { Sidebar } from "../components/partials/Sidebar";
import { Header } from "../components/partials/Header";
import { Footer } from "flowbite-react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
