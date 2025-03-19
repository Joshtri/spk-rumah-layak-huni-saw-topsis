import LayoutRoot from "@/pages/layout";
import AlternatifTable from "../../components/alternatif/AlternatifTable";
import AlternatifInputModal from "@/components/alternatif/AlternatifInputModal";
import PageTitle from "@/components/pageTitle";

import { useState } from "react";

export default function AlternatifList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <LayoutRoot>
      <PageTitle title="Alternatif" />
      <AlternatifInputModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
      <div className="grid grid-rows-[auto_1fr] h-full gap-4">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Tambah Alternatif
          </button>
        </div>

        <AlternatifTable />
      </div>
    </LayoutRoot>
  );
}
