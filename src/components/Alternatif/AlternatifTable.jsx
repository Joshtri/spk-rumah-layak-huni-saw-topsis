import { Table, Spinner } from "flowbite-react";
import AlternatifTableActions from "./AlternatifTableActions";

export default function AlternatifTable({ alternatif, loading }) {
  console.log(alternatif);
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <Table
        striped
        className="min-w-full whitespace-nowrap overflow-hidden"
      >
        <Table.Head>
          <Table.HeadCell className="w-[10%] text-center">No</Table.HeadCell>
          <Table.HeadCell className="w-[30%] text-center">Nama Alternatif</Table.HeadCell>
          <Table.HeadCell className="w-[30%] text-center">Periode</Table.HeadCell>
          <Table.HeadCell className="w-[30%] text-center">Aksi</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loading ? (
            <Table.Row>
              <Table.Cell
                colSpan={4}
                className="text-center py-4"
              >
                <Spinner size="lg" />
              </Table.Cell>
            </Table.Row>
          ) : alternatif.length === 0 ? (
            <Table.Row>
              <Table.Cell
                colSpan={4}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data alternatif
              </Table.Cell>
            </Table.Row>
          ) : (
            alternatif.map((item,index) => (
              <Table.Row
                key={item.id_alternatif}
                className="bg-white"
              >
                <Table.Cell className="text-center">{index + 1}</Table.Cell>
                <Table.Cell className="text-center">{item.nama_alternatif}</Table.Cell>
                <Table.Cell className="text-center">
                  {item.alternatifPeriode.length > 0 ? (
                    item.alternatifPeriode.map((ap) => (
                      <span
                        key={ap.id}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded mr-1"
                      >
                        {ap.periode?.nama_periode || "Periode Tidak Diketahui"}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Belum Terdaftar</span>
                  )}
                </Table.Cell>

                <Table.Cell className="text-center">
                  <AlternatifTableActions
                    idAlternatif={item.id_alternatif}
                    hasPeriode={item.alternatifPeriode.length > 0} // ✅ Cek apakah Alternatif sudah terdaftar di Periode
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
