import LayoutRoot from "../layout";
import StatCard from "@/components/Dashboard/statCard";
import { FiList, FiUsers, FiClock, FiBarChart2 } from "react-icons/fi"; // 🔥 Ikon tambahan
import { useAlternatif } from "@/hooks/useAlternatif";
import { usePeriode } from "@/hooks/usePeriode";
import { useKriteria } from "@/hooks/useKriteria";
import { useAlternatifPeriode } from "@/hooks/useAlternatifPeriode";

export default function DashboardPage() {
  const { alternatif, loading: loadingAlternatif } = useAlternatif();
  const { periode, loading: loadingPeriode } = usePeriode();
  const { kriteria, loading: loadingKriteria } = useKriteria();
  const { alternatifPeriode, loading: loadingAlternatifPeriode } = useAlternatifPeriode();

  return (
    <LayoutRoot>
      <div className="grid grid-rows-[auto,1fr] gap-10 h-full">
        {/* 🔥 Greeting */}
        <div className="flex justify-center items-center h-full text-center">
          <h1
            className="text-6xl font-bold text-gray-800 
            transition-all duration-300 ease-in-out
            [text-shadow:_0px_10px_10px_rgb(0_0_0_/_20%)]"
          >
            Selamat Datang di Dashboard!
          </h1>
        </div>

        {/* 🔥 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Alternatif */}
          <StatCard title="Total Alternatif" navTo="/alternatif" navText="Lihat Semua" icon={<FiUsers />}>
            <p className="text-3xl font-bold text-gray-800">{loadingAlternatif ? "..." : alternatif.length}</p>
          </StatCard>

          {/* Total Periode */}
          <StatCard title="Total Periode" navTo="/periode" navText="Lihat Semua" icon={<FiClock />}>
            <p className="text-3xl font-bold text-gray-800">{loadingPeriode ? "..." : periode.length}</p>
          </StatCard>

          {/* Total Kriteria */}
          <StatCard title="Total Kriteria" navTo="/kriteria" navText="Lihat Semua" icon={<FiList />}>
            <p className="text-3xl font-bold text-gray-800">{loadingKriteria ? "..." : kriteria.length}</p>
          </StatCard>

          {/* Total Alternatif dalam Periode */}
          <StatCard title="Alternatif Terdaftar" navTo="/alternatif-periode" navText="Detail" icon={<FiBarChart2 />}>
            <p className="text-3xl font-bold text-gray-800">{loadingAlternatifPeriode ? "..." : alternatifPeriode.length}</p>
          </StatCard>
        </div>
      </div>
    </LayoutRoot>
  );
}
