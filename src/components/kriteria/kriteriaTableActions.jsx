import KriteriaEditModal from "./KriteriaEditModal";
import SubKriteriaInputModal from "../sub-kriteria/SubKriteriaInputModal";
import { useState, useEffect } from "react";
import { useKriteria } from "@/hooks/useKriteria"; // Import custom hook
import { Modal, Button } from "flowbite-react";
import { toast } from "sonner"; // Untuk notifikasi

export default function KriteriaTableActions({ idKriteria }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubKriteriaModalOpen, setIsSubKriteriaModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal konfirmasi hapus
  const [selectedKriteria, setSelectedKriteria] = useState(null);
  const { getKriteriaById, removeKriteria } = useKriteria(); // Tambahkan removeKriteria

  // Fetch data kriteria saat modal edit dibuka
  useEffect(() => {
    const fetchKriteria = async () => {
      if (isModalOpen) {
        try {
          const data = await getKriteriaById(idKriteria);
          setSelectedKriteria(data);
        } catch (error) {
          console.error("Error fetching kriteria:", error);
        }
      }
    };

    fetchKriteria();
  }, [isModalOpen, idKriteria]);

  // Fungsi hapus kriteria
  const handleDelete = async () => {
    try {
      await removeKriteria(idKriteria);
      toast.success("Kriteria berhasil dihapus!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus kriteria!");
      console.error("Error deleting kriteria:", error);
    }
  };

  return (
    <>
      {/* Modal Edit Kriteria */}
      <KriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kriteria={selectedKriteria}
      />

      {/* Modal Tambah Subkriteria */}
      <SubKriteriaInputModal
        isOpen={isSubKriteriaModalOpen}
        onClose={() => setIsSubKriteriaModalOpen(false)}
        idKriteria={idKriteria}
      />

      {/* Modal Konfirmasi Hapus */}
      <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Body>
          <div className="text-center p-4">
            <h3 className="text-lg font-semibold text-gray-900">Apakah kamu yakin ingin menghapus kriteria ini?</h3>
            <p className="text-gray-600 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white">
            Hapus
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white">
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tombol Aksi */}
      <div className="flex gap-2 justify-center">
        <button
          className="min-w-[4rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="min-w-[4rem] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Hapus
        </button>
        <button
          className="min-w-[6rem] bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsSubKriteriaModalOpen(true)}
        >
          Tambah Subkriteria
        </button>
      </div>
    </>
  );
}
