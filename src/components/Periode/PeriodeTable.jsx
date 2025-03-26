import { Table, Spinner, Button } from "flowbite-react";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { toast } from "sonner";
import { useState } from "react";
import PeriodeInputModal from "./PeriodeInputModal";

export default function PeriodeTable({ periode, loading }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPeriode, setSelectedPeriode] = useState(null);
  const { removePeriode } = usePeriodeContext();

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah anda yakin ingin menghapus periode ini?")) {
      return;
    }

    try {
      await removePeriode(id);
      toast.success("Periode berhasil dihapus!");
    } catch (error) {
      console.error("Failed to delete periode:", error);
      toast.error("Gagal menghapus periode!");
    }
  };

  const handleEdit = (periode) => {
    setSelectedPeriode(periode);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <PeriodeInputModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPeriode(null);
        }}
        initialData={selectedPeriode}
        isEdit={true}
      />

      <div className="overflow-x-auto rounded-lg shadow">
        <Table
          striped
          className="min-w-full whitespace-nowrap overflow-hidden"
        >
          <Table.Head>
            <Table.HeadCell className="text-center">No</Table.HeadCell>
            <Table.HeadCell className="text-center">Nama Periode</Table.HeadCell>
            <Table.HeadCell className="text-center">Tanggal Mulai</Table.HeadCell>
            <Table.HeadCell className="text-center">Tanggal Selesai</Table.HeadCell>
            <Table.HeadCell className="text-center">Aksi</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {loading ? (
              <Table.Row>
                <Table.Cell
                  colSpan={5}
                  className="text-center py-4"
                >
                  <Spinner size="lg" />
                </Table.Cell>
              </Table.Row>
            ) : periode.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  Tidak ada data periode
                </Table.Cell>
              </Table.Row>
            ) : (
              periode.map((item, index) => (
                <Table.Row
                  key={item.id_periode}
                  className="bg-white"
                >
                  <Table.Cell className="text-center">{index + 1}</Table.Cell>
                  <Table.Cell className="text-center">{item.nama_periode}</Table.Cell>
                  <Table.Cell className="text-center">{new Date(item.tanggal_mulai).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-center">{new Date(item.tanggal_selesai).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleDelete(item.id_periode)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
