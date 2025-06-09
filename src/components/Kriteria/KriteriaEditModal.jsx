import { useEffect, useState } from "react";
import { Button, Modal, TextInput, Label, Select, Textarea } from "flowbite-react";
import { toast } from "sonner";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";

export default function KriteriaEditModal({ isOpen, onClose, kriteria: kriteriaToEdit }) {
  const [namaKriteria, setNamaKriteria] = useState("");
  const [bobotKriteria, setBobotKriteria] = useState("");
  const [tipeKriteria, setTipeKriteria] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalBobot, setTotalBobot] = useState(0);
  const [originalBobot, setOriginalBobot] = useState(0);

  const { editKriteria, kriteria } = useKriteria();

  // Calculate total bobot excluding current kriteria being edited
  useEffect(() => {
    if (isOpen && kriteriaToEdit) {
      // Calculate total excluding the kriteria being edited
      const calculatedTotal = kriteria.reduce((sum, krit) => {
        if (krit.id_kriteria === kriteriaToEdit.id_kriteria) {
          return sum; // Exclude current kriteria from total
        }
        return sum + (krit.bobot_kriteria || 0);
      }, 0);
      
      setTotalBobot(calculatedTotal);
      setOriginalBobot(kriteriaToEdit.bobot_kriteria || 0);

      // Set form values
      setNamaKriteria(kriteriaToEdit.nama_kriteria || "");
      setBobotKriteria(kriteriaToEdit.bobot_kriteria || "");
      setTipeKriteria(kriteriaToEdit.tipe_kriteria || "Benefit");
      setDeskripsi(kriteriaToEdit.keterangan || "");
    }
  }, [isOpen, kriteriaToEdit, kriteria]);

  const handleUpdate = async () => {
    if (!namaKriteria || !bobotKriteria || !tipeKriteria) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const bobot = parseFloat(bobotKriteria);
    if (isNaN(bobot) || bobot <= 0) {
      toast.error("Bobot Kriteria harus berupa angka positif!");
      return;
    }

    // Check if updating this bobot will exceed 100%
    if (totalBobot + bobot > 100) {
      const sisaBobot = 100 - totalBobot;
      toast.error(
        `Bobot melebihi batas! Total akan menjadi ${totalBobot + bobot}%. Maksimal yang bisa digunakan: ${sisaBobot}%`
      );
      return;
    }

    setLoading(true);
    try {
      await editKriteria(kriteriaToEdit.id_kriteria, {
        nama_kriteria: namaKriteria,
        bobot_kriteria: bobot,
        tipe_kriteria: tipeKriteria,
        keterangan: deskripsi,
      });

      toast.success("Kriteria berhasil diperbarui!");
      onClose();
    } catch (error) {
      toast.error("Gagal memperbarui kriteria!");
      console.error("Error updating kriteria:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if save button should be disabled
  const currentBobot = parseFloat(bobotKriteria) || 0;
  const willExceed = totalBobot + currentBobot > 100;
  const canSave = namaKriteria && bobotKriteria && !willExceed && currentBobot > 0;
  const sisaBobot = 100 - totalBobot;

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <div className="flex items-start justify-between p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold">Edit Kriteria</h3>
      </div>
      <Modal.Body>
        <div className="space-y-6">
          {/* Nama Kriteria */}
          <div>
            <Label htmlFor="criteriaName" value="Nama Kriteria" />
            <TextInput
              id="criteriaName"
              placeholder="Nama Kriteria"
              value={namaKriteria}
              onChange={(e) => setNamaKriteria(e.target.value)}
              required
            />
          </div>

          {/* Bobot */}
          <div>
            <Label htmlFor="bobot" value="Bobot (%)" />
            <TextInput
              id="bobot"
              type="number"
              placeholder="Bobot"
              value={bobotKriteria}
              onChange={(e) => setBobotKriteria(e.target.value)}
              required
              min="0"
              max={sisaBobot}
            />
            <div className="text-sm mt-1 space-y-1">
              <p className="text-gray-500">
                Total bobot kriteria lain:{" "}
                <span className="font-semibold text-gray-700">{totalBobot}%</span>
              </p>
              <p className="text-gray-500">
                Bobot asli kriteria ini:{" "}
                <span className="font-semibold text-blue-600">{originalBobot}%</span>
              </p>
              <p className="text-gray-500">
                Maksimal bobot yang bisa digunakan:{" "}
                <span className="font-semibold text-blue-600">{sisaBobot}%</span>
              </p>
              {currentBobot > 0 && (
                <p className={`font-semibold ${willExceed ? "text-red-500" : "text-green-600"}`}>
                  Total setelah diubah: {totalBobot + currentBobot}%
                  {willExceed && " (Melebihi batas!)"}
                </p>
              )}
            </div>
          </div>

          {/* Tipe Kriteria */}
          <div>
            <Label htmlFor="tipeKriteria" value="Tipe Kriteria" />
            <Select
              id="tipeKriteria"
              value={tipeKriteria}
              onChange={(e) => setTipeKriteria(e.target.value)}
              required
            >
              <option value="Benefit">Benefit</option>
              <option value="Cost">Cost</option>
            </Select>
          </div>

          {/* Deskripsi Kriteria */}
          <div>
            <Label htmlFor="deskripsi" value="Deskripsi Kriteria" />
            <Textarea
              id="deskripsi"
              placeholder="Deskripsi Kriteria"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={handleUpdate}
          disabled={loading || !canSave}
          className="bg-emerald-500 hover:bg-emerald-700 text-white disabled:opacity-50"
          title={willExceed ? "Bobot akan melebihi 100%" : ""}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white">
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
