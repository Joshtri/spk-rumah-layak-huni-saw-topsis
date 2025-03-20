import UserEditModal from "./UserEditModal";
import { useState } from "react";
import { Button } from "flowbite-react";

export default function UserTableActions({ user, onDelete, refresh }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UserEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        refresh={refresh}
      />
      <div className="flex justify-center gap-2">
        <Button className="bg-yellow-500 text-white" onClick={() => setIsModalOpen(true)}>Edit</Button>
        <Button className="bg-red-500 text-white" onClick={onDelete}>Hapus</Button>
      </div>
    </>
  );
}
