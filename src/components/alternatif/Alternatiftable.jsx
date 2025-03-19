import { Table, Spinner } from "flowbite-react";
import AlternatifTableActions from "./AlternatifTableActions";
import { useAlternatif } from "@/hooks/useAlternatif"; // Import hooks

export default function AlternatifTable() {
  const { alternatif, loading } = useAlternatif(); // Ambil data dari hook

  return (
    <div className="overflow-x-auto rounded-lg shadow">
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
          <Table.HeadCell className="w-[10%] text-center">Id</Table.HeadCell>
          <Table.HeadCell className="w-[20%] text-center">Nama Alternatif</Table.HeadCell>
          <Table.HeadCell className="w-[20%] text-center">Periode</Table.HeadCell>
          <Table.HeadCell className="w-[50%] text-center">Aksi</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center py-4">
                <Spinner size="lg" /> {/* Loading spinner */}
              </Table.Cell>
            </Table.Row>
          ) : alternatif.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center py-4 text-gray-500">
                Tidak ada data alternatif
              </Table.Cell>
            </Table.Row>
          ) : (
            alternatif.map((item) => (
              <Table.Row key={item.id} className="bg-white">
                <Table.Cell className="font-medium text-gray-900 text-center">{item.id}</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 text-center">{item.nama_alternatif}</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 text-center">{item.periode}</Table.Cell>
                <Table.Cell className="font-medium text-gray-900 text-center">
                  <AlternatifTableActions id={item.id} />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
