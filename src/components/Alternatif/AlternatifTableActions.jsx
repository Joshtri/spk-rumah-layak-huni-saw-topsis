import { useState } from "react";
import AlternatifEditModal from "./AlternatifEditModal";
import AlternatifPeriodeModal from "../AlternatifPeriode/AlternatifPeriodeModal";
import { useAlternatifContext } from "../../contexts/alternatifContext";
import { toast } from "sonner";

export default function AlternatifTableActions({ idAlternatif, hasPeriode }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPeriodeModalOpen, setIsPeriodeModalOpen] = useState(false);
  const [alternatifData, setAlternatifData] = useState(null);

  const { removeAlternatif, alternatif } = useAlternatifContext();

  const handleEdit = () => {
    const found = alternatif.find((a) => a.id_alternatif === idAlternatif);
    if (!found) {
      toast.error("Data alternatif tidak ditemukan");
      return;
    }
    setAlternatifData(found);
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Yakin ingin menghapus alternatif ini?");
    if (!confirmed) return;

    try {
      await removeAlternatif(idAlternatif);
      toast.success("Alternatif berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus alternatif!");
    }
  };

  const role = localStorage.getItem("role");
  const isReadonly = role === "KEPALA_DESA";

  return (
    <>
      <AlternatifEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        alternatif={alternatifData}
      />

      <AlternatifPeriodeModal
        isOpen={isPeriodeModalOpen}
        onClose={() => setIsPeriodeModalOpen(false)}
        idAlternatif={idAlternatif}
      />

      <div className="flex justify-center gap-2">
        {isReadonly ? (
          <p className="text-gray-500">-</p>
        ) : (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>

            {!hasPeriode && (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsPeriodeModalOpen(true)}
              >
                Daftarkan ke Periode
              </button>
            )}

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Hapus
            </button>
          </>
        )}
      </div>
    </>
  );
}
