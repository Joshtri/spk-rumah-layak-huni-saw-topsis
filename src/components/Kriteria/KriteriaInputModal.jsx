import {
  Button,
  Modal,
  TextInput,
  Label,
  Select,
  Textarea,
} from "flowbite-react";
import { useState } from "react";
import { useKriteria } from "../../hooks/useKriteria"; // Import custom hook
import { toast } from "sonner"; // Import sonner untuk notifikasi

export default function KriteriaInputModal({ isOpen, onClose }) {
  const [namaKriteria, setNamaKriteria] = useState("");
  const [bobotKriteria, setBobotKriteria] = useState("");
  const [tipeKriteria, setTipeKriteria] = useState("Benefit"); // Default ke "Benefit"
  const [deskripsiKriteria, setDeskripsiKriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const { addKriteria } = useKriteria(); // Ambil fungsi tambah kriteria dari hook

  const handleSave = async () => {
    if (!namaKriteria || !bobotKriteria || !tipeKriteria) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const bobot = parseFloat(bobotKriteria);
    if (isNaN(bobot)) {
      toast.error("Bobot Kriteria harus berupa angka!");
      return;
    }

    setLoading(true);
    try {
      await addKriteria({
        nama_kriteria: namaKriteria,
        bobot_kriteria: bobot, // ✅ Konversi angka yang aman
        tipe_kriteria: tipeKriteria, // ✅ Pastikan enum sesuai
        keterangan: deskripsiKriteria || null, // ✅ Pastikan tidak kirim string kosong
      });

      toast.success("Kriteria berhasil ditambahkan!");
      setNamaKriteria("");
      setBobotKriteria("");
      setTipeKriteria("Benefit"); // Reset default
      setDeskripsiKriteria("");
      onClose();
    } catch (error) {
      toast.error("Gagal menambahkan kriteria!");
      console.error("Error creating kriteria:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen}  size="md"  onClose={onClose}>
      <div className="flex items-start justify-between p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold">Tambah Kriteria</h3>
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
            <Label htmlFor="deskripsiKriteria" value="Deskripsi Kriteria" />
            <Textarea
              id="deskripsiKriteria"
              placeholder="Deskripsi Kriteria"
              value={deskripsiKriteria}
              onChange={(e) => setDeskripsiKriteria(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-700 text-white"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white"
        >
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
