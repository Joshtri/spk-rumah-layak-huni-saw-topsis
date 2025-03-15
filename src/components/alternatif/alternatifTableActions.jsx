import AlternatifEditModal from "./alternatifEditModal";
import { useState } from "react";

export default function AlternatifTableActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <AlternatifEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        nama={"Setron Dalla"}
        periode={"periode 1"}
      />
      <div className="flex justify-center">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Hapus</button>
      </div>
    </>
  );
}
