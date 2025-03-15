import LayoutRoot from "../layout";
import AdminTable from "../../components/admin/adminTable";
import AdminInputModal from "@/components/admin/adminInputModal";
import { useState } from "react";

export default function AdminCrud() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <LayoutRoot>
      <AdminInputModal
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
            Tambah Admin
          </button>
        </div>

        <AdminTable />
      </div>
    </LayoutRoot>
  );
}
