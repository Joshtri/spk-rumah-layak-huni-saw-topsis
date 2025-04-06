import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import { useSubKriteriaContext as useSubKriteria } from "../../contexts/subKriteriaContext";
import { toast } from "sonner";

export default function SubCriteriaEditModal({
  isOpen,
  onClose,
  title,
  subCriteriaBobot,
  idCriteria,
  subCriteriaId,
  refreshSubKriteria,
}) {
  const [subCriteriaName, setSubCriteriaName] = useState(title || "");
  const [bobotSubCriteria, setBobotSubCriteria] = useState(subCriteriaBobot || "");
  const { editSubKriteria } = useSubKriteria();
  const handleSave = async () => {
    try {
      await editSubKriteria(subCriteriaId, {
        kriteriaId: idCriteria,
        nama_sub_kriteria: subCriteriaName,
        bobot_sub_kriteria: parseFloat(bobotSubCriteria),
      });

      // Refresh the table after editing
      await refreshSubKriteria?.();

      toast.success("Sub Kriteria berhasil diperbarui!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui sub kriteria!");
    }
  };

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
          <h3 className="text-xl text-black font-semibold">Edit {title}</h3>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="subCriteriaName"
                  value="Nama Sub Kriteria"
                  className="!text-black !text-lg"
                />
              </div>
              <TextInput
                id="subCriteriaName"
                placeholder={title}
                value={subCriteriaName}
                onChange={(event) => setSubCriteriaName(event.target.value)}
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
                  htmlFor="bobotSubCriteria"
                  value="Bobot Sub Kriteria"
                  className="!text-black !text-lg"
                />
              </div>
              <TextInput
                id="bobotSubCriteria"
                placeholder={subCriteriaBobot}
                value={bobotSubCriteria}
                onChange={(event) => setBobotSubCriteria(event.target.value)}
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
            onClick={handleSave}
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
