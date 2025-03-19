import { useEffect, useState } from "react";
import { Button, Modal, TextInput, Label, Select, Textarea } from "flowbite-react";
import { toast } from "sonner";
import { useKriteria } from "@/hooks/useKriteria"; // Import hook

export default function KriteriaEditModal({ isOpen, onClose, kriteria }) {
  const [namaKriteria, setNamaKriteria] = useState("");
  const [bobotKriteria, setBobotKriteria] = useState("");
  const [tipeKriteria, setTipeKriteria] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateKriteria } = useKriteria(); // Fungsi update

  // 🔹 Update state saat modal dibuka dengan data yang didapat dari API
  useEffect(() => {
    if (isOpen && kriteria) {
      setNamaKriteria(kriteria.nama_kriteria || "");
      setBobotKriteria(kriteria.bobot_kriteria || "");
      setTipeKriteria(kriteria.tipe_kriteria || "Benefit");
      setDeskripsi(kriteria.keterangan || "");
    }
  }, [isOpen, kriteria]);

  const handleUpdate = async () => {
    if (!namaKriteria || !bobotKriteria || !tipeKriteria) {
      toast.error("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await updateKriteria({
        id: kriteria.id, // Pastikan ID dikirim
        nama_kriteria: namaKriteria,
        bobot_kriteria: parseFloat(bobotKriteria),
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

  return (
    <Modal show={isOpen} onClose={onClose}>
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
            />
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
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-700 text-white"
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
