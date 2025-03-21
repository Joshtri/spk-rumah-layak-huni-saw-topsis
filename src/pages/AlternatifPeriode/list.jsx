import AlternatifPeriodeTable from "../../components/AlternatifPeriode/AlternatifPeriodeTable";
import AlternatifPeriodeInputModal from "../../components/AlternatifPeriode/AlternatifPeriodeInputModal";
import Layout from "../Layout";
import PageTitle from "../../components/ui/PageTitle";
import SearchBar from "../../components/ui/SearchBar";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAlternatifPeriode } from "../../hooks/useAlternatifPeriode";

export default function AlternatifPeriodeList() {
  const { alternatifPeriode, loading } = useAlternatifPeriode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(alternatifPeriode);
  }, [alternatifPeriode]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(alternatifPeriode);
    } else {
      const filtered = alternatifPeriode.filter(
        (item) =>
          item.alternatif.nama_alternatif.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.periode.nama_periode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <AlternatifPeriodeInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Layout>
        <Breadcrumbs pathArray={["Home", "Alternatif Periode"]} />
        <PageTitle title="Alternatif Periode" />
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
          <div className="flex justify-end items-center h-full w-full">
            <div className="mr-auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder={"Cari Alternatif atau Periode"}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Alternatif ke Periode
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/periode"}>View Periode</NavLink>
            </button>
          </div>

          <AlternatifPeriodeTable
            alternatifPeriode={filteredData}
            loading={loading}
          />
        </div>
      </Layout>
    </>
  );
}
