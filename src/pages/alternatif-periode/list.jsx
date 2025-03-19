import AlternatifPeriodeTable from "@/components/alternatif-periode/AlternatifPeriodeTable";
import AlternatifPeriodeInputModal from "@/components/alternatif-periode/AlternatifPeriodeInputModal";
import LayoutRoot from "../layout";
import PageTitle from "@/components/pageTitle";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AlternatifPeriodeList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Modal Tambah Alternatif ke Periode */}
      <AlternatifPeriodeInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <LayoutRoot>
        <PageTitle title="Alternatif dalam Periode" />
        <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
          {/* Tombol Tambah Alternatif ke Periode & Lihat Periode */}
          <div className="flex justify-end items-center h-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Tambah Alternatif ke Periode
            </button>

            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-4">
              <NavLink to={"/periode"}>View Periode</NavLink>
            </button>
          </div>

          {/* Tabel Alternatif dalam Periode */}
          <AlternatifPeriodeTable  />
        </div>
      </LayoutRoot>
    </>
  );
}
