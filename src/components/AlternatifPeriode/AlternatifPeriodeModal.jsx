import { useState, useEffect } from "react";
import { Button, Modal, Select } from "flowbite-react";
import { useAlternatifPeriodeContext } from "../../contexts/alternatifPeriodeContext";
import { useAlternatifContext } from "../../contexts/alternatifContext";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { toast } from "sonner";

export default function AlternatifPeriodeModal({ isOpen, onClose, idAlternatif, onSuccess }) {
  const { daftarAlternatifPeriode } = useAlternatifPeriodeContext();
  const { fetchAlternatif } = useAlternatifContext();
  const { periode, fetchPeriode } = usePeriodeContext();
  const [selectedPeriode, setSelectedPeriode] = useState();

  useEffect(() => {
    //show the periode only if === 0.
    if (periode.length === 0) {
      fetchPeriode();
    }
  }, []);

  const handleDaftar = async () => {
    if (!selectedPeriode) {
      toast.error("Silakan pilih Periode!");
      return;
    }

    try {
      await daftarAlternatifPeriode(idAlternatif, selectedPeriode);
      toast.success("Alternatif berhasil didaftarkan ke Periode!");
      await fetchAlternatif();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to register alternatif to periode:", error);
      toast.error("Gagal mendaftarkan Alternatif ke Periode.");
    }
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
    >
      <div className="p-4 border-b">
        <h3 className="text-xl font-semibold text-center">Daftarkan Alternatif ke Periode</h3>
      </div>
      <Modal.Body>
        <div className="space-y-4">
          {/* Pilih Periode */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Pilih Periode</label>
            <Select
              value={selectedPeriode}
              onChange={(e) => setSelectedPeriode(e.target.value)}
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
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={handleDaftar}
          className="bg-emerald-500 text-white"
        >
          Simpan
        </Button>
        <Button
          onClick={onClose}
          className="bg-red-500 text-white"
        >
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
