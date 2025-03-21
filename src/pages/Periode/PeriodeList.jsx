import PeriodeInputModal from "../../components/Periode/PeriodeInputModal";
import PeriodeTable from "../../components/Periode/PeriodeTable";
import Layout from "../Layout";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import { usePeriode } from "../../hooks/usePeriode";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function PeriodeList() {
  const { periode, loading } = usePeriode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(periode);
  }, [periode]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(periode);
    } else {
      const filtered = periode.filter((item) => item.nama_periode.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <PeriodeInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Layout>
        <Breadcrumbs pathArray={["Home", "Periode"]} />
        <PageTitle title="Periode" />
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
          <div className="flex justify-end items-center h-full w-full">
            <div className="mr-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder={"Cari Periode"}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Periode
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/alternatif"}>View Alternatif</NavLink>
            </button>
          </div>

          <PeriodeTable
            periode={filteredData}
            loading={loading}
          />
        </div>
      </Layout>
    </>
  );
}
