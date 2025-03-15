import LayoutRoot from "@/pages/layout";
import AlternativeTable from "../../components/alternatif/alternatifTable";
import AlternatifInputModal from "@/components/alternatif/alternatifInputModal";

import { useState } from "react";

export default function AlternatifList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <LayoutRoot>
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

        <AlternativeTable />
      </div>
    </LayoutRoot>
  );
}
