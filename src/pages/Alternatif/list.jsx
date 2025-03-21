import Layout from "../Layout";
import AlternatifTable from "../../components/Alternatif/AlternatifTable";
import AlternatifInputModal from "../../components/Alternatif/AlternatifInputModal";
import PageTitle from "../../components/ui/PageTitle";
import { useAlternatif } from "../../hooks/useAlternatif";
import SearchBar from "../../components/ui/SearchBar";
import { useState, useEffect } from "react";

export default function AlternatifList() {
  const { alternatif, loading } = useAlternatif();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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
  };

  return (
    <Layout>
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Tambah Alternatif
          </button>
        </div>

        <AlternatifTable
          alternatif={filteredData}
          loading={loading}
        />
      </div>
    </Layout>
  );
}
