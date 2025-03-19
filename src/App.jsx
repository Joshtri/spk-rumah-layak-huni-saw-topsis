import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoutes from "./Components/Addons/ProtectedRoutes";
import LoginPage from "./Pages/Auth/LoginPage";
import DashboardPage from "./Pages/Dashboard/Dashboard";
import KriteriaList from "./Pages/Kriteria/KriteriaList";
import SubKriteriaList from "./Pages/SubKriteria/SubKriteriaList";
import AlternatifList from "./Pages/Alternatif/list";
import UsersList from "./Pages/UsersManagement/UsersManagement";
import Profile from "./Pages/ProfileManagement/Profile";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import RankingList from "./Pages/Ranking/RankingList";
import { Toaster } from "sonner";
import { KriteriaProvider } from "./contexts/kriteriaContext";
import PeriodeList from "./Pages/Periode/PeriodeList";
import AlternatifPeriodeList from "./Pages/AlternatifPeriode/list";

function App() {
  return (
    <KriteriaProvider>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes - Semua halaman hanya bisa diakses oleh ADMIN */}
          {/* <Route element={<ProtectedRoutes />}> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/alternatif" element={<AlternatifList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ranking" element={<RankingList />} />
          <Route path="/kriteria" element={<KriteriaList />} />
          <Route path="/sub-kriteria" element={<SubKriteriaList />} />
          <Route path="/periode" element={<PeriodeList />} />
          <Route path="/users-management" element={<UsersList />} />
          <Route
            path="/alternatif-periode"
            element={<AlternatifPeriodeList />}
          />
          {/* </Route> */}

          {/* Not Found Route */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </KriteriaProvider>
  );
}

export default App;
