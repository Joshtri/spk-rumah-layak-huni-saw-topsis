import { Table, Spinner } from "flowbite-react";

export default function AlternatifPeriodeTable({ alternatifPeriode, loading }) {
  console.log(alternatifPeriode);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table
        striped
        className="min-w-full whitespace-nowrap overflow-hidden"
      >
        <Table.Head>
          <Table.HeadCell className="w-[20%] text-center">ID</Table.HeadCell>
          <Table.HeadCell className="w-[40%] text-center">Nama Alternatif</Table.HeadCell>
          <Table.HeadCell className="w-[40%] text-center">Periode</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row>
              <Table.Cell
                colSpan={3}
                className="text-center py-4"
              >
                <Spinner size="lg" />
              </Table.Cell>
            </Table.Row>
          ) : alternatifPeriode.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={3}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data Alternatif dalam Periode
              </Table.Cell>
            </Table.Row>
          ) : (
            alternatifPeriode
              .sort(
                (a, b) =>
                  new Date(b.periode.created_at || b.periode.tanggal_mulai) -
                  new Date(a.periode.created_at || a.periode.tanggal_mulai)
              )
              .map((item, index) => (
                <Table.Row
                  key={item.id}
                  className="bg-white"
                >
                  <Table.Cell className="text-center">{index + 1}</Table.Cell>
                  <Table.Cell className="text-center">{item.alternatif.nama_alternatif}</Table.Cell>
                  <Table.Cell className="text-center">{item.periode.nama_periode}</Table.Cell>
                </Table.Row>
              ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
