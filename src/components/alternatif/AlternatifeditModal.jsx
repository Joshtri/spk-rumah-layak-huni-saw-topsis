import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useAlternatif } from "../../hooks/useAlternatif";
import { usePeriode } from "../../hooks/usePeriode";
import { toast } from "sonner";

export default function AlternatifEditModal({ isOpen, onClose, alternatifId }) {
  const { getAlternatifById, editAlternatif } = useAlternatif();
  const { periode } = usePeriode();

  const [alternatifName, setAlternatifName] = useState("");
  const [selectedPeriode, setSelectedPeriode] = useState("");

  useEffect(() => {
    const fetchAlternatif = async () => {
      if (alternatifId) {
        const data = await getAlternatifById(alternatifId);
        setAlternatifName(data.nama_alternatif);
        setSelectedPeriode(data.periodeId);
      }
    };

    fetchAlternatif();
  }, [alternatifId]);

  const handleSave = async () => {
    try {
      await editAlternatif(alternatifId, {
        nama_alternatif: alternatifName,
        periodeId: parseInt(selectedPeriode),
      });

      toast.success("Alternatif berhasil diperbarui!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Gagal memperbarui alternatif!");
    }
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <div className="p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold text-center">
          Edit Alternatif
        </h3>
      </div>
      <Modal.Body>
        <div className="space-y-4">
          {/* Nama Alternatif */}
          <div>
            <Label htmlFor="alternatifName" value="Nama Alternatif" />
            <TextInput
              id="alternatifName"
              placeholder="Masukkan Nama Alternatif"
              value={alternatifName}
              onChange={(e) => setAlternatifName(e.target.value)}
              required
            />
          </div>

          {/* Pilihan Periode */}
          <div>
            <Label htmlFor="periode" value="Periode" />
            <Select
              id="periode"
              value={selectedPeriode}
              onChange={(e) => setSelectedPeriode(e.target.value)}
              required
            >
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
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleSave} className="bg-emerald-500 text-white">
          Simpan
        </Button>
        <Button onClick={onClose} className="bg-red-500 text-white">
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
