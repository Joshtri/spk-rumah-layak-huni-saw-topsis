import KriteriaInputModal from "../../components/Kriteria/KriteriaInputModal";
import KriteriaTable from "../../components/Kriteria/KriteriaTable";
import Layout from "../Layout";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import { useKriteriaContext  as useKriteria } from "../../contexts/kriteriaContext";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Paginations from "../../components/ui/Pagination";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function KriteriaList() {
  // searchbar states
  const { kriteria, loading } = useKriteria();
  const [filteredData, setFilteredData] = useState([]);

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // searchbar functions
  useEffect(() => {
    setFilteredData(kriteria);
    console.log(kriteria);
  }, [kriteria]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(kriteria);
    } else {
      const filtered = kriteria.filter((item) =>
        item.nama_kriteria.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // pagination functions
  const onPageChange = (page) => setCurrentPage(page);
  const role = localStorage.getItem("role");
  const isAdminOrKepalaDesa = role === "ADMIN" || role === "KEPALA_DESA";

  return (
    <>
      <KriteriaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Layout>
        <Breadcrumbs
          pathArray={[
            { path: "/dashboard", label: "Home" },
            { path: null, label: "Kriteria" },
          ]}
        />

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

            {/* 🔐 Tampilkan hanya jika role ADMIN / KEPALA_DESA */}
            {isAdminOrKepalaDesa && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                Tambah Kriteria
              </button>
            )}

            {/* View Subkriteria (boleh semua role) */}
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/sub-kriteria"}>View Subkriteria</NavLink>
            </button>
          </div>

          {/* criteria table */}

          <KriteriaTable kriteria={currentData} loading={loading} />

          {/* pagination */}
          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </Layout>
    </>
  );
}
