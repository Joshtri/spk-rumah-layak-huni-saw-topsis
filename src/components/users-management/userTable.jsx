import { useUsers } from "@/hooks/useUsers"; // 🔥 Import hooks user
import { Table, Button } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import UserTableActions from "./UserTableActions";
import UserInputModal from "./UserInputModal"; // 🔥 Import Modal Tambah User

export default function UserTable() {
  const { users, loading, fetchUsers, removeUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await removeUser(id);
      toast.success("User berhasil dihapus!");
    } catch (error) {
      toast.error("Gagal menghapus user!");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow p-4">
      {/* Tombol Tambah User */}
      <Button className="mb-4 bg-blue-500 text-white" onClick={() => setIsModalOpen(true)}>
        Tambah User
      </Button>

      {/* Modal Input User */}
      <UserInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refresh={fetchUsers} />

      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : (
        <Table striped className="min-w-full whitespace-nowrap overflow-hidden">
          <Table.Head>
            <Table.HeadCell className="w-[30%] text-center">Username</Table.HeadCell>
            <Table.HeadCell className="w-[30%] text-center">Email</Table.HeadCell>
            <Table.HeadCell className="w-[30%] text-center">Role</Table.HeadCell>
            <Table.HeadCell className="w-[10%] text-center">Aksi</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <Table.Row key={user.id_user} className="bg-white">
                  <Table.Cell className="text-center">{user.username}</Table.Cell>
                  <Table.Cell className="text-center">{user.email}</Table.Cell>
                  <Table.Cell className="text-center">{user.role}</Table.Cell>
                  <Table.Cell className="text-center">
                    <UserTableActions
                      user={user}
                      onDelete={() => handleDelete(user.id_user)}
                      refresh={fetchUsers}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" className="text-center py-4">Tidak ada data user.</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
