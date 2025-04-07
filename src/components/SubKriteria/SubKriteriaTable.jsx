import { useSubKriteriaContext as useSubKriteria } from "../../contexts/subKriteriaContext";
import { Table, Button } from "flowbite-react";
import SubCriteriaTableActions from "./SubKriteriaTableActions";
import { useState, useEffect } from "react";
import SubKriteriaInputModal from "./SubKriteriaInputModal";
import SearchBar from "../ui/SearchBar";
import Paginations from "../ui/Pagination";
import { toast } from "sonner";

export default function SubCriteriaTable() {
  const { subKriteria, loading, fetchSubKriteria, removeSubKriteria } =
    useSubKriteria();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubKriteria, setSelectedSubKriteria] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // pagination function
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    setFilteredData(subKriteria);
    console.log(subKriteria);
  }, [subKriteria]);

  useEffect(() => {
    console.log("filtered data:", filteredData);
  }, [filteredData]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(subKriteria);
    } else {
      const filtered = subKriteria.filter((item) => {
        // Search in both kriteria name and sub-kriteria name
        return (
          item.kriteria?.nama_kriteria
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.nama_sub_kriteria
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
      setFilteredData(filtered);
    }
  };

  console.log("SubKriteria yang akan dirender:", currentData);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus sub kriteria ini?"
    );
    if (!confirmed) return;

    try {
      await removeSubKriteria(id);
      await fetchSubKriteria(); // ✅ Refetch setelah hapus
      toast.success("Sub kriteria berhasil dihapus!");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus sub kriteria!");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdminOrKepalaDesa =
    user?.role === "ADMIN" || user?.role === "KEPALA_DESA";

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4">
      <div className="flex justify-end items-center w-full mb-4">
        {/* SeachBar */}
        <div className="mr-auto">
          <SearchBar onSearch={handleSearch} placeholder="Cari Sub Kriteria" />
        </div>
        {/* Tombol Tambah Sub Kriteria */}

        {isAdminOrKepalaDesa && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white"
          >
            + Tambah Sub Kriteria
          </Button>
        )}
      </div>

      {/* Modal Input Sub Kriteria */}
      <SubKriteriaInputModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubKriteria(null);
        }}
        subKriteriaData={selectedSubKriteria}
        refreshSubKriteria={fetchSubKriteria}
      />

      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : (
        <>
          <Table
            striped
            className="min-w-full whitespace-nowrap overflow-hidden"
          >
            <Table.Head>
              <Table.HeadCell className="w-[25%] text-center">
                Kriteria
              </Table.HeadCell>
              <Table.HeadCell className="w-[25%] text-center">
                Sub Kriteria
              </Table.HeadCell>
              <Table.HeadCell className="w-[20%] text-center">
                Bobot
              </Table.HeadCell>
              <Table.HeadCell className="w-[30%] text-center">
                Aksi
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <Table.Row
                    key={item.id || item.id_sub_kriteria}
                    className="bg-white"
                  >
                    <Table.Cell className="font-medium text-gray-900 text-center">
                      {item.kriteria?.nama_kriteria}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 text-center">
                      {item.nama_sub_kriteria}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {item.bobot_sub_kriteria}
                    </Table.Cell>
                    <Table.Cell className="text-center space-x-2">
                      <SubCriteriaTableActions
                        idCriteria={item.kriteria_id}
                        subCriteriaId={item.id_sub_kriteria}
                        title={item.nama_sub_kriteria}
                        bobot={item.bobot_sub_kriteria}
                        onEdit={() => {
                          setSelectedSubKriteria(item);
                          setIsModalOpen(true);
                        }}
                        onDelete={() => handleDelete(item.id_sub_kriteria)} // ✅ Tambahkan ini
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="4" className="text-center py-4">
                    Tidak ada data sub kriteria.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>

          {/* Add pagination component */}
          <div className="mt-4">
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}
