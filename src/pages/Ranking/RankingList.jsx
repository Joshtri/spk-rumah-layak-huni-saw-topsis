import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";
import { Select } from "flowbite-react";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { useEffect, useState } from "react";
import ButtonExportToPdf from "../../components/ui/ButtonExportToPdf";
import { Modal, Button as FlowbiteButton, Select as FlowbiteSelect } from "flowbite-react";
import {
  getHasilPerhitungan,
  getHasilPerhitunganByPeriode,
  deleteHasilPerhitungan,
} from "../../api/hasilPerhitunganApi";
import { toast } from "sonner";

export default function RankingList() {
  const { periode } = usePeriodeContext();
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [rankingData, setRankingData] = useState([]);
  const [destroyHasilModalOpen, setDestroyHasilModalOpen] = useState(false);
  const [periodeToDelete, setPeriodeToDelete] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Set default periode to the latest one when periode data is loaded
  useEffect(() => {
    if (periode && periode.length > 0 && !selectedPeriode) {
      // Assuming the latest periode is the last one in the array
      // If you want the one with highest ID, use: Math.max(...periode.map(p => p.id_periode))
      const latestPeriode = periode[periode.length - 1];
      setSelectedPeriode(latestPeriode.id_periode.toString());
    }
  }, [periode, selectedPeriode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedPeriode) {
          // Don't fetch data when no periode is selected
          setRankingData([]);
          return;
        }

        const filtered = await getHasilPerhitunganByPeriode(Number(selectedPeriode));
        setRankingData(filtered);
      } catch (error) {
        console.error("❌ Gagal mengambil data hasil perhitungan:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [selectedPeriode]);

  return (
    <>
      <Layout>
        <BreadCrumbs
          pathArray={[
            { path: "/dashboard", label: "Home" },
            { path: null, label: "Hasil Perhitungan" },
          ]}
        />
        <PageTitle title="Hasil Perhitungan" />

        <div className="flex items-center justify-end mb-4">
          <div className="flex-1 max-w-sm mr-auto">
            <Select
              id="periode"
              value={selectedPeriode}
              onChange={(e) => setSelectedPeriode(e.target.value)}
              required
              className="text-gray-900"
              theme={{
                field: {
                  select: {
                    base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 px-3 py-2.5 text-lg",
                  },
                },
              }}
            >
              {periode?.map((p) => (
                <option
                  key={p.id_periode}
                  value={p.id_periode}
                >
                  {p.nama_periode}
                </option>
              ))}
            </Select>
          </div>
          <FlowbiteButton
            color="failure"
            className="mr-4"
            onClick={() => setDestroyHasilModalOpen(true)}
          >
            Destroy by Periode
          </FlowbiteButton>

          <ButtonExportToPdf
            elementId="ranking-table-print"
            filename="hasil-perhitungan"
            onBeforePrint={() => setIsPrinting(true)}
            onAfterPrint={() => setIsPrinting(false)}
            disabled={!selectedPeriode}
          />
        </div>

        {/* Show message when periode has no data */}
        {rankingData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-lg font-medium">Periode Kosong!</p>
            <p className="text-sm mt-1">
              Periode "{periode?.find((p) => p.id_periode === Number(selectedPeriode))?.nama_periode}" belum memiliki
              hasil perhitungan
            </p>
          </div>
        ) : (
          <>
            {/* Untuk cetak */}
            <div
              id="ranking-table-print"
              className={isPrinting ? "block mb-4" : "hidden"}
              style={{ maxWidth: "100%", width: "100%" }}
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Hasil Perhitungan</h2>
                <p className="text-lg">
                  {periode?.find((p) => p.id_periode === Number(selectedPeriode))?.nama_periode}
                </p>
              </div>
              <RankingTable
                rankings={rankingData}
                disablePagination={true}
                showAllData={true}
              />
            </div>

            {/* Untuk tampilan biasa */}
            <div className={isPrinting ? "hidden" : "block"}>
              <RankingTable
                rankings={rankingData}
                disablePagination={false}
              />
            </div>
          </>
        )}
      </Layout>

      <Modal
        show={destroyHasilModalOpen}
        onClose={() => setDestroyHasilModalOpen(false)}
      >
        <Modal.Header>Hapus Hasil Perhitungan</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pilih periode yang ingin dihapus hasil perhitungannya. Tindakan ini tidak dapat dibatalkan.
            </p>
            <FlowbiteSelect
              value={periodeToDelete}
              onChange={(e) => setPeriodeToDelete(e.target.value)}
              required
            >
              <option value="">Pilih Periode</option>
              {periode?.map((p) => (
                <option
                  key={p.id_periode}
                  value={p.id_periode}
                >
                  {p.nama_periode}
                </option>
              ))}
            </FlowbiteSelect>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <FlowbiteButton
            color="failure"
            onClick={async () => {
              if (!periodeToDelete) return alert("Pilih periode terlebih dahulu.");

              try {
                setIsDeleting(true);
                await deleteHasilPerhitungan(periodeToDelete);
                setDestroyHasilModalOpen(false);
                setPeriodeToDelete("");
                setSelectedPeriode(""); // Reset to show message again
                setRankingData([]); // Clear data

                toast.success("Berhasil menghapus hasil perhitungan PERIODE " + periodeToDelete);
              } catch (err) {
                console.error("Gagal menghapus hasil:", err.response?.data || err.message);
                alert("Terjadi kesalahan saat menghapus.");
              } finally {
                setIsDeleting(false);
              }
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </FlowbiteButton>
          <FlowbiteButton
            color="gray"
            onClick={() => setDestroyHasilModalOpen(false)}
          >
            Batal
          </FlowbiteButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
