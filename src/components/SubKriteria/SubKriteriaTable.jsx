import { useSubKriteria } from "../../hooks/useSubKriteria"; // Import hooks sub kriteria
import { Table, Button } from "flowbite-react";
import SubCriteriaTableActions from "./SubKriteriaTableActions";
import { useState } from "react";
import SubKriteriaInputModal from "./SubKriteriaInputModal"; // Modal tambah/edit sub-kriteria
import { toast } from "sonner";

export default function SubCriteriaTable() {
  const { subKriteria, loading, fetchSubKriteria, removeSubKriteria } = useSubKriteria();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubKriteria, setSelectedSubKriteria] = useState(null);

  const handleDelete = async (id) => {
    try {
      await removeSubKriteria(id);
      toast.success("Sub kriteria berhasil dihapus!");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus sub kriteria!");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4">
      {/* Tombol Tambah Sub Kriteria */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white"
      >
        + Tambah Sub Kriteria
      </Button>

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
        <Table
          striped
          className="min-w-full whitespace-nowrap overflow-hidden"
        >
          <Table.Head>
            <Table.HeadCell className="w-[25%] text-center">Kriteria</Table.HeadCell>
            <Table.HeadCell className="w-[25%] text-center">Sub Kriteria</Table.HeadCell>
            <Table.HeadCell className="w-[20%] text-center">Bobot</Table.HeadCell>
            <Table.HeadCell className="w-[30%] text-center">Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {subKriteria.length > 0 ? (
              subKriteria.map((item) => (
                <Table.Row
                  key={item.id}
                  className="bg-white"
                >
                  <Table.Cell className="font-medium text-gray-900 text-center">
                    {item.kriteria.nama_kriteria}
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 text-center">{item.nama_sub_kriteria}</Table.Cell>
                  <Table.Cell className="text-center">{item.bobot_sub_kriteria}</Table.Cell>
                  <Table.Cell className="text-center space-x-2">
                    <SubCriteriaTableActions
                      idCriteria={item.kriteria_id}
                      title={item.sub_kriteria_nama}
                      bobot={item.bobot_kriteria}
                      onEdit={() => {
                        setSelectedSubKriteria(item);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan="4"
                  className="text-center py-4"
                >
                  Tidak ada data sub kriteria.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
