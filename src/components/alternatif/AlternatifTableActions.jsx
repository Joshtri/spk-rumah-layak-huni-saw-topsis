import AlternatifEditModal from "./AlternatifEditModal";
import AlternatifPeriodeModal from "@/components/alternatif-periode/AlternatifPeriodeModal"; // 🔥 Import Modal Periode
import { useState } from "react";

export default function AlternatifTableActions({ idAlternatif, hasPeriode }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPeriodeModalOpen, setIsPeriodeModalOpen] = useState(false);

  return (
    <>
      {/* Modal Edit Alternatif */}
      <AlternatifEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Modal Daftar Alternatif ke Periode */}
      <AlternatifPeriodeModal
        isOpen={isPeriodeModalOpen}
        onClose={() => setIsPeriodeModalOpen(false)}
        idAlternatif={idAlternatif} // 🔥 Kirim ID Alternatif ke modal
      />

      <div className="flex justify-center gap-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>

        {/* Sembunyikan tombol Daftarkan ke Periode jika sudah terdaftar */}
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
      </div>
    </>
  );
}
