import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/loginPage";
import DashboardPage from "@/pages/dashboard";
import KriteriaList from "@/pages/kriteria/list";
import SubKriteriaList from "@/pages/sub-kriteria/list";

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
            element={<KriteriaList />}
          />
          <Route
            path="/sub-kriteria"
            element={<SubKriteriaList />}
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
