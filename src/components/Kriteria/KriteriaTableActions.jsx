import KriteriaEditModal from "./KriteriaEditModal";
import SubKriteriaInputModal from "../SubKriteria/SubKriteriaInputModal";
import SubKriteriaViewModal from "../SubKriteria/SubKriteriaViewModal";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { toast } from "sonner";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";

export default function KriteriaTableActions({ idKriteria }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubKriteriaModalOpen, setIsSubKriteriaModalOpen] = useState(false);
  const [isSubKriteriaViewModalOpen, setIsSubKriteriaViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [kriteriaData, setKriteriaData] = useState(null);

  const { removeKriteria, kriteria: allKriteria } = useKriteria();

  const handleEdit = () => {
    const found = allKriteria.find((k) => k.id === idKriteria);
    if (!found) {
      toast.error("Data kriteria tidak ditemukan");
      return;
    }
    setKriteriaData(found); // ✅ set data dulu
    setIsModalOpen(true);   // ✅ baru buka modal
  };

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

  const role = localStorage.getItem("role");
  const isAdminOrKepalaDesa = role === "ADMIN" || role === "KEPALA_DESA";

  return (
    <>
      {/* Modal Edit Kriteria */}
      <KriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        kriteria={kriteriaData}
      />

      {/* Modal Tambah Subkriteria */}
      <SubKriteriaInputModal
        isOpen={isSubKriteriaModalOpen}
        onClose={() => setIsSubKriteriaModalOpen(false)}
        idKriteria={idKriteria}
      />

      {/* Modal Lihat Subkriteria */}
      <SubKriteriaViewModal
        isOpen={isSubKriteriaViewModalOpen}
        onClose={() => setIsSubKriteriaViewModalOpen(false)}
        idKriteria={idKriteria}
      />

      {/* Modal Konfirmasi Hapus */}
      <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Modal.Body>
          <div className="text-center p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Apakah kamu yakin ingin menghapus kriteria ini?
            </h3>
            <p className="text-gray-600 mt-2">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white"
          >
            Hapus
          </Button>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white"
          >
            Batal
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tombol Aksi */}
      <div className="flex gap-2 justify-center">
        {isAdminOrKepalaDesa && (
          <>
            <button
              className="min-w-[4rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
              onClick={handleEdit} // ✅ ubah dari langsung buka modal
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
          </>
        )}
        <button
          className="min-w-[6rem] bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsSubKriteriaViewModalOpen(true)}
        >
          Lihat Subkriteria
        </button>
      </div>
    </>
  );
}
