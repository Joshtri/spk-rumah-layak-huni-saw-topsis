import LayoutRoot from "./layout";
import CriteriaCard from "../components/criteriaCard";
import CriteriaInputModal from "../components/criteriaInputModal";

import { useState } from "react";

export default function AdminCriteriaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CriteriaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <LayoutRoot>
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
          {/* add criteria button */}
          <div className="flex justify-end items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Kriteria
            </button>
          </div>

          {/* criteria cards */}
          <div className={"grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"}>
            <CriteriaCard
              title={"Jenis Dinding"}
              bobot={50}
            />

            <CriteriaCard
              title={"Kondisi Dinding"}
              bobot={50}
            />
          </div>
        </div>
      </LayoutRoot>
    </>
  );
}
