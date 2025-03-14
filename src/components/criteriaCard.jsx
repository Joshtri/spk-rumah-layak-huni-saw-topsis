import { Card, Button } from "flowbite-react";
import CriteriaEditModal from "./criteriaEditModal";
import { useState } from "react";

export default function CriteriaCard({ title, bobot }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CriteriaEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        criteriaBobot={bobot}
      />

      <Card
        className="w-full"
        theme={{
          root: {
            base: "bg-white border border-gray-200 rounded-lg shadow transition-shadow duration-500 hover:shadow-md hover:shadow-stone-500 dark:bg-white dark:border-gray-700",
          },
        }}
      >
        <div className="grid grid-cols-[1fr_3fr] gap-4">
          {/* criteria info */}
          <div className="w-full">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-stone-800">Bobot: {bobot}</p>
          </div>

          {/* criteria actions */}
          <div className="lg:ml-8 flex items-center justify-end">
            <Button
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </Button>
            <Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded-md ml-2">Hapus</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-sm py-2 rounded-md ml-2">
              Tambah Kriteria
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
