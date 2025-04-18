import { Table } from "flowbite-react";
import { useState } from "react";
import Paginations from "../ui/Pagination";

export default function RankingTable({ rankings = [], disablePagination = false, showAllData = false }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rankings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayData = disablePagination || showAllData
    ? rankings
    : rankings.slice(startIndex, endIndex);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table
        id="ranking-table"
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
          <Table.HeadCell className="w-[20%] text-center">Peringkat</Table.HeadCell>
          <Table.HeadCell className="w-[50%] text-center">Nama</Table.HeadCell>
          <Table.HeadCell className="w-[30%] text-center">Nilai</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {displayData.map((ranking, index) => (
            <Table.Row key={index} className="bg-white">
              <Table.Cell className="text-center font-medium text-gray-900">
                {/* {startIndex + index + 1} */}
                {ranking.rangking}
              </Table.Cell>
              <Table.Cell className="text-center text-gray-900">
                {ranking.alternatif.nama_alternatif}
              </Table.Cell>
              <Table.Cell className="text-center text-gray-900">
                {ranking.nilai_akhir}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {!disablePagination && (
        <div className="mt-4">
          <Paginations
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
