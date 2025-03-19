import PeriodeInputModal from "../../Components/Periode/periodeInputModal";
import PeriodeTable from "../../Components/Periode/periodeTable";
import LayoutRoot from "../LayoutRoot";
import PageTitle from "../../Components/PageTitle";

import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function PeriodeList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Modal Tambah Periode */}
      <PeriodeInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <LayoutRoot>
        <PageTitle title="Periode" />
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
          {/* Tombol Tambah Periode & View Alternatif */}
          <div className="flex justify-end items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Periode
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/alternatif"}>View Alternatif</NavLink>
            </button>
          </div>

          {/* Tabel Periode */}
          <PeriodeTable />
        </div>
      </LayoutRoot>
    </>
  );
}
