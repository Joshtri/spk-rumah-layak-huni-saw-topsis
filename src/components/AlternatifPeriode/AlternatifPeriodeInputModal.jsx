import { Modal, Button, Label, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { useAlternatifPeriodeContext } from "../../contexts/alternatifPeriodeContext";
import { getHasilPerhitungan } from "../../api/hasilPerhitunganApi";
import { toast } from "sonner";

export default function AlternatifPeriodeInputModal({ isOpen, onClose }) {
  const { alternatif } = useAlternatif(); // Ambil daftar Alternatif
  const { periode } = usePeriodeContext(); // Ambil daftar Periode
  const { addAlternatifToPeriode } = useAlternatifPeriodeContext(); // Fungsi untuk menambahkan Alternatif ke Periode

  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(false);
  const [rankedAlternatifIds, setRankedAlternatifIds] = useState([]);

  // Fetch ranked alternatif when modal opens
  useEffect(() => {
    const fetchRankedAlternatif = async () => {
      if (isOpen) {
        try {
          const allRankings = await getHasilPerhitungan();

          // Check different possible property names for alternatif ID
          const rankedIds = [
            ...new Set(
              allRankings
                .map((ranking) => {
                  // Try different property names that might contain the alternatif ID
                  return ranking.id_alternatif || ranking.alternatifId || ranking.alternatif_id;
                })
                .filter((id) => id !== undefined)
            ),
          ]; // Filter out undefined values

          setRankedAlternatifIds(rankedIds);
        } catch (error) {
          console.error("Error fetching ranked alternatif:", error);
          setRankedAlternatifIds([]);
        }
      }
    };

    fetchRankedAlternatif();
  }, [isOpen, alternatif]);

  // Filter out alternatif that are already ranked
  const availableAlternatif = alternatif.filter((item) => {
    return !rankedAlternatifIds.includes(item.id_alternatif);
  });

  const handleSave = async () => {
    if (!selectedAlternatif || !selectedPeriode) {
      toast.error("Alternatif dan Periode harus dipilih!");
      return;
    }

    setLoading(true);
    try {
      await addAlternatifToPeriode(selectedAlternatif, selectedPeriode);
      toast.success("Alternatif berhasil didaftarkan ke Periode!");
      setSelectedAlternatif("");
      setSelectedPeriode("");
      onClose();
    } catch (error) {
      console.error("Error adding alternatif to periode:", error);
      toast.error("Gagal menambahkan alternatif ke periode!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b rounded-t">
          <h3 className="text-xl text-black font-semibold text-center">Tambah Alternatif ke Periode</h3>
        </div>
        <Modal.Body>
          <div className="space-y-4">
            {/* Pilih Alternatif */}
            <div>
              <Label
                htmlFor="alternatif"
                value="Pilih Alternatif"
              />
              <Select
                id="alternatif"
                value={selectedAlternatif}
                onChange={(e) => setSelectedAlternatif(e.target.value)}
                required
              >
                <option value="">Pilih Alternatif</option>
                {availableAlternatif.length === 0 ? (
                  <option
                    value=""
                    disabled
                  >
                    Tidak ada alternatif yang tersedia
                  </option>
                ) : (
                  availableAlternatif.map((item) => (
                    <option
                      key={item.id_alternatif}
                      value={item.id_alternatif}
                    >
                      {item.nama_alternatif}
                    </option>
                  ))
                )}
              </Select>
              {availableAlternatif.length === 0 && alternatif.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Semua alternatif sudah memiliki ranking di periode tertentu
                </p>
              )}
            </div>

            {/* Pilih Periode */}
            <div>
              <Label
                htmlFor="periode"
                value="Pilih Periode"
              />
              <Select
                id="periode"
                value={selectedPeriode}
                onChange={(e) => setSelectedPeriode(e.target.value)}
                required
              >
                <option value="">Pilih Periode</option>
                {periode.map((item) => (
                  <option
                    key={item.id_periode}
                    value={item.id_periode}
                  >
                    {item.nama_periode}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between p-4">
          <Button
            onClick={onClose}
            className="bg-gray-500 text-white w-1/3"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || availableAlternatif.length === 0}
            className="bg-emerald-500 text-white w-1/3"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
