import { Table } from "flowbite-react";
import CriteriaTableActions from "./criteriaTableActions";

export default function CriteriaTable() {
  const criteriaData = [
    {
      id: 1,
      nama_kriteria: "Jenis Dinding",
      bobot_kriteria: "10",
      tipe_kriteria: "Benefit",
      keteranga_kriteria: "Semakin tinggi jenis dinding semakin baik",
    },
    {
      id: 2,
      nama_kriteria: "Jumlah Kamar",
      bobot_kriteria: "20",
      tipe_kriteria: "Benefit",
      keteranga_kriteria: "Semakin tinggi jumlah kamar semakin baik",
    },
    {
      id: 3,
      nama_kriteria: "Jumlah Kamar Mandi",
      bobot_kriteria: "15",
      tipe_kriteria: "Benefit",
      keteranga_kriteria: "Semakin tinggi jumlah kamar mandi semakin baik",
    },
    {
      id: 4,
      nama_kriteria: "Luas Tanah",
      bobot_kriteria: "10",
      tipe_kriteria: "Benefit",
      keteranga_kriteria: "Semakin tinggi luas tanah semakin baik",
    },
    {
      id: 5,
      nama_kriteria: "Luas Bangunan",
      bobot_kriteria: "15",
      tipe_kriteria: "Benefit",
      keteranga_kriteria: "Semakin tinggi luas bangunan semakin baik",
    },
    {
      id: 6,
      nama_kriteria: "Harga",
      bobot_kriteria: "30",
      tipe_kriteria: "Cost",
      keteranga_kriteria: "Semakin rendah harga semakin baik",
    },
  ];

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
          <Table.HeadCell className="w-[5%] text-center">Id</Table.HeadCell>
          <Table.HeadCell className="w-[25%] text-center">Kriteria</Table.HeadCell>
          <Table.HeadCell className="w-[10%] text-center">Bobot</Table.HeadCell>
          <Table.HeadCell className="w-[15%] text-center">Tipe</Table.HeadCell>
          <Table.HeadCell className="w-[25%] text-center">Keterangan</Table.HeadCell>
          <Table.HeadCell className="w-[20%] text-center">Aksi</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {criteriaData.map((criteria, index) => (
            <Table.Row
              key={index}
              className="bg-white text-gray-900 text-center"
            >
              <Table.Cell className="">{criteria.id}</Table.Cell>
              <Table.Cell className="">{criteria.nama}</Table.Cell>
              <Table.Cell className="text-center">{criteria.bobot}%</Table.Cell>
              <Table.Cell className="text-center">{criteria.tipe}</Table.Cell>
              <Table.Cell className="text-center">
                {criteria.tipe === "Benefit"
                  ? `Semakin tinggi ${criteria.nama} semakin baik`
                  : `Semakin rendah ${criteria.nama} semakin baik`}
              </Table.Cell>
              <Table.Cell>
                <CriteriaTableActions selectedCriteria={criteria} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
