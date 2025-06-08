import KriteriaInputModal from "../../components/Kriteria/KriteriaInputModal";
import KriteriaTable from "../../components/Kriteria/KriteriaTable";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import PageTitle from "../../components/ui/PageTitle";
import Paginations from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import Layout from "../Layout";

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function KriteriaList() {
  // searchbar states
  const { kriteria, loading } = useKriteria();
  const [filteredData, setFilteredData] = useState([]);
  const [totalBobot, setTotalBobot] = useState(0);
  const [isTotalValid, setIsTotalValid] = useState(true);

  // modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchTotalBobot = async () => {
      try {
        const res = await axios.get("/api/cek-total-bobot-kriteria", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        const data = res.data;
        setTotalBobot(data.total || 0);

        console.log(data);
        // ❗ Jika success === true → artinya sudah pas 100%, jadi tidak valid untuk tambah
        setIsTotalValid(data.success === false);
      } catch (err) {
        console.error("Gagal cek total bobot kriteria:", err);
        setIsTotalValid(false); // fallback: anggap invalid
      }
    };

    fetchTotalBobot();
  }, []);

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
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdminOrKepalaDesa =
    user?.role === "ADMIN" || user?.role === "KEPALA_DESA";

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

            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold 
                ${
                  totalBobot === 100
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              Total Bobot: {totalBobot}%
            </div>

            {/* 🔐 Tampilkan hanya jika role ADMIN / KEPALA_DESA */}
            {/* Tambah Kriteria */}
            {isAdminOrKepalaDesa && (
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50`}
                onClick={() => setIsModalOpen(true)}
                disabled={!isTotalValid} // ❗️disable jika sudah 100%
                title={!isTotalValid ? "Total bobot sudah 100%" : ""}
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
