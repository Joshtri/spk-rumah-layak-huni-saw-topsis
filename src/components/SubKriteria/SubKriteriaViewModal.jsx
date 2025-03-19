import { Modal, Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useKriteria } from "../../hooks/useKriteria"; // 🔥 Import hooks

export default function SubKriteriaViewModal({ isOpen, onClose, idKriteria }) {
  const { getSubKriteriaByKriteria } = useKriteria(); // 🔥 Fetch subkriteria
  const [subKriteriaList, setSubKriteriaList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data subkriteria saat modal dibuka
  useEffect(() => {
    const fetchSubKriteria = async () => {
      if (isOpen) {
        setLoading(true);
        try {
          const data = await getSubKriteriaByKriteria(idKriteria);
          setSubKriteriaList(data);
        } catch (error) {
          console.error("Error fetching subkriteria:", error);
        }
        setLoading(false);
      }
    };
    fetchSubKriteria();
  }, [isOpen, idKriteria]);

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
    >
      <div className="p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold text-center">Daftar Subkriteria</h3>
      </div>
      <Modal.Body>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner size="lg" />
            </div>
          ) : subKriteriaList.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada subkriteria untuk kriteria ini.</p>
          ) : (
            <Table striped>
              <Table.Head>
                <Table.HeadCell className="text-center">ID</Table.HeadCell>
                <Table.HeadCell className="text-center">Nama Subkriteria</Table.HeadCell>
                <Table.HeadCell className="text-center">Bobot</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {subKriteriaList.map((sub) => (
                  <Table.Row
                    key={sub.id_subkriteria}
                    className="bg-white"
                  >
                    <Table.Cell className="text-center">{sub.id_subkriteria}</Table.Cell>
                    <Table.Cell className="text-center">{sub.nama_sub_kriteria}</Table.Cell>
                    <Table.Cell className="text-center">{sub.bobot_sub_kriteria}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-center">
        <Button
          onClick={onClose}
          className="bg-gray-500 text-white"
        >
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
