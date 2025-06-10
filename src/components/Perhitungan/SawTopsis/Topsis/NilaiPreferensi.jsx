import { useState, useEffect } from "react";
import { Table, Button, Select, Spinner } from "flowbite-react";
import axios from "axios";
import { toast } from "sonner";
import { usePeriodeContext } from "../../../../contexts/periodeContext";

export default function NilaiPreferensi({ finalScores = [] }) {
  const { periode, loading, fetchPeriode } = usePeriodeContext();
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [existingData, setExistingData] = useState(false); // ✅ Cek apakah data sudah ada
  const [isSaving, setIsSaving] = useState(false);
  const [maxAlternatifs, setMaxAlternatifs] = useState(5);

  useEffect(() => {
    fetchPeriode();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      checkExistingData(selectedPeriod);
    }
  }, [selectedPeriod]);

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

      const formattedResults = finalScores.slice(0, maxAlternatifs).map((alt, index) => ({
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
                onChange={(e) => setMaxAlternatifs(parseInt(e.target.value) || 5)}
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
            <Button
              onClick={saveResults}
              disabled={!selectedPeriod}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Simpan Hasil Perhitungan
            </Button>
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
            {/* <Table.HeadCell>Status</Table.HeadCell> */}
          </Table.Head>
          <Table.Body>
            {finalScores.map((alt, index) => (
              <Table.Row
                key={alt.alternatifId}
                className={index + 1 <= 10 ? "bg-green-200" : "bg-red-200"}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{alt.nama_alternatif}</Table.Cell>
                <Table.Cell>{alt.preference}</Table.Cell>
                {/* <Table.Cell className="font-semibold">{index + 1 <= 10 ? "Layak ✅" : "Tidak Layak ❌"}</Table.Cell> */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
