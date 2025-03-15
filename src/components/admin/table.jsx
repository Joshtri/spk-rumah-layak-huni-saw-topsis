import { Table } from "flowbite-react";
import AdminTableActions from "./actionCell";

export default function AdminTable() {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table
        striped
        className="min-w-full whitespace-nowrap overflow-hidden"
        theme={{
          head: {
            base: "group/head bg-gray-50",
            cell: {
              base: "px-6 py-3 text-gray-900",
            },
          },
        }}
      >
        <Table.Head>
          <Table.HeadCell className="w-[40%] text-center">Username</Table.HeadCell>

          <Table.HeadCell className="w-[60%] text-center">Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            <Table.Cell className="font-medium text-gray-900 text-center">admin1</Table.Cell>

            <Table.Cell>
              <AdminTableActions
                username="admin1"
                role="Super Admin"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
