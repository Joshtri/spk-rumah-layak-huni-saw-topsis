import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import LoginPage from "./pages/Auth/LoginPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import DashboardPage from "./pages/Dashboard";
import AlternatifList from "./pages/Alternatif/list";
import AlternatifPeriodeList from "./pages/AlternatifPeriode/list";
import UsersList from "./pages/UsersManagement/UsersManagement";
import PeriodeList from "./pages/Periode/PeriodeList";
import SubKriteriaList from "./pages/SubKriteria/SubKriteriaList";
import KriteriaList from "./pages/Kriteria/KriteriaList";
import RankingList from "./pages/Ranking/RankingList";
import Profile from "./pages/ProfileManagement/Profile";
import { KriteriaProvider } from "./contexts/kriteriaContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PenilaianList from "./pages/Penilaian/PenilaianList";
import PenilaianCreate from "./pages/Penilaian/PenilaianCreate";

function App() {
  return (
    <KriteriaProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes - HANYA ADMIN yang bisa mengakses */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/alternatif" element={<AlternatifList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ranking" element={<RankingList />} />
            <Route path="/kriteria" element={<KriteriaList />} />
            <Route path="/sub-kriteria" element={<SubKriteriaList />} />
            <Route path="/periode" element={<PeriodeList />} />
            <Route path="/users-management" element={<UsersList />} />
            <Route path="/penilaian" element={<PenilaianList />} />
            <Route path="/penilaian/create" element={<PenilaianCreate />} />
            <Route
              path="/alternatif-periode"
              element={<AlternatifPeriodeList />}
            />
          </Route>

          {/* Not Found Route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </KriteriaProvider>
  );
}

export default App;
