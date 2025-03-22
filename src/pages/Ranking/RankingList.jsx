import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";
import { Select } from "flowbite-react";
import { usePeriode } from "../../hooks/usePeriode";
import { useState } from "react";

export default function RankingList() {
  const { periode } = usePeriode();
  const [selectedPeriode, setSelectedPeriode] = useState("");

  return (
    <Layout>
      <BreadCrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: null, label: "Hasil Perhitungan" },
        ]}
      />
      <PageTitle title="Hasil Perhitungan" />

      <div className="w-full mb-4 max-w-sm">
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

      <RankingTable rankings={[]} />
    </Layout>
  );
}
