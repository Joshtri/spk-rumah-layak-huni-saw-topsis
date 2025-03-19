import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/Dashboard/Dashboard";
import KriteriaList from "./pages/Kriteria/KriteriaList";
import SubKriteriaList from "./pages/SubKriteria/SubKriteriaList";
import AlternatifList from "./pages/Alternatif/list";
import UsersList from "./pages/UsersManagement/UsersManagement";
import Profile from "./pages/ProfileManagement/Profile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RankingList from "./pages/Ranking/RankingList";
import { Toaster } from "sonner";
import { KriteriaProvider } from "./contexts/kriteriaContext";
import PeriodeList from "./pages/Periode/PeriodeList";
import AlternatifPeriodeList from "./pages/AlternatifPeriode/list";

function App() {
  return (
    <KriteriaProvider>
      <Toaster
        position="top-right"
        richColors
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<LoginPage />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* Protected Routes - Semua halaman hanya bisa diakses oleh ADMIN */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />
            <Route
              path="/alternatif"
              element={<AlternatifList />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/ranking"
              element={<RankingList />}
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
              path="/periode"
              element={<PeriodeList />}
            />
            <Route
              path="/users-management"
              element={<UsersList />}
            />
            <Route
              path="/alternatif-periode"
              element={<AlternatifPeriodeList />}
            />
          </Route>

          {/* Not Found Route */}
          <Route
            path="*"
            element={<h1>Not Found</h1>}
          />
        </Routes>
      </BrowserRouter>
    </KriteriaProvider>
  );
}

export default App;
