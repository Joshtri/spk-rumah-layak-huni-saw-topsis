import SubCriteriaEditModal from "./subKriteriaEditModal";
import { useState } from "react";

export default function SubCriteriaTableActions({ idCriteria, title, bobot }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <SubCriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={title}
        criteriaBobot={bobot}
        idCriteria={idCriteria}
      />
      <div className="flex items-center justify-center space-x-2">
        <button
          className="min-w-[4rem] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
        <button className="min-w-[4rem] bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">
          Hapus
        </button>
      </div>
    </>
  );
}
