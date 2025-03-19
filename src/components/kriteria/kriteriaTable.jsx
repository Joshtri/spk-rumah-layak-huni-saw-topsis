import { useKriteria } from "@/hooks/useKriteria"; // Import custom hook
import { Table } from "flowbite-react";
import KriteriaTableActions from "./kriteriaTableActions";
import LoadingSpinner from "@/components/ui/Spinner"; // Import komponen spinner

export default function KriteriaTable() {
  const { kriteria, loading } = useKriteria(); // Ambil data dari custom hook

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table
          striped
          className="min-w-full whitespace-nowrap overflow-hidden"
          theme={{
            head: {
              base: "group/head bg-gray-50",
              cell: {
                base: "px-6 py-3 text-gray-900",
              },
            },
          }}
        >
          <Table.Head>
            <Table.HeadCell className="w-[40%] text-center">Nama Kriteria</Table.HeadCell>
            <Table.HeadCell className="w-[20%] text-center">Bobot</Table.HeadCell>
            <Table.HeadCell className="w-[20%] text-center">Tipe Kriteria</Table.HeadCell>
            <Table.HeadCell className="w-[40%] text-center">Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {kriteria.length > 0 ? (
              kriteria.map((item) => (
                <Table.Row key={item.id} className="bg-white">
                  <Table.Cell className="font-medium text-gray-900 text-center">
                    {item.nama_kriteria}
                  </Table.Cell>
                  <Table.Cell className="text-center">{item.bobot_kriteria}%</Table.Cell>
                  <Table.Cell className="text-center">{item.tipe_kriteria}</Table.Cell>
                  <Table.Cell>
                    <KriteriaTableActions idKriteria={item.id_kriteria} />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="3" className="text-center py-4">
                  Tidak ada data kriteria.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
