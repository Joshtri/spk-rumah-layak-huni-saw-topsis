import { Table } from "flowbite-react";
import SubCriteriaTableActions from "./subCriteriaTableActions";

export default function SubCriteriaTable() {
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
          <Table.HeadCell className="w-[25%] text-center">Kriteria</Table.HeadCell>
          <Table.HeadCell className="w-[25%] text-center">Sub Kriteria</Table.HeadCell>
          <Table.HeadCell className="w-[20%] text-center">Bobot</Table.HeadCell>
          <Table.HeadCell className="w-[30%] text-center">Aksi</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            <Table.Cell className="font-medium text-gray-900 text-center">Jenis Dinding</Table.Cell>
            <Table.Cell className="font-medium text-gray-900 text-center">Permanen</Table.Cell>
            <Table.Cell className="text-center">1</Table.Cell>
            <Table.Cell>
              <SubCriteriaTableActions
                idCriteria={1}
                title="Permanen"
                bobot="1"
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
