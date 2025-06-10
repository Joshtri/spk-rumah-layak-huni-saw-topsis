import { useState, useEffect } from "react";
import { Table, Button, Select, Spinner } from "flowbite-react";
import axios from "axios";
import { toast } from "sonner";
import { usePeriodeContext } from "../../../../contexts/periodeContext";
import AddBonusModal from "./AddBonusModal";

export default function NilaiPreferensi({ finalScores = [] }) {
  const { periode, loading, fetchPeriode } = usePeriodeContext();
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [existingData, setExistingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [maxAlternatifs, setMaxAlternatifs] = useState(5);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [selectedAlternatif, setSelectedAlternatif] = useState(null);
  const [adjustedScores, setAdjustedScores] = useState([]);
  const [originalTiedGroups, setOriginalTiedGroups] = useState([]);
  const [originalScores, setOriginalScores] = useState(new Map());
  const [appliedBonuses, setAppliedBonuses] = useState(new Map());

  useEffect(() => {
    fetchPeriode();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      checkExistingData(selectedPeriod);
    }
  }, [selectedPeriod]);

  // Initialize adjusted scores and identify tied groups when finalScores change
  useEffect(() => {
    const sortedScores = [...finalScores].sort((a, b) => {
      const scoreA = parseFloat(a.preference);
      const scoreB = parseFloat(b.preference);

      // First sort by score (descending)
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      // If scores are equal, sort alphabetically by name (ascending)
      return a.nama_alternatif.localeCompare(b.nama_alternatif);
    });

    setAdjustedScores(sortedScores);

    // Store original scores
    const originalScoreMap = new Map();
    finalScores.forEach((alt) => {
      originalScoreMap.set(alt.alternatifId, parseFloat(alt.preference));
    });
    setOriginalScores(originalScoreMap);

    // Reset applied bonuses
    setAppliedBonuses(new Map());

    // Identify originally tied groups
    const tiedGroups = [];
    const scoreGroups = {};

    finalScores.forEach((alt) => {
      const score = parseFloat(alt.preference);
      if (!scoreGroups[score]) {
        scoreGroups[score] = [];
      }
      scoreGroups[score].push(alt.alternatifId);
    });

    // Find groups with more than one alternatif (tied scores)
    Object.values(scoreGroups).forEach((group) => {
      if (group.length > 1) {
        tiedGroups.push(...group);
      }
    });

    setOriginalTiedGroups(tiedGroups);
  }, [finalScores]);

  const checkExistingData = async (periodeId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/hasil-perhitungan/${periodeId}`);
      setExistingData(response.data.length > 0);
    } catch (error) {
      console.error("❌ Gagal mengecek hasil perhitungan:", error);
      setExistingData(false);
    }
  };
  const saveResults = async () => {
    if (isSaving) return; // Prevent multiple clicks
    if (!selectedPeriod || isNaN(selectedPeriod)) {
      toast.error("❌ Pilih periode terlebih dahulu!");
      return;
    }

    if (existingData) {
      toast.error("Hasil perhitungan sudah ada untuk periode ini. Harap hapus data sebelum menyimpan ulang.");
      return;
    }

    try {
      setIsSaving(true);
      const periodeIdInt = parseInt(selectedPeriod, 10);

      const formattedResults = adjustedScores.slice(0, maxAlternatifs).map((alt, index) => ({
        alternatifId: alt.alternatifId,
        rangking: index + 1,
        nilai_akhir: parseFloat(alt.preference),
        status: "Layak",
        periodeId: periodeIdInt,
      }));

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/hasil-perhitungan`, {
        results: formattedResults,
      });

      toast.success("✅ Hasil perhitungan berhasil disimpan!");
      checkExistingData(selectedPeriod); // 🔄 Refresh validasi setelah menyimpan
    } catch (error) {
      console.error("❌ Error saving results:", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(` ${error.response.data.error}`);
      } else {
        toast.error("❌ Gagal menyimpan hasil perhitungan.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const deleteResults = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/hasil-perhitungan/${selectedPeriod}`);
      toast.success("Hasil perhitungan berhasil dihapus.");
      setExistingData(false);
    } catch (error) {
      console.error("❌ Error deleting results:", error);
      toast.error("Gagal menghapus hasil perhitungan.");
    }
  };

  // Check for tied scores using adjusted scores, but ignore ties where bonuses have been applied
  const hasTiedScores = () => {
    const scores = adjustedScores.map((alt) => parseFloat(alt.preference));
    const uniqueScores = new Set(scores);

    // If there are no tied scores, return false
    if (scores.length === uniqueScores.size) {
      return false;
    }

    // Check if any of the tied scores have bonuses applied
    const scoreGroups = {};
    adjustedScores.forEach((alt) => {
      const score = parseFloat(alt.preference);
      if (!scoreGroups[score]) {
        scoreGroups[score] = [];
      }
      scoreGroups[score].push(alt);
    });

    // Check for tied groups where no bonuses have been applied
    for (const group of Object.values(scoreGroups)) {
      if (group.length > 1) {
        // Check if any alternatif in this tied group has a bonus applied
        const hasAnyBonus = group.some((alt) => appliedBonuses.has(alt.alternatifId));

        // If no bonus has been applied to any alternatif in this tied group, it's still a problematic tie
        if (!hasAnyBonus) {
          return true;
        }
      }
    }

    return false;
  };

  // Update adjusted scores with alphabetical ordering for ties
  const applyBonus = (alternatifId, bonusData) => {
    const originalScore = originalScores.get(alternatifId);

    // Calculate new total bonus based on current selections
    let newTotalBonus = 0;
    if (bonusData.bantuanSebelumnya === "belum") newTotalBonus += 0.01;
    if (bonusData.kepalaKeluargaLansia === "ya") newTotalBonus += 0.01;
    if (bonusData.kepemilikanTanah === "tanah pribadi") newTotalBonus += 0.01;

    // Cap the bonus at 0.03
    const cappedBonus = Math.min(newTotalBonus, 0.03);

    // Update applied bonuses tracking
    const newAppliedBonuses = new Map(appliedBonuses);
    newAppliedBonuses.set(alternatifId, {
      score: cappedBonus,
      criteria: bonusData,
    });
    setAppliedBonuses(newAppliedBonuses);

    // Update adjusted scores with alphabetical ordering for ties
    setAdjustedScores((prevScores) =>
      prevScores
        .map((score) =>
          score.alternatifId === alternatifId
            ? {
                ...score,
                preference: (originalScore + cappedBonus).toFixed(6),
                hasBonus: cappedBonus > 0,
              }
            : score
        )
        .sort((a, b) => {
          const scoreA = parseFloat(a.preference);
          const scoreB = parseFloat(b.preference);

          // First sort by score (descending)
          if (scoreA !== scoreB) {
            return scoreB - scoreA;
          }

          // If scores are equal, sort alphabetically by name (ascending)
          return a.nama_alternatif.localeCompare(b.nama_alternatif);
        })
    );

    if (cappedBonus < newTotalBonus) {
      toast.warning(`Bonus dibatasi maksimal 0.03. Bonus yang diterapkan: ${cappedBonus.toFixed(3)}`);
    } else if (cappedBonus === 0) {
      toast.success("Bonus dihapus!");
    } else {
      toast.success(`Bonus ${cappedBonus.toFixed(3)} berhasil ditambahkan!`);
    }
  };

  const handleBonusClick = (alternatif) => {
    setSelectedAlternatif(alternatif);
    setShowBonusModal(true);
  };

  const closeBonusModal = () => {
    setShowBonusModal(false);
    setSelectedAlternatif(null);
  };

  // Get current applied bonus for the selected alternatif
  const getCurrentBonus = () => {
    if (!selectedAlternatif) return null;
    return appliedBonuses.get(selectedAlternatif.alternatifId) || { score: 0, criteria: {} };
  };

  // Check if an alternatif was originally tied (before any bonuses)
  const wasOriginallyTied = (alternatifId) => {
    return originalTiedGroups.includes(alternatifId);
  };

  const isTied = hasTiedScores();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Nilai Preferensi & Urutan Alternatif</h3>

      {loading ? (
        <Spinner
          size="lg"
          className="text-center my-4"
        />
      ) : periode.length === 0 ? (
        <p className="text-red-500">❌ Tidak ada data periode tersedia.</p>
      ) : (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-auto"
            >
              <option value="">Pilih Periode</option>
              {periode.map((p) => (
                <option
                  key={p.id_periode}
                  value={p.id_periode}
                >
                  {p.nama_periode}
                </option>
              ))}
            </Select>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="maxAlternatifs"
                className="text-sm font-medium text-gray-700"
              >
                Jumlah Penerima Bantuan:
              </label>
              <input
                id="maxAlternatifs"
                type="number"
                min="1"
                max={finalScores.length || 100}
                value={maxAlternatifs}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setMaxAlternatifs("");
                  } else {
                    const numValue = parseInt(value);
                    if (!isNaN(numValue) && numValue >= 1) {
                      setMaxAlternatifs(numValue);
                    }
                  }
                }}
                onBlur={(e) => {
                  // Set default value when user leaves the field empty
                  if (e.target.value === "" || isNaN(parseInt(e.target.value))) {
                    setMaxAlternatifs(5);
                  }
                }}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {existingData ? (
            <Button
              onClick={deleteResults}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Hapus Hasil Perhitungan
            </Button>
          ) : (
            <div className="flex flex-col items-end">
              <Button
                onClick={saveResults}
                disabled={!selectedPeriod || isTied}
                className={`px-4 py-2 rounded ${
                  !selectedPeriod || isTied ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                } text-white`}
              >
                Simpan Hasil Perhitungan
              </Button>
              {isTied && (
                <p className="text-red-500 text-sm mt-1">⚠️ Terdapat nilai yang sama. Tidak dapat menyimpan hasil.</p>
              )}
            </div>
          )}
        </div>
      )}

      {finalScores.length === 0 ? (
        <p className="text-red-500">❌ Tidak ada hasil perhitungan tersedia.</p>
      ) : (
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Ranking</Table.HeadCell>
            <Table.HeadCell>Alternatif</Table.HeadCell>
            <Table.HeadCell>Nilai Preferensi</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {adjustedScores.map((alt, index) => (
              <Table.Row
                key={alt.alternatifId}
                className={index + 1 <= maxAlternatifs ? "bg-green-200" : "bg-red-200"}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {alt.nama_alternatif}
                  {alt.hasBonus && <span className="ml-2 text-blue-500 text-xs">★</span>}
                </Table.Cell>
                <Table.Cell>{alt.preference}</Table.Cell>
                <Table.Cell>
                  {wasOriginallyTied(alt.alternatifId) && (
                    <Button
                      size="xs"
                      onClick={() => handleBonusClick(alt)}
                      className="bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      +
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <AddBonusModal
        isOpen={showBonusModal}
        onClose={closeBonusModal}
        alternatifName={selectedAlternatif?.nama_alternatif}
        onApplyBonus={applyBonus}
        selectedAlternatif={selectedAlternatif}
        currentBonus={getCurrentBonus()}
      />
    </div>
  );
}
