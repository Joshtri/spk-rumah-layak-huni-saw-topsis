import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { toast } from "sonner";

export default function AlternatifEditModal({ isOpen, onClose, alternatif }) {
  const { editAlternatif, fetchAlternatif } = useAlternatif();
  // const { periode } = usePeriodeContext();

  const [alternatifName, setAlternatifName] = useState("");
  // const [selectedPeriode, setSelectedPeriode] = useState("");

  useEffect(() => {
    if (isOpen && alternatif) {
      setAlternatifName(alternatif.nama_alternatif || "");
      // setSelectedPeriode(alternatif.periodeId?.toString() || "");
    }
  }, [isOpen, alternatif]);

  const handleSave = async () => {
    if (!alternatifName) {
      toast.error("Semua field wajib diisi");
      return;
    }

    try {
      await editAlternatif(alternatif.id_alternatif, {
        nama_alternatif: alternatifName,
        // periodeId: parseInt(selectedPeriode),
      });
      toast.success("Alternatif berhasil diperbarui!");
      await fetchAlternatif();
      onClose();
    } catch (error) {
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
          {/* <div>
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
          </div> */}
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
