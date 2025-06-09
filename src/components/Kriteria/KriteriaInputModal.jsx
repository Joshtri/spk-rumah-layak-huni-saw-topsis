import {
  Button,
  Modal,
  TextInput,
  Label,
  Select,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import { toast } from "sonner";

export default function KriteriaInputModal({ isOpen, onClose }) {
  const [namaKriteria, setNamaKriteria] = useState("");
  const [bobotKriteria, setBobotKriteria] = useState("");
  const [tipeKriteria, setTipeKriteria] = useState("Benefit");
  const [deskripsiKriteria, setDeskripsiKriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalBobot, setTotalBobot] = useState(0);
  const [sisaBobot, setSisaBobot] = useState(100);
  
  const { addKriteria, kriteria } = useKriteria();

  // Calculate total bobot from kriteria context
  useEffect(() => {
    if (isOpen) {
      const calculatedTotal = kriteria.reduce((sum, krit) => {
        return sum + (krit.bobot_kriteria || 0);
      }, 0);
      
      setTotalBobot(calculatedTotal);
      setSisaBobot(100 - calculatedTotal);
    }
  }, [isOpen, kriteria]);

  const handleSave = async () => {
    if (!namaKriteria || !bobotKriteria || !tipeKriteria) {
      toast.error("Semua field harus diisi!");
      return;
    }

    const bobot = parseFloat(bobotKriteria);
    if (isNaN(bobot) || bobot <= 0) {
      toast.error("Bobot Kriteria harus berupa angka positif!");
      return;
    }

    // Check if adding this bobot will exceed 100%
    if (totalBobot + bobot > 100) {
      toast.error(
        `Bobot melebihi batas! Total akan menjadi ${totalBobot + bobot}%. Maksimal yang bisa ditambahkan: ${sisaBobot}%`
      );
      return;
    }

    setLoading(true);
    try {
      await addKriteria({
        nama_kriteria: namaKriteria,
        bobot_kriteria: bobot,
        tipe_kriteria: tipeKriteria,
        keterangan: deskripsiKriteria || null,
      });

      toast.success("Kriteria berhasil ditambahkan!");
      setNamaKriteria("");
      setBobotKriteria("");
      setTipeKriteria("Benefit");
      setDeskripsiKriteria("");
      onClose();
    } catch (error) {
      toast.error("Gagal menambahkan kriteria!");
      console.error("Error creating kriteria:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if save button should be disabled
  const currentBobot = parseFloat(bobotKriteria) || 0;
  const willExceed = totalBobot + currentBobot > 100;
  const canSave = namaKriteria && bobotKriteria && !willExceed && currentBobot > 0;

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
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
              min="0"
              max={sisaBobot}
            />
            <div className="text-sm mt-1 space-y-1">
              <p className="text-gray-500">
                Total bobot saat ini:{" "}
                <span className="font-semibold text-gray-700">{totalBobot}%</span>
              </p>
              <p className="text-gray-500">
                Sisa bobot yang tersedia:{" "}
                <span
                  className={
                    sisaBobot === 0
                      ? "text-red-500 font-semibold"
                      : "text-blue-600 font-semibold"
                  }
                >
                  {sisaBobot}%
                </span>
              </p>
              {currentBobot > 0 && (
                <p className={`font-semibold ${willExceed ? "text-red-500" : "text-green-600"}`}>
                  Total setelah ditambah: {totalBobot + currentBobot}%
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
          disabled={loading || !canSave}
          className="bg-emerald-500 hover:bg-emerald-700 text-white disabled:opacity-50"
          title={willExceed ? "Bobot akan melebihi 100%" : ""}
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
