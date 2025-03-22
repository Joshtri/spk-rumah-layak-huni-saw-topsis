import PeriodeInputModal from "../../components/Periode/PeriodeInputModal";
import PeriodeTable from "../../components/Periode/PeriodeTable";
import Layout from "../Layout";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import { usePeriode } from "../../hooks/usePeriode";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Paginations from "../../components/ui/Pagination";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function PeriodeList() {
  const { periode, loading } = usePeriode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Add pagination states
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const onPageChange = (page) => setCurrentPage(page);

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
        <Breadcrumbs
          pathArray={[
            { path: "/dashboard", label: "Home" },
            { path: null, label: "Periode" },
          ]}
        />
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
            periode={currentData}
            loading={loading}
          />
          <div className="mt-4">
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
