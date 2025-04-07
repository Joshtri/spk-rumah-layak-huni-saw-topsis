import { useEffect, useState } from "react";
import { Select, Spinner } from "flowbite-react";
import { usePenilaianContext as usePenilaian } from "../../../contexts/penilaianContext";
import { useKriteriaContext as useKriteria } from "../../../contexts/kriteriaContext";
import { usePeriodeContext } from "../../../contexts/periodeContext";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
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

  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

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

      // Cek apakah ada kriteria yang belum dinilai
      let hasEmptyPenilaian = Object.values(groupedPenilaian).some((alt) =>
        kriteria.some((krit) => alt.penilaian[krit.id_kriteria] === undefined)
      );

      if (hasEmptyPenilaian) {
        setShowWarningModal(true);
      }

      // 🔹 **Normalisasi SAW**
      // normalisasi dengan formula 2.1: rᵢⱼ = xᵢⱼ / max xⱼ
      kriteria.forEach((krit) => {
        let values = Object.values(groupedPenilaian).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );
        maxValues[krit.id_kriteria] = Math.max(...values);
      });
      let normMatrix = {};
      Object.entries(groupedPenilaian).forEach(([altId, alt]) => {
        normMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          penilaian: {},
        };
        kriteria.forEach((krit) => {
          const nilai = alt.penilaian[krit.id_kriteria] || 0;
          const pembagi = maxValues[krit.id_kriteria] || 1;
          const hasilNormalisasi = nilai / pembagi;
          normMatrix[altId].penilaian[krit.id_kriteria] = hasilNormalisasi;
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
          const bobot =
            krit.bobot_kriteria > 1
              ? krit.bobot_kriteria / 100
              : krit.bobot_kriteria;
          weightMatrix[altId].penilaian[krit.id_kriteria] =
            alt.penilaian[krit.id_kriteria] * bobot;
        });
      });
      setWeightedMatrix(weightMatrix);

      // 🔹 **Solusi Ideal Positif & Negatif**
      let idealPositif = {};
      let idealNegatif = {};
      kriteria.forEach((krit) => {
        const values = Object.values(weightMatrix).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );

        if (krit.tipe_kriteria === "Benefit") {
          idealPositif[krit.id_kriteria] = Math.max(...values); // benefit → max
          idealNegatif[krit.id_kriteria] = Math.min(...values); // benefit → min
        } else {
          idealPositif[krit.id_kriteria] = Math.min(...values); // cost → min jadi A+
          idealNegatif[krit.id_kriteria] = Math.max(...values); // cost → max jadi A-
        }

        console.log("Tipe Kriteria:", krit.nama_kriteria, krit.tipe_kriteria);
        console.log("A+:", idealPositif[krit.id_kriteria]);
        console.log("A-:", idealNegatif[krit.id_kriteria]);
      });

      setIdealSolutions({ idealPositif, idealNegatif });

      // 🔹 **Hitung Jarak ke Solusi Ideal**
      let distanceMatrix = {};
      Object.entries(weightMatrix).forEach(([altId, alt]) => {
        const dPlus = Math.sqrt(
          kriteria.reduce((sum, krit) => {
            const v = alt.penilaian[krit.id_kriteria] || 0;
            const aPlus = idealPositif[krit.id_kriteria] || 0;
            return sum + Math.pow(v - aPlus, 2);
          }, 0)
        );
        const dMinus = Math.sqrt(
          kriteria.reduce((sum, krit) => {
            const v = alt.penilaian[krit.id_kriteria] || 0;
            const aMin = idealNegatif[krit.id_kriteria] || 0;
            return sum + Math.pow(v - aMin, 2);
          }, 0)
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
        const preference = alt.dMinus / (alt.dPlus + alt.dMinus);
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

      <Modal show={showWarningModal} onClose={() => setShowWarningModal(false)}>
        <Modal.Header>Penilaian Belum Lengkap</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            Terdapat kriteria yang belum dinilai untuk alternatif pada periode
            ini. Silakan lengkapi penilaian terlebih dahulu di menu Penilaian.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-between">
          <Button color="gray" onClick={() => setShowWarningModal(false)}>
            Tutup
          </Button>
          <Button color="blue" onClick={() => navigate("/penilaian")}>
            Ke Menu Penilaian
          </Button>
        </Modal.Footer>
      </Modal>

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
          <MatriksKeputusan
            decisionMatrix={decisionMatrix}
            kriteria={kriteria}
          />
          <NormalisasiSAW
            normalizedMatrix={normalizedMatrix}
            kriteria={kriteria}
          />
          <NormalisasiTerbobot
            weightedMatrix={weightedMatrix}
            kriteria={kriteria}
          />
          <SolusiIdeal idealSolutions={idealSolutions} kriteria={kriteria} />
          <JarakSolusiIdeal distances={distances} />
          <NilaiPreferensi finalScores={finalScores} />
        </>
      )}
    </div>
  );
}
