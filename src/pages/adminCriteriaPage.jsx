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
          {/* add criteria & view button */}
          <div className="flex justify-end items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Kriteria
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              View Kriteria
            </button>
          </div>

          {/* criteria table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
