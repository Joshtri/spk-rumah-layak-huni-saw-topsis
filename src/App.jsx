// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
// import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboardPage";
import AdminCriteriaPage from "./pages/adminCriteriaPage";
import CriteriaViewPage from "./pages/criteriaViewPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route
            path="/kriteria"
            element={<AdminCriteriaPage />}
          />
          <Route
            path="/subkriteria-view"
            element={<CriteriaViewPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
