import AlternatifEditModal from "./AlternatifEditModal";
import AlternatifPeriodeModal from "../AlternatifPeriode/AlternatifPeriodeModal";
import { useState } from "react";

export default function AlternatifTableActions({ idAlternatif, hasPeriode }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPeriodeModalOpen, setIsPeriodeModalOpen] = useState(false);

  const role = localStorage.getItem("role");
  const isReadonly = role === "KEPALA_DESA"; // 🔐 hanya lihat

  return (
    <>
      {/* Modal Edit Alternatif */}
      <AlternatifEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Modal Daftar ke Periode */}
      <AlternatifPeriodeModal
        isOpen={isPeriodeModalOpen}
        onClose={() => setIsPeriodeModalOpen(false)}
        idAlternatif={idAlternatif}
      />

      <div className="flex justify-center gap-2">
        {isReadonly ? (
          <p className="text-gray-500">-</p> // 🔒 Tidak boleh aksi
        ) : (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditModalOpen(true)}
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
            >
              Hapus
            </button>
          </>
        )}
      </div>
    </>
  );
}
