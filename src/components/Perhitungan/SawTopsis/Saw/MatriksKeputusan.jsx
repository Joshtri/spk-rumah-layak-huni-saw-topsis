import { Table } from "flowbite-react";

export default function MatriksKeputusan({ decisionMatrix, kriteria }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Matriks Keputusan</h3>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Alternatif</Table.HeadCell>
          {kriteria.map((krit, index) => (
            <Table.HeadCell key={krit.id_kriteria}>C{index + 1}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body>
          {Object.values(decisionMatrix).map((alt) => (
            <Table.Row key={alt.nama_alternatif}>
              <Table.Cell>{alt.nama_alternatif}-{alt.alternatifId} - {alt.periodeId }</Table.Cell>
              {kriteria.map((krit) => (
                <Table.Cell key={krit.id_kriteria}>
                  {alt.penilaian[krit.id_kriteria] || "-"}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
