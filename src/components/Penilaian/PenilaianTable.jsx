import { Table, Spinner, Button } from "flowbite-react";
import { usePenilaian } from "../../hooks/usePenilaian";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 Import useNavigate

export default function PenilaianTable() {
  const { penilaian, loading, fetchPenilaian, removePenilaian } =
    usePenilaian();
  const navigate = useNavigate(); // 🔥 Untuk navigasi ke halaman tambah

  useEffect(() => {
    fetchPenilaian();
  }, []);

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4">
      {/* 🔥 Tombol Tambah Penilaian */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Daftar Penilaian</h2>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/penilaian/create")} // 🔥 Navigasi ke halaman tambah
        >
          Tambah Penilaian
        </Button>
      </div>

      {/* Tabel Penilaian */}
      <Table striped className="min-w-full whitespace-nowrap overflow-hidden">
        <Table.Head>
          <Table.HeadCell className="text-center">Alternatif</Table.HeadCell>
          <Table.HeadCell className="text-center">Kriteria</Table.HeadCell>
          <Table.HeadCell className="text-center">Sub Kriteria</Table.HeadCell>
          <Table.HeadCell className="text-center">Nilai</Table.HeadCell>
          <Table.HeadCell className="text-center">Aksi</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="text-center py-4">
                <Spinner size="lg" />
              </Table.Cell>
            </Table.Row>
          ) : penilaian.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={5}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data penilaian
              </Table.Cell>
            </Table.Row>
          ) : (
            penilaian.map((item) => (
              <Table.Row key={item.id_penilaian} className="bg-white">
                <Table.Cell className="text-center">
                  {item.alternatif.nama_alternatif}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {item.subKriteria.kriteria.nama_kriteria}
                </Table.Cell>
                <Table.Cell className="text-center">
                  {item.subKriteria.nama_sub_kriteria}
                </Table.Cell>
                <Table.Cell className="text-center">{item.nilai}</Table.Cell>
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
  );
}
