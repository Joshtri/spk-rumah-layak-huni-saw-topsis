import { Table, Spinner, Button } from "flowbite-react";
import { usePenilaianContext as usePenilaian } from "../../contexts/penilaianContext";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import Paginations from "../ui/Pagination";

export default function PenilaianTable() {
  const { penilaian, loading, fetchPenilaian, removePenilaian } = usePenilaian();
  const { kriteria, loading: kriteriaLoading, fetchKriteria } = useKriteria();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState({});

  // Add pagination states
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Object.keys(filteredData).length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page data
  const currentData = Object.fromEntries(Object.entries(filteredData).slice(startIndex, endIndex));

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    fetchPenilaian();
    fetchKriteria();
  }, []);

  // Group data penilaian berdasarkan alternatifId
  const groupedPenilaian = {};
  penilaian.forEach((item) => {
    const alternatifId = item.alternatif.id_alternatif;
    if (!groupedPenilaian[alternatifId]) {
      groupedPenilaian[alternatifId] = {
        nama_alternatif: item.alternatif.nama_alternatif,
        penilaian: {},
        id_penilaian: item.id_penilaian, // Simpan satu id_penilaian untuk hapus data
      };
    }
    groupedPenilaian[alternatifId].penilaian[item.kriteriaId] = {
      nama: item.subKriteria.nama_sub_kriteria,
      bobot: item.subKriteria.bobot_sub_kriteria, // 🔥 Tambahkan bobot sub-kriteria
    };
  });

  useEffect(() => {
    setFilteredData(groupedPenilaian);
  }, [penilaian]);

  // Update handleSearch to reset pagination
  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(groupedPenilaian);
    } else {
      const filtered = Object.fromEntries(
        Object.entries(groupedPenilaian).filter(([_, value]) =>
          value.nama_alternatif.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="mr-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Cari Alternatif"
          />
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/penilaian/create")}
        >
          + Tambah Penilaian
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow p-4">
        <Table
          striped
          className="min-w-full whitespace-nowrap overflow-hidden"
        >
          <Table.Head>
            <Table.HeadCell className="text-center">No</Table.HeadCell>
            <Table.HeadCell className="text-center">Nama (A)</Table.HeadCell>
            {kriteriaLoading ? (
              <Table.HeadCell
                colSpan={9}
                className="text-center"
              >
                Loading Kriteria...
              </Table.HeadCell>
            ) : (
              kriteria.map((krit, index) => (
                <Table.HeadCell
                  key={krit.id_kriteria}
                  className="text-center"
                >
                  {krit.nama_kriteria} (C{index + 1})
                </Table.HeadCell>
              ))
            )}
            <Table.HeadCell className="text-center">Aksi</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {loading ? (
              <Table.Row>
                <Table.Cell
                  colSpan={12}
                  className="text-center py-4"
                >
                  <Spinner size="lg" />
                </Table.Cell>
              </Table.Row>
            ) : Object.keys(filteredData).length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={12}
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada data penilaian
                </Table.Cell>
              </Table.Row>
            ) : (
              Object.values(currentData).map((item, index) => (
                <Table.Row
                  key={item.id_penilaian}
                  className="bg-white"
                >
                  <Table.Cell className="text-center">{index + 1}</Table.Cell>
                  <Table.Cell className="text-center">{item.nama_alternatif}</Table.Cell>
                  {kriteria.map((krit) => {
                    const subKriteria = item.penilaian[krit.id_kriteria];
                    return (
                      <Table.Cell
                        key={krit.id_kriteria}
                        className="text-center"
                      >
                        {subKriteria ? `${subKriteria.nama} (${subKriteria.bobot})` : "-"}
                      </Table.Cell>
                    );
                  })}
                  <Table.Cell className="text-center">
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => removePenilaian(item.id_penilaian)}
                    >
                      Hapus
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      {/* Add pagination component */}
      <div className="mt-4">
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
