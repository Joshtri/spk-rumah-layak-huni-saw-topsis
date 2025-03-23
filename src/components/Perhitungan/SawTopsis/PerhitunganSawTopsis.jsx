import { useEffect, useState } from "react";
import { Select, Spinner } from "flowbite-react";
import { usePenilaianContext as usePenilaian } from "../../../contexts/penilaianContext";
import { useKriteriaContext as useKriteria } from "../../../contexts/kriteriaContext";
import { usePeriodeContext } from "../../../contexts/periodeContext";

import MatriksKeputusan from "../SawTopsis/Saw/MatriksKeputusan";
import NormalisasiSAW from "../SawTopsis/Saw/NormalisasiSaw";
import NormalisasiTerbobot from "../SawTopsis/Topsis/NormalisasiTerbobot";
import SolusiIdeal from "../SawTopsis/Topsis/SolusiIdeal";
import JarakSolusiIdeal from "../SawTopsis/Topsis/JarakSolusiIdeal";
import NilaiPreferensi from "../SawTopsis/Topsis/NilaiPreferensi";

export default function PerhitunganSawTopsis() {
  const { penilaian, loading, fetchPenilaian } = usePenilaian();
  const { kriteria, loading: kriteriaLoading, fetchKriteria } = useKriteria();
  const { periode, fetchPeriode } = usePeriodeContext();

  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [filteredPenilaian, setFilteredPenilaian] = useState([]);
  const [decisionMatrix, setDecisionMatrix] = useState({});
  const [normalizedMatrix, setNormalizedMatrix] = useState({});
  const [weightedMatrix, setWeightedMatrix] = useState({});
  const [idealSolutions, setIdealSolutions] = useState({});
  const [distances, setDistances] = useState({});
  const [finalScores, setFinalScores] = useState([]);

  useEffect(() => {
    fetchPenilaian();
    fetchKriteria();
    fetchPeriode();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      const filtered = penilaian.filter(
        (item) => item.periodeId === parseInt(selectedPeriod, 10)
      );
      setFilteredPenilaian(filtered);
    } else {
      setFilteredPenilaian([]);
    }
  }, [selectedPeriod, penilaian]);

  useEffect(() => {
    if (filteredPenilaian.length > 0 && kriteria.length > 0) {
      let maxValues = {};
      let minValues = {};

      // 🔹 **Matriks Keputusan**
      let groupedPenilaian = {};
      filteredPenilaian.forEach((item) => {
        const alternatifId = item.alternatif?.id_alternatif;
        if (!groupedPenilaian[alternatifId]) {
          groupedPenilaian[alternatifId] = {
            nama_alternatif: item.alternatif?.nama_alternatif || "-",
            alternatifId: item.alternatif?.id_alternatif,
            periodeId: item.periodeId,
            penilaian: {},
          };
        }
        groupedPenilaian[alternatifId].penilaian[item.kriteriaId] =
          item.subKriteria?.bobot_sub_kriteria || 0;
      });
      setDecisionMatrix(groupedPenilaian);

      // 🔹 **Normalisasi SAW**
      kriteria.forEach((krit) => {
        let values = Object.values(groupedPenilaian).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );
        maxValues[krit.id_kriteria] = Math.max(...values);
        minValues[krit.id_kriteria] = Math.min(...values);
      });

      let normMatrix = {};
      Object.entries(groupedPenilaian).forEach(([altId, alt]) => {
        normMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          penilaian: {},
        };
        kriteria.forEach((krit) => {
          let rawValue = alt.penilaian[krit.id_kriteria] || 0;
          let normValue =
            krit.tipe_kriteria === "Benefit"
              ? rawValue / maxValues[krit.id_kriteria]
              : minValues[krit.id_kriteria] / rawValue;
          normMatrix[altId].penilaian[krit.id_kriteria] = normValue;
        });
      });
      setNormalizedMatrix(normMatrix);

      // 🔹 **Normalisasi Terbobot (TOPSIS)**
      let weightMatrix = {};
      Object.entries(normMatrix).forEach(([altId, alt]) => {
        weightMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          penilaian: {},
        };
        kriteria.forEach((krit) => {
          let normalizedWeight =
            krit.bobot_kriteria > 1
              ? krit.bobot_kriteria / 100
              : krit.bobot_kriteria;
          let weightedValue =
            normMatrix[altId].penilaian[krit.id_kriteria] * normalizedWeight;
          weightMatrix[altId].penilaian[krit.id_kriteria] = weightedValue;
        });
      });
      setWeightedMatrix(weightMatrix);

      // 🔹 **Solusi Ideal Positif & Negatif**
      let idealPositif = {};
      let idealNegatif = {};
      kriteria.forEach((krit) => {
        let values = Object.values(weightMatrix).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );
        idealPositif[krit.id_kriteria] = Math.max(...values);
        idealNegatif[krit.id_kriteria] = Math.min(...values);
      });
      setIdealSolutions({ idealPositif, idealNegatif });

      // 🔹 **Hitung Jarak ke Solusi Ideal**
      let distanceMatrix = {};
      Object.entries(weightMatrix).forEach(([altId, alt]) => {
        let dPlus = Math.sqrt(
          kriteria.reduce(
            (sum, krit) =>
              sum +
              Math.pow(
                idealPositif[krit.id_kriteria] - alt.penilaian[krit.id_kriteria],
                2
              ),
            0
          )
        );

        let dMinus = Math.sqrt(
          kriteria.reduce(
            (sum, krit) =>
              sum +
              Math.pow(
                alt.penilaian[krit.id_kriteria] - idealNegatif[krit.id_kriteria],
                2
              ),
            0
          )
        );

        distanceMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          dPlus,
          dMinus,
        };
      });
      setDistances(distanceMatrix);

      // 🔹 **Hitung Nilai Preferensi (TOPSIS)**
      let scores = Object.entries(distanceMatrix).map(([altId, alt]) => {
        let preference = alt.dMinus / (alt.dPlus + alt.dMinus);
        return {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          preference: preference.toFixed(4),
        };
      });

      scores.sort((a, b) => b.preference - a.preference);
      setFinalScores(scores);
    } else {
      setDecisionMatrix({});
      setNormalizedMatrix({});
      setWeightedMatrix({});
      setIdealSolutions({});
      setDistances({});
      setFinalScores([]);
    }
  }, [filteredPenilaian, kriteria]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Perhitungan SAW & TOPSIS
      </h2>

      <div className="mb-4">
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="">Pilih Periode</option>
          {periode.map((p) => (
            <option key={p.id_periode} value={p.id_periode}>
              {p.nama_periode}
            </option>
          ))}
        </Select>
      </div>

      {loading || kriteriaLoading ? (
        <Spinner />
      ) : (
        <>
          <MatriksKeputusan decisionMatrix={decisionMatrix} kriteria={kriteria} />
          <NormalisasiSAW normalizedMatrix={normalizedMatrix} kriteria={kriteria} />
          <NormalisasiTerbobot weightedMatrix={weightedMatrix} kriteria={kriteria} />
          <SolusiIdeal idealSolutions={idealSolutions} kriteria={kriteria} />
          <JarakSolusiIdeal distances={distances} />
          <NilaiPreferensi finalScores={finalScores} />
        </>
      )}
    </div>
  );
}
