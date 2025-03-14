import React from "react";
import { Header, Sidebar, Footer } from "../components/partials";

const LayoutRoot = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutRoot;
