import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState, useEffect } from "react";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { toast } from "sonner";

export default function PeriodeInputModal({ isOpen, onClose, isEdit = false, initialData = null }) {
  const [namaPeriode, setNamaPeriode] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const { addPeriode, editPeriode } = usePeriodeContext();

  // Initialize form with edit data
  useEffect(() => {
    if (isEdit && initialData) {
      setNamaPeriode(initialData.nama_periode);
      setTanggalMulai(new Date(initialData.tanggal_mulai).toISOString().split("T")[0]);
      setTanggalSelesai(new Date(initialData.tanggal_selesai).toISOString().split("T")[0]);
    }
  }, [isEdit, initialData]);

  const handleSave = async () => {
    if (!namaPeriode || !tanggalMulai || !tanggalSelesai) {
      toast.error("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await editPeriode(initialData.id_periode, {
          nama_periode: namaPeriode,
          tanggal_mulai: new Date(tanggalMulai),
          tanggal_selesai: new Date(tanggalSelesai),
        });
        toast.success("Periode berhasil diperbarui!");
      } else {
        await addPeriode({
          nama_periode: namaPeriode,
          tanggal_mulai: new Date(tanggalMulai),
          tanggal_selesai: new Date(tanggalSelesai),
        });
        toast.success("Periode berhasil ditambahkan!");
      }

      // Reset form
      setNamaPeriode("");
      setTanggalMulai("");
      setTanggalSelesai("");
      onClose();
    } catch (error) {
      toast.error(isEdit ? "Gagal memperbarui periode!" : "Gagal menambahkan periode!");
      console.error("Error saving periode:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
        <div className="p-4 border-b rounded-t">
          <h3 className="text-xl text-black font-semibold text-center">{isEdit ? "Edit Periode" : "Tambah Periode"}</h3>
        </div>
        <Modal.Body>
          <div className="space-y-4">
            {/* Nama Periode */}
            <div>
              <Label
                htmlFor="namaPeriode"
                value="Nama Periode"
              />
              <TextInput
                id="namaPeriode"
                placeholder="Masukkan Nama Periode"
                value={namaPeriode}
                onChange={(e) => setNamaPeriode(e.target.value)}
                required
              />
            </div>

            {/* Tanggal Mulai */}
            <div>
              <Label
                htmlFor="tanggalMulai"
                value="Tanggal Mulai"
              />
              <TextInput
                id="tanggalMulai"
                type="date"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                required
              />
            </div>

            {/* Tanggal Selesai */}
            <div>
              <Label
                htmlFor="tanggalSelesai"
                value="Tanggal Selesai"
              />
              <TextInput
                id="tanggalSelesai"
                type="date"
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                required
              />
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
            disabled={loading}
            className="bg-emerald-500 text-white w-1/3"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
