import { Table } from "flowbite-react";

export default function JarakSolusiIdeal({ distances }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Jarak ke Solusi Ideal Positif (D⁺) & Negatif (D⁻)</h3>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Alternatif</Table.HeadCell>
          <Table.HeadCell>D⁺</Table.HeadCell>
          <Table.HeadCell>D⁻</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {Object.values(distances).map((alt) => (
            <Table.Row key={alt.nama_alternatif}>
              <Table.Cell>{alt.nama_alternatif}</Table.Cell>
              <Table.Cell>{alt.dPlus.toFixed(4)}</Table.Cell>
              <Table.Cell>{alt.dMinus.toFixed(4)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
