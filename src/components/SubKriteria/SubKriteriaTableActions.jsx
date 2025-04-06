import SubCriteriaEditModal from "./SubKriteriaEditModal";
import { useState } from "react";

export default function SubCriteriaTableActions({ idCriteria, subCriteriaId, title, bobot, refreshSubKriteria }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdminOrKepalaDesa = user?.role === "ADMIN" || user?.role === "KEPALA_DESA";
  return (
    <>
      <SubCriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        subCriteriaBobot={bobot}
        idCriteria={idCriteria}
        subCriteriaId={subCriteriaId}
        refreshSubKriteria={refreshSubKriteria} // Pass the refresh function
      />
      <div className="flex items-center justify-center space-x-2">
        {isAdminOrKepalaDesa ? (
          <>
            <button
              className="min-w-[4rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <button className="min-w-[4rem] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
              Hapus
            </button>
          </>
        ) : (
          <p>-</p>
        )}
      </div>
    </>
  );
}
