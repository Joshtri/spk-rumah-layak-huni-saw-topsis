import { Table, Spinner } from "flowbite-react";

export default function SolusiIdeal({ idealSolutions, kriteria }) {
  if (!idealSolutions || !idealSolutions.idealPositif || !idealSolutions.idealNegatif) {
    return (
      <div className="text-center py-4">
        <Spinner size="lg" /> <p className="text-gray-500">Menghitung solusi ideal...</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Solusi Ideal Positif (A⁺) & Negatif (A⁻)</h3>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Kriteria</Table.HeadCell>
          <Table.HeadCell>A⁺ (Ideal Positif)</Table.HeadCell>
          <Table.HeadCell>A⁻ (Ideal Negatif)</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {kriteria.map((krit) => (
            <Table.Row key={krit.id_kriteria}>
              <Table.Cell>{krit.nama_kriteria}</Table.Cell>
              <Table.Cell>{idealSolutions?.idealPositif?.[krit.id_kriteria]?.toFixed(4) || "0.0000"}</Table.Cell>
              <Table.Cell>{idealSolutions?.idealNegatif?.[krit.id_kriteria]?.toFixed(4) || "0.0000"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
