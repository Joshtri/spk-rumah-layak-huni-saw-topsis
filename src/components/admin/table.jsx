import { useUsers } from "@/hooks/useUser"; // Import hooks user
import { Table } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import AdminTableActions from "./actionCell";

export default function AdminTable() {
  const { users, loading, fetchUsers, removeUser } = useUsers(); // Ambil data dari hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

      {/* Modal Input User */}

      {loading ? (
        <p className="text-center p-4">Loading...</p>
      ) : (
        <Table striped className="min-w-full whitespace-nowrap overflow-hidden">
          <Table.Head>
            <Table.HeadCell className="w-[40%] text-center">
              Username
            </Table.HeadCell>
            <Table.HeadCell className="w-[60%] text-center">
              Aksi
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.length > 0 ? (
              users.map((user) => (
                <Table.Row key={user.id} className="bg-white">
                  <Table.Cell className="font-medium text-gray-900 text-center">
                    {user.username}
                  </Table.Cell>
                  <Table.Cell className="text-center space-x-2">
                    <AdminTableActions
                      username={user.username}
                      role={user.role}
                      onEdit={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      onDelete={() => handleDelete(user.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="2" className="text-center py-4">
                  Tidak ada data user.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
