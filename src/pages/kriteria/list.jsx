import CriteriaInputModal from "@/components/kriteria/criteriaInputModal";
import CriteriaTable from "@/components/kriteria/criteriaTable";
import LayoutRoot from "../layout";
import PageTitle from "@/components/pageTitle";

import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function KriteriaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CriteriaInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <LayoutRoot>
        <PageTitle title="Kriteria" />
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
              <NavLink to={"/sub-kriteria"}>View Subkriteria</NavLink>
            </button>
          </div>

          {/* criteria table */}

          <CriteriaTable />
        </div>
      </LayoutRoot>
    </>
  );
}
