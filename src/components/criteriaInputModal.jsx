import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";

export default function CriteriaInputModal({ isOpen, onClose }) {
  const [criteriaName, setCriteriaName] = useState("");
  const [bobot, setBobot] = useState(0);

  return (
    <>
      <Modal
        show={isOpen}
        onClose={onClose}
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner: "relative rounded-lg bg-white shadow dark:bg-slate-900 flex flex-col h-full md:h-auto",
          },
          position: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        }}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl text-white font-semibold">Tambah Kriteria </h3>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            {/* edit nama kriteria */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="criteriaName"
                  value="Nama Kriteria"
                />
              </div>
              <TextInput
                id="criteriaName"
                placeholder="Nama Kriteria"
                value={criteriaName}
                onChange={(event) => setCriteriaName(event.target.value)}
                required
              />
            </div>

            {/* edit bobot */}
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="bobot"
                  value="Bobot"
                />
              </div>
              <TextInput
                id="bobot"
                placeholder="Bobot"
                value={bobot}
                onChange={(event) => setBobot(event.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={onClose}
            className="hover:bg-white hover:text-black border border-white text-white"
          >
            Simpan
          </Button>

          <Button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white border-red-500 hover:border-red-700"
          >
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
