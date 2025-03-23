import { Modal, Button, Label, Select } from "flowbite-react";
import { useState } from "react";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { useAlternatifPeriode } from "../../hooks/useAlternatifPeriode";
import { toast } from "sonner";

export default function AlternatifPeriodeInputModal({ isOpen, onClose }) {
  const { alternatif } = useAlternatif(); // Ambil daftar Alternatif
  const { periode } = usePeriodeContext(); // Ambil daftar Periode
  const { addAlternatifToPeriode } = useAlternatifPeriode(); // Fungsi untuk menambahkan Alternatif ke Periode

  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(false);

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
    <Modal show={isOpen} size="md" onClose={onClose} className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b rounded-t">
          <h3 className="text-xl text-black font-semibold text-center">Tambah Alternatif ke Periode</h3>
        </div>
        <Modal.Body>
          <div className="space-y-4">
            {/* Pilih Alternatif */}
            <div>
              <Label htmlFor="alternatif" value="Pilih Alternatif" />
              <Select id="alternatif" value={selectedAlternatif} onChange={(e) => setSelectedAlternatif(e.target.value)} required>
                <option value="">Pilih Alternatif</option>
                {alternatif.map((item) => (
                  <option key={item.id_alternatif} value={item.id_alternatif}>
                    {item.nama_alternatif}
                  </option>
                ))}
              </Select>
            </div>

            {/* Pilih Periode */}
            <div>
              <Label htmlFor="periode" value="Pilih Periode" />
              <Select id="periode" value={selectedPeriode} onChange={(e) => setSelectedPeriode(e.target.value)} required>
                <option value="">Pilih Periode</option>
                {periode.map((item) => (
                  <option key={item.id_periode} value={item.id_periode}>
                    {item.nama_periode}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between p-4">
          <Button onClick={onClose} className="bg-gray-500 text-white w-1/3">Batal</Button>
          <Button onClick={handleSave} disabled={loading} className="bg-emerald-500 text-white w-1/3">
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
