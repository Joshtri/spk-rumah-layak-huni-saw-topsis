// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboardPage";
import TestPage from "./pages/testPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<DashboardPage />}
          />
          <Route
            path="/test"
            element={<TestPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
