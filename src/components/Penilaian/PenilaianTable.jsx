import { Table, Spinner, Button } from "flowbite-react";
import { usePenilaianContext as usePenilaian } from "../../contexts/penilaianContext";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import Paginations from "../ui/Pagination";
import { toast } from "sonner";

export default function PenilaianTable() {
  const { penilaian, loading, fetchPenilaian, removePenilaianByAlternatif } =
    usePenilaian();
  const { kriteria, loading: kriteriaLoading, fetchKriteria } = useKriteria();
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredData, setFilteredData] = useState({});

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    Object.keys(filteredData).length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = Object.fromEntries(
    Object.entries(filteredData).slice(startIndex, endIndex)
  );

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    fetchPenilaian();
    fetchKriteria();
  }, [location.pathname]);

  const groupedPenilaian = {};
  penilaian?.forEach((item) => {
    if (
      !item?.alternatif ||
      !item?.kriteriaId ||
      !item?.subKriteria
    ) {
      console.warn("❗ Penilaian item tidak lengkap:", item);
      return;
    }
  
    const alternatifId = item.alternatif.id_alternatif;
  
    if (!groupedPenilaian[alternatifId]) {
      groupedPenilaian[alternatifId] = {
        nama_alternatif: item.alternatif.nama_alternatif,
        penilaian: {},
        id_penilaian: item.id_penilaian,
        periodeId: item.periodeId,
      };
    }
  
    groupedPenilaian[alternatifId].penilaian[item.kriteriaId] = {
      nama: item.subKriteria.nama_sub_kriteria,
      bobot: item.subKriteria.bobot_sub_kriteria,
      id_penilaian: item.id_penilaian,
    };
  });
  

  useEffect(() => {
    setFilteredData(groupedPenilaian);
  }, [penilaian]);

  const handleSearch = (query) => {
    const searchQuery = query.trim();
    if (searchQuery === "") {
      setFilteredData(groupedPenilaian);
    } else {
      const filtered = Object.fromEntries(
        Object.entries(groupedPenilaian).filter(([_, value]) =>
          value.nama_alternatif
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  };

  if (loading || kriteriaLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!penilaian || !Array.isArray(penilaian)) {
    return (
      <div className="text-center text-gray-500 p-6">
        Memuat data penilaian...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="mr-auto">
          <SearchBar onSearch={handleSearch} placeholder="Cari Alternatif" />
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/penilaian/create")}
        >
          + Tambah Penilaian
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow p-4">
        <Table striped className="min-w-full whitespace-nowrap overflow-hidden">
          <Table.Head>
            <Table.HeadCell className="text-center">No</Table.HeadCell>
            <Table.HeadCell className="text-center">Nama (A)</Table.HeadCell>
            {kriteriaLoading ? (
              <Table.HeadCell colSpan={9} className="text-center">
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
            {Object.entries(currentData).map(([alternatifId, item], index) => {
              const penilaianSample = Object.values(item.penilaian)[0];
              const id_penilaian = penilaianSample?.id_penilaian;

              return (
                <Table.Row key={id_penilaian} className="bg-white">
                  <Table.Cell className="text-center">
                    {startIndex + index + 1}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {item.nama_alternatif}
                  </Table.Cell>
                  {kriteria.map((krit) => {
                    const subKriteria = item.penilaian[krit.id_kriteria];
                    return (
                      <Table.Cell
                        key={krit.id_kriteria}
                        className="text-center"
                      >
                        {subKriteria
                          ? `${subKriteria.nama} (${subKriteria.bobot})`
                          : "-"}
                      </Table.Cell>
                    );
                  })}
                  <Table.Cell className="text-center space-x-2">
                    <Button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded inline-flex"
                      onClick={() => {
                        if (!id_penilaian) {
                          toast.error("Gagal menemukan ID penilaian.");
                          return;
                        }

                        navigate(`/penilaian/edit/${id_penilaian}`, {
                          state: {
                            alternatifName: item.nama_alternatif,
                            currentPenilaian: item.penilaian,
                            alternatifId,
                            periodeId: item.periodeId,
                          },
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded inline-flex"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Yakin ingin menghapus semua penilaian untuk alternatif "${item.nama_alternatif}"?`
                          )
                        ) {
                          removePenilaianByAlternatif(alternatifId);
                        }
                      }}
                    >
                      Hapus
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
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
