import Layout from "../Layout";
import RankingTable from "../../components/ranking/table";
import PageTitle from "../../components/ui/PageTitle";
import BreadCrumbs from "../../components/ui/Breadcrumbs";
import { Select } from "flowbite-react";
import { usePeriodeContext } from "../../contexts/periodeContext";
import { useEffect, useState } from "react";
import ButtonExportToPdf from "../../components/ui/ButtonExportToPdf";
import {
  Modal,
  Button as FlowbiteButton,
  Select as FlowbiteSelect,
} from "flowbite-react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedPeriode) {
          const allData = await getHasilPerhitungan();
          setRankingData(allData);
        } else {
          const filtered = await getHasilPerhitunganByPeriode(
            Number(selectedPeriode)
          );
          setRankingData(filtered);
        }
      } catch (error) {
        console.error(
          "❌ Gagal mengambil data hasil perhitungan:",
          error.response?.data || error.message
        );
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
              <option value="">Semua Periode</option>
              {periode?.map((p) => (
                <option key={p.id_periode} value={p.id_periode}>
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
          />
        </div>

        {/* Untuk cetak */}
        <div
          id="ranking-table-print"
          className={isPrinting ? "block mb-4" : "hidden"}
          style={{ maxWidth: "100%", width: "100%" }}
        >
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Hasil Perhitungan</h2>
            <p className="text-lg">
              {periode?.find((p) => p.id_periode === Number(selectedPeriode))
                ?.nama_periode || "Semua Periode"}
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
          <RankingTable rankings={rankingData} disablePagination={false} />
        </div>
      </Layout>

      <Modal
        show={destroyHasilModalOpen}
        onClose={() => setDestroyHasilModalOpen(false)}
      >
        <Modal.Header>Hapus Hasil Perhitungan</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pilih periode yang ingin dihapus hasil perhitungannya. Tindakan
              ini tidak dapat dibatalkan.
            </p>
            <FlowbiteSelect
              value={periodeToDelete}
              onChange={(e) => setPeriodeToDelete(e.target.value)}
              required
            >
              <option value="">Pilih Periode</option>
              {periode?.map((p) => (
                <option key={p.id_periode} value={p.id_periode}>
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
              if (!periodeToDelete)
                return alert("Pilih periode terlebih dahulu.");

              try {
                setIsDeleting(true);
                await deleteHasilPerhitungan(periodeToDelete);
                setDestroyHasilModalOpen(false);
                setPeriodeToDelete("");
                setSelectedPeriode(""); // Refresh ke semua
                const newData = await getHasilPerhitungan();

                toast.success("Berhasil menghapus hasil perhitungan PERIODE " + periodeToDelete);
                setRankingData(newData);
              } catch (err) {
                console.error(
                  "Gagal menghapus hasil:",
                  err.response?.data || err.message
                );
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
