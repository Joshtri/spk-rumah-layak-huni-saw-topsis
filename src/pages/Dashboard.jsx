import React from "react";
import StatCard from "../components/ui/StatCard";

import { FiList, FiUsers, FiClock, FiBarChart2 } from "react-icons/fi"; // 🔥 Ikon tambahan
import { useAlternatif } from "../hooks/useAlternatif";
import { usePeriode } from "../hooks/usePeriode";
import { useKriteria } from "../hooks/useKriteria";
import { useAlternatifPeriode } from "../hooks/useAlternatifPeriode";
import Layout from "./Layout";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { alternatif, loading: loadingAlternatif } = useAlternatif();
  const { periode, loading: loadingPeriode } = usePeriode();
  const { kriteria, loading: loadingKriteria } = useKriteria();
  const { alternatifPeriode, loading: loadingAlternatifPeriode } =
    useAlternatifPeriode();

  const { user } = useAuth();

  const getSalamWaktu = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Pagi";
    if (hour < 18) return "Siang";
    return "Sore";
  };

  return (
    <Layout>
      {/* 🔥 Stat Cards */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-white border border-primary/20 p-6 rounded-2xl shadow-sm mb-5">
        {/* Icon / Emoji / Avatar */}
        {/* <div className="text-5xl">👋</div> */}

        {/* Textual Content */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 🔥 Greeting Section */}

        {/* 🔐 ADMIN & PERANGKAT_DESA bisa lihat semua */}
        {(user?.role === "ADMIN" || user?.role === "PERANGKAT_DESA") && (
          <>
            {/* Total Alternatif */}
            <StatCard
              title="Total Alternatif"
              navTo="/alternatif"
              navText="Lihat Semua"
              icon={<FiUsers />}
            >
              <p className="text-3xl font-bold text-gray-800">
                {loadingAlternatif ? "..." : alternatif.length}
              </p>
            </StatCard>

            {/* Total Periode */}
            <StatCard
              title="Total Periode"
              navTo="/periode"
              navText="Lihat Semua"
              icon={<FiClock />}
            >
              <p className="text-3xl font-bold text-gray-800">
                {loadingPeriode ? "..." : periode.length}
              </p>
            </StatCard>
          </>
        )}

        {/* Semua Role Bisa Lihat Total Kriteria */}
        <StatCard
          title="Total Kriteria"
          navTo="/kriteria"
          navText="Lihat Semua"
          icon={<FiList />}
        >
          <p className="text-3xl font-bold text-gray-800">
            {loadingKriteria ? "..." : kriteria.length}
          </p>
        </StatCard>

        {/* 🔐 ADMIN & PERANGKAT_DESA bisa lihat Alternatif Terdaftar */}
        {(user?.role === "ADMIN" || user?.role === "PERANGKAT_DESA") && (
          <StatCard
            title="Alternatif Terdaftar"
            navTo="/alternatif-periode"
            navText="Detail"
            icon={<FiBarChart2 />}
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
