import KriteriaInputModal from "../../components/Kriteria/KriteriaInputModal";
import KriteriaTable from "../../components/Kriteria/KriteriaTable";
import Layout from "../Layout";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import { useKriteria } from "../../hooks/useKriteria";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function KriteriaList() {
  const { kriteria, loading } = useKriteria();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(kriteria);
    console.log(kriteria);
  }, [kriteria]);

  useEffect(() => {
    console.log("filtered data:", filteredData);
  }, [filteredData]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(kriteria);
    } else {
      const filtered = kriteria.filter((item) => item.nama_kriteria.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <KriteriaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Layout>
        <Breadcrumbs pathArray={["Home", "Kriteria"]} />

        <PageTitle title="Kriteria" />
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full w-full">
          {/* add criteria & view button */}
          <div className="flex justify-end items-center h-full w-full">
            <div className="mr-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder={"Cari Kriteria"}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Kriteria
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/sub-kriteria"}>View Subkriteria</NavLink>
            </button>
          </div>

          {/* criteria table */}

          <KriteriaTable
            kriteria={filteredData}
            loading={loading}
          />
        </div>
      </Layout>
    </>
  );
}
