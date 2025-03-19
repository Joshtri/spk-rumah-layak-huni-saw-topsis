import LayoutRoot from "../LayoutRoot";
import UserTable from "../../components/UsersManagement/UserTable";
import UserInputModal from "../../components/UsersManagement/UserInputModal";
import { useState } from "react";
import PageTitle from "../../components/PageTitle";

export default function UsersList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <LayoutRoot>
      <PageTitle title="Admin" />
      <UserInputModal
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

        <UserTable />
      </div>
    </LayoutRoot>
  );
}
