import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/auth/loginPage";
import DashboardPage from "@/pages/dashboard/dashboard";
import KriteriaList from "@/pages/kriteria/list";
import SubKriteriaList from "@/pages/sub-kriteria/list";
import AlternatifList from "@/pages/alternatif/list";
import AdminList from "./pages/admin/list";
import Profile from "./pages/profile-management/profile";
import ForgotPassword from "./pages/auth/forgotPassword";
import RankingList from "./pages/ranking/list";
import { Toaster } from "sonner";
import { KriteriaProvider } from "@/contexts/kriteriaContext"; // Import Provider

function App() {
  return (
    <>
      <KriteriaProvider>
        <Toaster position="top-right" richColors />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/kriteria" element={<KriteriaList />} />
            <Route path="/sub-kriteria" element={<SubKriteriaList />} />
            <Route path="/alternatif" element={<AlternatifList />} />
            <Route path="/admin" element={<AdminList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ranking" element={<RankingList />} />
          </Routes>
        </BrowserRouter>
      </KriteriaProvider>
    </>
  );
}

export default App;
