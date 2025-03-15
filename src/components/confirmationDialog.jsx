import { Modal, Button } from "flowbite-react";

export default function ConfirmationDialog({ isOpen, onClose, toConfirm, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
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
        <h3 className="text-xl text-black font-semibold">Konfirmasi</h3>
      </div>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-lg text-gray-900">{toConfirm}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <Button
          onClick={handleConfirm}
          className="bg-emerald-500 hover:bg-emerald-700 text-white border-emerald-500 hover:border-emerald-700 mr-2"
        >
          Ya
        </Button>
        <Button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white border-red-500 hover:border-red-700"
        >
          Tidak
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
