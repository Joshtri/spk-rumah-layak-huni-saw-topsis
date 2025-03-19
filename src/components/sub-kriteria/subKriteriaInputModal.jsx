import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import { useKriteriaContext } from "@/contexts/KriteriaContext"; // Untuk dropdown Kriteria
import { useSubKriteria } from "@/hooks/useSubKriteria"; // Gunakan hooks sub-kriteria
import { toast } from "sonner"; // Untuk notifikasi

export default function SubKriteriaInputModal({ isOpen, onClose, idKriteria }) {
  const { kriteria } = useKriteriaContext(); // Ambil daftar kriteria
  const { addSubKriteria } = useSubKriteria(); // Gunakan hooks untuk tambah sub-kriteria
  const [selectedKriteriaId, setSelectedKriteriaId] = useState("");
  const [subKriteriaName, setSubKriteriaName] = useState("");
  const [bobotSubKriteria, setBobotSubKriteria] = useState("");
  const [loading, setLoading] = useState(false);

  // Set selectedKriteriaId otomatis jika idKriteria tersedia
  useEffect(() => {
    if (idKriteria) {
      setSelectedKriteriaId(idKriteria.toString());
    } else {
      setSelectedKriteriaId("");
    }
  }, [idKriteria, isOpen]);

  const handleSave = async () => {
    if (!selectedKriteriaId || !subKriteriaName || !bobotSubKriteria) {
      toast.error("Semua field harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await addSubKriteria({
        kriteriaId: parseInt(selectedKriteriaId),
        nama_sub_kriteria: subKriteriaName,
        bobot_sub_kriteria: parseFloat(bobotSubKriteria),
      });

      toast.success("Sub-Kriteria berhasil ditambahkan!");
      setSubKriteriaName("");
      setBobotSubKriteria("");
      setSelectedKriteriaId(idKriteria?.toString() || "");
      onClose();
    } catch (error) {
      toast.error("Gagal menambahkan sub-kriteria!");
      console.error("Error adding sub-kriteria:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="flex items-start justify-between p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold">Tambah Sub-Kriteria</h3>
      </div>
      <Modal.Body>
        <div className="space-y-6">
          {/* Pilihan Kriteria */}
          <div>
            <Label htmlFor="kriteriaId" value="Kriteria" />
            <Select
              id="kriteriaId"
              value={selectedKriteriaId}
              onChange={(e) => setSelectedKriteriaId(e.target.value)}
              required
              disabled={!!idKriteria} // Jika idKriteria ada, dropdown dikunci
            >
              <option value="">Pilih Kriteria</option>
              {kriteria.map((item) => (
                <option key={item.id_kriteria} value={item.id_kriteria}>
                  {item.nama_kriteria}
                </option>
              ))}
            </Select>
          </div>

          {/* Nama Sub-Kriteria */}
          <div>
            <Label htmlFor="subKriteriaName" value="Nama Sub-Kriteria" />
            <TextInput
              id="subKriteriaName"
              placeholder="Nama Sub-Kriteria"
              value={subKriteriaName}
              onChange={(e) => setSubKriteriaName(e.target.value)}
              required
            />
          </div>

          {/* Bobot Sub-Kriteria */}
          <div>
            <Label htmlFor="bobotSubKriteria" value="Bobot Sub-Kriteria" />
            <TextInput
              id="bobotSubKriteria"
              type="number"
              placeholder="Bobot Sub-Kriteria"
              value={bobotSubKriteria}
              onChange={(e) => setBobotSubKriteria(e.target.value)}
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} className="bg-emerald-500 text-white">
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button onClick={onClose} className="bg-red-500 text-white">
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
