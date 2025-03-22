import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";
import { Select } from "flowbite-react";
import { usePeriode } from "../../hooks/usePeriode";
import { useState } from "react";
import ButtonExportToPdf from "../../components/ui/ButtonExportToPdf";

export default function RankingList() {
  const { periode } = usePeriode();
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

  // Add dummy data
  const dummyRankings = [
    { id: 1, nama: "John Doe", nilai: 85.5 },
    { id: 2, nama: "Jane Smith", nilai: 82.3 },
    { id: 3, nama: "Bob Johnson", nilai: 78.9 },
    { id: 4, nama: "Alice Brown", nilai: 77.2 },
    { id: 5, nama: "Charlie Davis", nilai: 75.8 },
    { id: 6, nama: "Eva Wilson", nilai: 73.4 },
    { id: 7, nama: "Frank Miller", nilai: 71.1 },
  ];

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
            <option
              value=""
              className="text-gray-900"
            >
              Pilih Periode
            </option>
            {periode?.map((p) => (
              <option
                key={p.id_periode}
                value={p.id_periode}
                className="text-gray-900"
              >
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

      {/* Table for PDF export - temporarily visible during export */}
      <div
        id="ranking-table-print"
        className={isPrinting ? "block mb-4" : "hidden"}
        style={{ maxWidth: "100%", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Hasil Perhitungan</h2>
          <p className="text-lg">{periode?.find((p) => p.id_periode === selectedPeriode)?.nama_periode || ""}</p>
        </div>
        <RankingTable
          rankings={dummyRankings}
          disablePagination={true} // This is crucial
          showAllData={true} // Add this prop if needed
        />
      </div>

      {/* Visible table with pagination */}
      <div className={isPrinting ? "hidden" : "block"}>
        <RankingTable
          rankings={dummyRankings}
          disablePagination={false}
        />
      </div>
    </Layout>
  );
}
