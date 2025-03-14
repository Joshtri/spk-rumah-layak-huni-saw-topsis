import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import AdminCriteriaPage from "./pages/adminCriteriaPage";
import CriteriaViewPage from "./pages/adminSubCriteriaPage";
import AlternativeCrudPage from "./pages/alternativeCrud";

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
            path="/sub-kriteria"
            element={<CriteriaViewPage />}
          />
          <Route
            path="/alternatif"
            element={<AlternativeCrudPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
