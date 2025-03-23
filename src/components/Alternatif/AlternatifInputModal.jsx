import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { toast } from "sonner";

export default function AlternatifInputModal({ isOpen, onClose }) {
    const { addAlternatif } = useAlternatif();
    const [alternatifName, setAlternatifName] = useState("");

    const handleSave = async () => {
        if (!alternatifName) {
            toast.error("Nama Alternatif harus diisi!");
            return;
        }

        try {
            await addAlternatif({ nama_alternatif: alternatifName }); // 🔥 Hanya simpan nama_alternatif
            toast.success("Alternatif berhasil ditambahkan!");
            setAlternatifName("");
            onClose();
        } catch (error) {
          console.log(error);
            toast.error("Gagal menambahkan alternatif!");
        }
    };

    return (
        <Modal show={isOpen} size="md" onClose={onClose}>
            <div className="p-4 border-b rounded-t">
                <h3 className="text-xl text-black font-semibold text-center">Tambah Alternatif</h3>
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
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end">
                <Button onClick={handleSave} className="bg-emerald-500 text-white">Simpan</Button>
                <Button onClick={onClose} className="bg-red-500 text-white">Batal</Button>
            </Modal.Footer>
        </Modal>
    );
}
