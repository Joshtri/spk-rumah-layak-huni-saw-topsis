import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { AlternatifProvider } from "./contexts/alternatifContext";
import { AlternatifPeriodeProvider } from "./contexts/alternatifPeriodeContext";
import { KriteriaProvider } from "./contexts/kriteriaContext";
import { PenilaianProvider } from "./contexts/penilaianContext";
import { PeriodeProvider } from "./contexts/periodeContext";
import { SubKriteriaProvider } from "./contexts/subKriteriaContext";
import { UsersProvider } from "./contexts/usersContext";
import AlternatifList from "./pages/Alternatif/list";
import AlternatifPeriodeList from "./pages/AlternatifPeriode/list";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/Dashboard";
import SPKStepByStep from "./pages/HowTo/HowToPage";
import KriteriaList from "./pages/Kriteria/KriteriaList";
import PenilaianCreate from "./pages/Penilaian/PenilaianCreate";
import PenilaianEdit from "./pages/Penilaian/PenilaianEdit";
import PenilaianList from "./pages/Penilaian/PenilaianList";
import PerhitunganMain from "./pages/Perhitungan/PerhitunganMain";
import PerhitunganSawTopsisMain from "./pages/Perhitungan/PerhitunganSawTopsisMain";
import PeriodeList from "./pages/Periode/PeriodeList";
import Profile from "./pages/ProfileManagement/Profile";
import RankingList from "./pages/Ranking/RankingList";
import SubKriteriaList from "./pages/SubKriteria/SubKriteriaList";
import UsersList from "./pages/UsersManagement/UsersManagement";

function App() {
  return (
    <AlternatifPeriodeProvider>
      <PenilaianProvider>
        <UsersProvider>
          <KriteriaProvider>
            <SubKriteriaProvider>
              <AlternatifProvider>
                <PeriodeProvider>
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

                      {/* 🔒 Dashboard - semua role boleh */}
                      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "PERANGKAT_DESA", "KEPALA_DESA"]} />}>
                        <Route
                          path="/dashboard"
                          element={<DashboardPage />}
                        />
                      </Route>

                      {/* 🔒 Hanya ADMIN & PERANGKAT_DESA */}
                      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "PERANGKAT_DESA"]} />}>
                        <Route
                          path="/periode"
                          element={<PeriodeList />}
                        />
                        <Route
                          path="/users-management"
                          element={<UsersList />}
                        />
                        <Route
                          path="/penilaian"
                          element={<PenilaianList />}
                        />
                        <Route
                          path="/penilaian/create"
                          element={<PenilaianCreate />}
                        />
                        <Route
                          path="/penilaian/edit/:id"
                          element={<PenilaianEdit />}
                        />
                        <Route
                          path="/alternatif-periode"
                          element={<AlternatifPeriodeList />}
                        />
                        <Route
                          path="/perhitungan-intro"
                          element={<PerhitunganMain />}
                        />
                        <Route
                          path="/perhitungan-saw-topsis"
                          element={<PerhitunganSawTopsisMain />}
                        />
                      </Route>

                      {/* 🔒 KEPALA_DESA + ADMIN + PERANGKAT_DESA (shared access) */}
                      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "PERANGKAT_DESA", "KEPALA_DESA"]} />}>
                        <Route
                          path="/alternatif"
                          element={<AlternatifList />}
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
                          path="/profile"
                          element={<Profile />}
                        />
                        <Route
                          path="/hasil-perhitungan"
                          element={<RankingList />}
                        />
                      </Route>

                      {/* Public How-To Page */}
                      <Route
                        path="/how-to"
                        element={<SPKStepByStep />}
                      />

                      {/* Not Found */}
                      <Route
                        path="*"
                        element={<h1>404 - Page Not Found</h1>}
                      />
                    </Routes>
                  </BrowserRouter>
                </PeriodeProvider>
              </AlternatifProvider>
            </SubKriteriaProvider>
          </KriteriaProvider>
        </UsersProvider>
      </PenilaianProvider>
    </AlternatifPeriodeProvider>
  );
}

export default App;
