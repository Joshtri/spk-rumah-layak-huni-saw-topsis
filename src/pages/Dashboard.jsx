import React from "react";
import StatCard from "../components/ui/StatCard";

import { Users, List, Clock, BarChart2 } from "lucide-react"; // ✅ Ganti dengan lucide
import { useAlternatifContext as useAlternatif } from "../contexts/alternatifContext";
import { usePeriodeContext } from "../contexts/periodeContext";
import { useKriteriaContext as useKriteria } from "../contexts/kriteriaContext";
import { useAlternatifPeriodeContext } from "../contexts/alternatifPeriodeContext";
import Layout from "./Layout";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { alternatif, loading: loadingAlternatif } = useAlternatif();
  const { periode, loading: loadingPeriode } = usePeriodeContext();
  const { kriteria, loading: loadingKriteria } = useKriteria();
  const { alternatifPeriode, loading: loadingAlternatifPeriode } =
    useAlternatifPeriodeContext();

  const { user } = useAuth();

  const getSalamWaktu = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Pagi";
    if (hour < 18) return "Siang";
    return "Sore";
  };

  return (
    <Layout>
      {/* 🔥 Greeting Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-white border border-primary/20 p-6 rounded-2xl shadow-sm mb-5">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Selamat {getSalamWaktu()}, {user?.username || "User"}!
          </h2>
          {user?.role}
          <p className="text-gray-500 text-sm md:text-base">
            Semoga harimu menyenangkan dan produktif 🌿
          </p>
        </div>
      </div>

      {/* 🔢 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(user?.role === "ADMIN" || user?.role === "PERANGKAT_DESA") && (
          <>
            <StatCard
              title="Total Alternatif"
              navTo="/alternatif"
              navText="Lihat Semua"
              icon={<Users />}
            >
              <p className="text-3xl font-bold text-gray-800">
                {loadingAlternatif ? "..." : alternatif.length}
              </p>
            </StatCard>

            <StatCard
              title="Total Periode"
              navTo="/periode"
              navText="Lihat Semua"
              icon={<Clock />}
            >
              <p className="text-3xl font-bold text-gray-800">
                {loadingPeriode ? "..." : periode.length}
              </p>
            </StatCard>
          </>
        )}

        <StatCard
          title="Total Kriteria"
          navTo="/kriteria"
          navText="Lihat Semua"
          icon={<List />}
        >
          <p className="text-3xl font-bold text-gray-800">
            {loadingKriteria ? "..." : kriteria.length}
          </p>
        </StatCard>

        {(user?.role === "ADMIN" || user?.role === "PERANGKAT_DESA") && (
          <StatCard
            title="Alternatif Terdaftar"
            navTo="/alternatif-periode"
            navText="Detail"
            icon={<BarChart2 />}
          >
            <p className="text-3xl font-bold text-gray-800">
              {loadingAlternatifPeriode ? "..." : alternatifPeriode.length}
            </p>
          </StatCard>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
