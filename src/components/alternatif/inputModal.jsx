import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";

export default function AlternatifInputModal({ isOpen, onClose }) {
  const [alternatifName, setAlternatifName] = useState();
  const [periode, setPeriode] = useState();

  return (
    <>
      <Modal
        show={isOpen}
        onClose={onClose}
        theme={{
          root: {
            base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
              on: "flex bg-gray-900 bg-opacity-50",
              off: "hidden",
            },
          },
          content: {
            base: "relative w-full lg:max-w-2xl p-4 md:h-auto",
            inner: "relative rounded-lg bg-gray-100 border-stone-900 border-2 shadow-lg flex flex-col h-full md:h-auto",
          },
          position: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
        }}
      >
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl text-black font-semibold">Tambah Alternatif</h3>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="alternatifName"
                  value="Nama Alternatif"
                  className="!text-black !text-lg"
                />
              </div>
              <TextInput
                id="alternatifName"
                placeholder="Nama Alternatif"
                value={alternatifName}
                onChange={(event) => setAlternatifName(event.target.value)}
                required
                theme={{
                  field: {
                    input: {
                      base: "block w-full h-8 border disabled:cursor-not-allowed disabled:opacity-50 !bg-gray-50 border-gray-300 !text-gray-900 focus:border-blue-500 focus:ring-blue-500 !px-3 !py-4 !text-lg",
                    },
                  },
                }}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="alamat"
                  value="Alamat"
                  className="!text-black !text-lg"
                />
              </div>
              <TextInput
                id="alamat"
                placeholder="Alamat"
                value={periode}
                onChange={(event) => setPeriode(event.target.value)}
                required
                theme={{
                  field: {
                    input: {
                      base: "block w-full h-8 border disabled:cursor-not-allowed disabled:opacity-50 !bg-gray-50 border-gray-300 !text-gray-900 focus:border-blue-500 focus:ring-blue-500 !px-3 !py-4 !text-lg",
                    },
                  },
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-700 text-white border-emerald-500 hover:border-emerald-700 mr-2"
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
