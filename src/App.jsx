import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import DashboardPage from "./pages/Dashboard";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
