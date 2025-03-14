import CriteriaEditModal from "./criteriaEditModal";
import SubCriteriaInputModal from "../subCriteriaComponents/subCriteriaInputModal";
import { useState } from "react";

export default function CriteriaTableActions({ idCriteria, title, bobot }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCriteriaModalOpen, setIsSubCriteriaModalOpen] = useState(false);
  return (
    <>
      <CriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={title}
        criteriaBobot={bobot}
      />

      <SubCriteriaInputModal
        isOpen={isSubCriteriaModalOpen}
        onClose={() => {
          setIsSubCriteriaModalOpen(false);
        }}
        idCriteria={idCriteria}
      />

      <div className="flex gap-2 justify-center">
        <button
          className="min-w-[4rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
        <button className="min-w-[4rem] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
          Hapus
        </button>
        <button
          className="min-w-[6rem] bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsSubCriteriaModalOpen(true)}
        >
          Tambah Subkriteria
        </button>
      </div>
    </>
  );
}
