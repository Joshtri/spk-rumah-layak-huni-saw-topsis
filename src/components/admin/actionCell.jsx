import AdminEditModal from "./editModal";
import { useState } from "react";

export default function AdminTableActions({ username, password }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AdminEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        username={username}
        password={password}
      />
      <div className="flex justify-center gap-2">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Hapus</button>
      </div>
    </>
  );
}
