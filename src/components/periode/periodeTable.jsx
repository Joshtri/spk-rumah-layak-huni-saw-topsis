import { usePeriode } from "@/hooks/usePeriode";
import { Table, Spinner } from "flowbite-react";

export default function PeriodeTable() {
    const { periode, loading } = usePeriode();

    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <Table striped className="min-w-full whitespace-nowrap overflow-hidden">
                <Table.Head>
                    <Table.HeadCell className="text-center">ID</Table.HeadCell>
                    <Table.HeadCell className="text-center">Nama Periode</Table.HeadCell>
                    <Table.HeadCell className="text-center">Tanggal Mulai</Table.HeadCell>
                    <Table.HeadCell className="text-center">Tanggal Selesai</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {loading ? (
                        <Table.Row>
                            <Table.Cell colSpan={4} className="text-center py-4">
                                <Spinner size="lg" />
                            </Table.Cell>
                        </Table.Row>
                    ) : periode.length === 0 ? (
                        <Table.Row>
                            <Table.Cell colSpan={4} className="text-center py-4 text-gray-500">
                                Tidak ada data periode
                            </Table.Cell>
                        </Table.Row>
                    ) : (
                        periode.map((item) => (
                            <Table.Row key={item.id_periode} className="bg-white">
                                <Table.Cell className="text-center">{item.id_periode}</Table.Cell>
                                <Table.Cell className="text-center">{item.nama_periode}</Table.Cell>
                                <Table.Cell className="text-center">{new Date(item.tanggal_mulai).toLocaleDateString()}</Table.Cell>
                                <Table.Cell className="text-center">{new Date(item.tanggal_selesai).toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
        </div>
    );
}
