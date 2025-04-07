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

      // 🔹 Matriks Keputusan
      let groupedPenilaian = {};
      filteredPenilaian.forEach((item) => {
        const altId = item.alternatif?.id_alternatif;
        if (!groupedPenilaian[altId]) {
          groupedPenilaian[altId] = {
            nama_alternatif: item.alternatif?.nama_alternatif || "-",
            alternatifId: altId,
            periodeId: item.periodeId,
            penilaian: {},
          };
        }
        groupedPenilaian[altId].penilaian[item.kriteriaId] =
          item.subKriteria?.bobot_sub_kriteria || 0;
      });

      // ✅ Sort berdasarkan ID Alternatif
      const sortedPenilaian = Object.fromEntries(
        Object.entries(groupedPenilaian).sort(
          ([a], [b]) =>
            parseInt(a.replace(/\D/g, "")) - parseInt(b.replace(/\D/g, ""))
        )
      );

      setDecisionMatrix(sortedPenilaian);

      // 🔹 Normalisasi SAW (rᵢⱼ = xᵢⱼ / max xⱼ)
      kriteria.forEach((krit) => {
        const values = Object.values(sortedPenilaian).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );
        maxValues[krit.id_kriteria] = Math.max(...values);
        minValues[krit.id_kriteria] = Math.min(...values);
      });

      const normMatrix = {};
      Object.entries(sortedPenilaian).forEach(([altId, alt]) => {
        normMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          penilaian: {},
        };
        kriteria.forEach((krit) => {
          const nilai = alt.penilaian[krit.id_kriteria] || 0;
          const norm =
            krit.tipe_kriteria === "Benefit"
              ? nilai / maxValues[krit.id_kriteria]
              : minValues[krit.id_kriteria] / nilai;
          normMatrix[altId].penilaian[krit.id_kriteria] = norm;
        });
      });

      setNormalizedMatrix(normMatrix);

      // 🔹 Normalisasi Terbobot
      const weightMatrix = {};
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
          const nilaiTerbobot = alt.penilaian[krit.id_kriteria] * bobot;
          weightMatrix[altId].penilaian[krit.id_kriteria] = nilaiTerbobot;
        });
      });

      setWeightedMatrix(weightMatrix);

      // 🔹 Solusi Ideal
      const idealPositif = {};
      const idealNegatif = {};
      kriteria.forEach((krit) => {
        const values = Object.values(weightMatrix).map(
          (alt) => alt.penilaian[krit.id_kriteria] || 0
        );
        if (krit.tipe_kriteria === "Benefit") {
          idealPositif[krit.id_kriteria] = Math.max(...values);
          idealNegatif[krit.id_kriteria] = Math.min(...values);
        } else {
          idealPositif[krit.id_kriteria] = Math.min(...values);
          idealNegatif[krit.id_kriteria] = Math.max(...values);
        }
      });

      setIdealSolutions({ idealPositif, idealNegatif });

      // 🔹 Hitung Jarak
      const distanceMatrix = {};
      Object.entries(weightMatrix).forEach(([altId, alt]) => {
        const dPlus = Math.sqrt(
          kriteria.reduce((sum, krit) => {
            const v = alt.penilaian[krit.id_kriteria] || 0;
            const ideal = idealPositif[krit.id_kriteria] || 0;
            return sum + Math.pow(v - ideal, 2);
          }, 0)
        );
        const dMinus = Math.sqrt(
          kriteria.reduce((sum, krit) => {
            const v = alt.penilaian[krit.id_kriteria] || 0;
            const ideal = idealNegatif[krit.id_kriteria] || 0;
            return sum + Math.pow(v - ideal, 2);
          }, 0)
        );

        distanceMatrix[altId] = {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          dPlus: parseFloat(dPlus.toFixed(4)),
          dMinus: parseFloat(dMinus.toFixed(4)),
        };
      });

      setDistances(distanceMatrix);

      // 🔹 Nilai Preferensi (Vᵢ = D⁻ / (D⁺ + D⁻))
      const finalScores = Object.entries(distanceMatrix).map(([altId, alt]) => {
        const v = alt.dMinus / (alt.dPlus + alt.dMinus);
        return {
          nama_alternatif: alt.nama_alternatif,
          alternatifId: alt.alternatifId,
          preference: parseFloat(v.toFixed(4)),
        };
      });

      finalScores.sort((a, b) => b.preference - a.preference);
      setFinalScores(finalScores);
    } else {
      // Reset jika data tidak lengkap
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
