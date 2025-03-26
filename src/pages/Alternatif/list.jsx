import Layout from "../Layout";
import AlternatifTable from "../../components/alternatif/Alternatiftable";
import AlternatifInputModal from "../../components/Alternatif/AlternatifInputModal";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Paginations from "../../components/ui/Pagination";
import { useAlternatifContext } from "../../contexts/alternatifContext";
import { useState, useEffect } from "react";

export default function AlternatifList() {
  const { alternatif, loading } = useAlternatifContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Add role check
  const user = JSON.parse(localStorage.getItem("user"));
  const isPerangkatDesa = user?.role === "PERANGKAT_DESA" || user?.role === "ADMIN";

  // Add pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setFilteredData(alternatif);
  }, [alternatif]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(alternatif);
    } else {
      const filtered = alternatif.filter((item) =>
        item.nama_alternatif.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  };

  // Add pagination function
  const onPageChange = (page) => setCurrentPage(page);

  return (
    <Layout>
      <Breadcrumbs
        pathArray={[
          { path: "/dashboard", label: "Home" },
          { path: null, label: "Alternatif" },
        ]}
      />
      <PageTitle title="Alternatif" />
      <AlternatifInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="grid grid-rows-[auto_1fr] h-full gap-4">
        <div className="flex justify-end items-center h-full w-full">
          <div className="mr-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder={"Cari Alternatif"}
            />
          </div>
          {isPerangkatDesa && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Alternatif
            </button>
          )}
        </div>

        <AlternatifTable
          alternatif={currentData}
          loading={loading}
        />

        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Layout>
  );
}
