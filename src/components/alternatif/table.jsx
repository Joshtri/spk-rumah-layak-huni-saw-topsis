import { Table } from "flowbite-react";
import AlternatifTableActions from "./actionCell";

export default function AlternativeTable() {
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
          <Table.HeadCell className="w-[10%] text-center">Id</Table.HeadCell>

          <Table.HeadCell className="w-[20%] text-center">Nama ALternatif</Table.HeadCell>

          <Table.HeadCell className="w-[20%] text-center">Periode</Table.HeadCell>
          <Table.HeadCell className="w-[50%] text-center">Aksi</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            <Table.Cell className="font-medium text-gray-900 text-center">1</Table.Cell>

            <Table.Cell className="font-medium text-gray-900 text-center">Setron Dalla</Table.Cell>
            <Table.Cell className="font-medium text-gray-900 text-center">periode 1</Table.Cell>
            <Table.Cell className="font-medium text-gray-900 text-center">
              <AlternatifTableActions />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
