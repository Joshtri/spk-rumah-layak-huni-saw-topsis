import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";
import { Select } from "flowbite-react";
import { usePeriode } from "../../hooks/usePeriode";
import { useEffect, useState } from "react";
import ButtonExportToPdf from "../../components/ui/ButtonExportToPdf";
import { getHasilPerhitunganByPeriode } from "../../api/hasilPerhitunganApi"; // ✅

export default function RankingList() {
  const { periode } = usePeriode();
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [rankingData, setRankingData] = useState([]); // ✅

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedPeriode) {
        setRankingData([]);
        return;
      }

      try {
        const data = await getHasilPerhitunganByPeriode(selectedPeriode); // ✅
        setRankingData(data);
      } catch (error) {
        console.error("❌ Gagal mengambil data hasil perhitungan:", error);
      }
    };

    fetchData();
  }, [selectedPeriode]);

  return (
    <Layout>
      <BreadCrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: null, label: "Hasil Perhitungan" },
        ]}
      />
      <PageTitle title="Hasil Perhitungan" />

      <div className="flex items-center justify-end mb-4">
        <div className="flex-1 max-w-sm mr-auto">
          <Select
            id="periode"
            value={selectedPeriode}
            onChange={(e) => setSelectedPeriode(e.target.value)}
            required
            className="text-gray-900"
            theme={{
              field: {
                select: {
                  base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 text-lg",
                },
              },
            }}
          >
            <option value="" className="text-gray-900">Pilih Periode</option>
            {periode?.map((p) => (
              <option key={p.id_periode} value={p.id_periode}>
                {p.nama_periode}
              </option>
            ))}
          </Select>
        </div>

        <ButtonExportToPdf
          elementId="ranking-table-print"
          filename="hasil-perhitungan"
          onBeforePrint={() => setIsPrinting(true)}
          onAfterPrint={() => setIsPrinting(false)}
        />
      </div>

      {/* Tabel versi cetak */}
      <div
        id="ranking-table-print"
        className={isPrinting ? "block mb-4" : "hidden"}
        style={{ maxWidth: "100%", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Hasil Perhitungan</h2>
          <p className="text-lg">
            {periode?.find((p) => p.id_periode === selectedPeriode)?.nama_periode || ""}
          </p>
        </div>
        <RankingTable
          rankings={rankingData}
          disablePagination={true}
          showAllData={true}
        />
      </div>

      {/* Tabel versi tampilan biasa */}
      <div className={isPrinting ? "hidden" : "block"}>
        <RankingTable
          rankings={rankingData}
          disablePagination={false}
        />
      </div>
    </Layout>
  );
}
