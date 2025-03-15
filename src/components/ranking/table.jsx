import { Table } from "flowbite-react";

export default function RankingTable() {
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
          <Table.HeadCell className="w-[30%] text-center">Peringkat</Table.HeadCell>
          <Table.HeadCell className="w-[70%] text-center">Nama</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            <Table.Cell className="font-medium text-gray-900 text-center">1</Table.Cell>
            <Table.Cell className="text-gray-900 text-center">Setron Dalla</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
