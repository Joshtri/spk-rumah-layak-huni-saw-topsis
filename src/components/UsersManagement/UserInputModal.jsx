import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import { useUsersContext  } from "../../contexts/usersContext";
import { toast } from "sonner";

export default function UserInputModal({ isOpen, onClose, refresh }) {
  const { addUser } = useUsersContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleSave = async () => {
    if (!username || !email || !password) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      await addUser({ username, email, password, role });
      toast.success("User berhasil ditambahkan!");
      setUsername("");
      setEmail("");
      setPassword("");
      onClose();
      refresh();
    } catch (error) {
      toast.error("Gagal menambahkan user!");
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <div className="p-4 border-b rounded-t">
        <h3 className="text-xl text-black font-semibold">Tambah User</h3>
      </div>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
