import { Button, Label, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import { usePenilaianContext as usePenilaian } from "../../contexts/penilaianContext";
import { usePeriodeContext } from "../../contexts/periodeContext";

export default function PenilaianInputForm({
  isEdit = false,
  initialData = {},
}) {
  const { kriteria, loading: kriteriaLoading } = useKriteria();
  const { alternatif, loading: alternatifLoading } = useAlternatif();
  const { addPenilaian, editPenilaian } = usePenilaian();
  // const [periodeList, setPeriodeList] = useState([]);
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { periode: periodeList, loading: periodeLoading } = usePeriodeContext();

  const [selectedAlternatif, setSelectedAlternatif] = useState(
    isEdit ? initialData.alternatifId : ""
  );

  // Move the useState after kriteria is available
  const [nilaiPenilaian, setNilaiPenilaian] = useState(() => {
    if (isEdit && initialData.currentPenilaian && kriteria) {
      return mapPenilaianToState(initialData.currentPenilaian, kriteria);
    }
    return {};
  });

  useEffect(() => {
    if (isEdit && initialData.currentPenilaian && kriteria.length > 0) {
      const mapped = mapPenilaianToState(
        initialData.currentPenilaian,
        kriteria
      );
      setNilaiPenilaian(mapped);
    }
  }, [isEdit, initialData, kriteria]);

  useEffect(() => {
    if (isEdit && initialData.alternatifId) {
      setSelectedAlternatif(String(initialData.alternatifId));
    }
    if (isEdit && initialData.periodeId) {
      setSelectedPeriode(String(initialData.periodeId));
    }
  }, [isEdit, initialData]);

  // Pass kriteria as a parameter to avoid scope issues
  function mapPenilaianToState(penilaian, kriteriaList) {
    const mappedValues = {};

    kriteriaList.forEach((k) => {
      const existing = Object.entries(penilaian).find(
        ([kId]) => Number(kId) === k.id_kriteria
      );

      if (existing) {
        const [kriteriaId, value] = existing;
        const subKriteria = k.subKriteria.find(
          (sub) =>
            sub.nama_sub_kriteria === value.nama &&
            sub.bobot_sub_kriteria === value.bobot
        );
        if (subKriteria) {
          mappedValues[k.id_kriteria] = subKriteria.id_sub_kriteria;
        }
      } else {
        // ❗ Jika belum ada penilaian untuk kriteria ini, isi kosong
        mappedValues[k.id_kriteria] = "";
      }
    });

    return mappedValues;
  }

  const handleChange = (e, kriteriaId) => {
    setNilaiPenilaian({
      ...nilaiPenilaian,
      [kriteriaId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        try {
          for (const kriteriaItem of kriteria) {
            const kriteriaId = kriteriaItem.id_kriteria;
            const subKriteriaId = nilaiPenilaian[kriteriaId];

            if (!subKriteriaId || subKriteriaId === "") {
              toast.error(
                `Sub kriteria untuk "${kriteriaItem.nama_kriteria}" belum dipilih!`
              );
              return;
            }

            const penilaianId =
              initialData.currentPenilaian?.[kriteriaId]?.id_penilaian;

            if (penilaianId) {
              // Sudah ada penilaian, update
              await editPenilaian(penilaianId, {
                alternatifId: selectedAlternatif,
                sub_kriteriaId: subKriteriaId,
                kriteriaId,
                periodeId: selectedPeriode,
              });
            } else {
              // Belum ada, buat baru
              const result = await addPenilaian(
                Number(selectedAlternatif),
                Number(subKriteriaId),
                Number(selectedPeriode)
              );

              if (!result.success) {
                toast.error(result.error);
                return;
              }
            }
          }

          toast.success("Penilaian berhasil diperbarui!");
          navigate("/penilaian", { replace: true });
        } catch (error) {
          console.error(error);
          toast.error("Gagal memperbarui penilaian.");
        }
      } else {
        if (!selectedAlternatif) {
          toast.dismiss();
          toast.error("Pilih alternatif terlebih dahulu!");
          return;
        }

        if (!selectedPeriode) {
          toast.dismiss();
          toast.error("Pilih periode terlebih dahulu!");
          return;
        }

        for (const krit of kriteria) {
          const value = nilaiPenilaian[krit.id_kriteria];
          if (!value || value === "") {
            toast.dismiss();
            toast.error(
              `Sub kriteria untuk "${krit.nama_kriteria}" belum dipilih!`
            );
            return;
          }
        }

        try {
          for (const kriteriaId in nilaiPenilaian) {
            const subKriteriaId = nilaiPenilaian[kriteriaId];
            const result = await addPenilaian(
              Number(selectedAlternatif),
              Number(subKriteriaId),
              Number(selectedPeriode)
            );

            if (!result.success) {
              toast.dismiss();
              toast.error(result.error);
              return;
            }
          }

          toast.success("Penilaian berhasil ditambahkan!");
          setNilaiPenilaian({});
          setSelectedAlternatif("");
          setSelectedPeriode("");

          // ✅ Pindahkan ke sini agar hanya jalan saat berhasil
          navigate("/penilaian");
        } catch (error) {
          console.error(error);
          toast.error("Gagal menambahkan penilaian.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(
        isEdit ? "Gagal memperbarui penilaian." : "Gagal menambahkan penilaian."
      );
    } finally {
      setIsSubmitting(false); // ✅ reset loading
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {isEdit
          ? `Edit Penilaian - ${initialData.alternatifName}`
          : "Form Input Penilaian"}
      </h2>

      <div className="mb-6">
        <Label htmlFor="alternatif" className="text-lg font-semibold">
          Alternatif
        </Label>
        <Select
          id="alternatif"
          value={selectedAlternatif}
          onChange={(e) => setSelectedAlternatif(e.target.value)}
          required
          className="w-full p-2 mt-2 border rounded-lg"
        >
          <option value="">Pilih Alternatif</option>
          {alternatifLoading ? (
            <option>Loading...</option>
          ) : (
            alternatif.map((alt) => (
              <option key={alt.id_alternatif} value={alt.id_alternatif}>
                {alt.nama_alternatif}
              </option>
            ))
          )}
        </Select>
      </div>

      <div className="mb-6">
        <Label htmlFor="periode" className="text-lg font-semibold">
          Periode
        </Label>
        <Select
          id="periode"
          value={selectedPeriode}
          onChange={(e) => setSelectedPeriode(e.target.value)}
          required
          className="w-full p-2 mt-2 border rounded-lg"
        >
          <option value="">Pilih Periode</option>
          {periodeLoading ? (
            <option disabled>Loading...</option>
          ) : (
            periodeList.map((periode) => (
              <option key={periode.id_periode} value={periode.id_periode}>
                {periode.nama_periode || `Periode ${periode.id_periode}`}
              </option>
            ))
          )}
        </Select>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {kriteriaLoading ? (
          <p>Loading kriteria...</p>
        ) : (
          kriteria.map((krit) => (
            <div key={krit.id_kriteria} className="flex flex-col">
              <Label
                htmlFor={`kriteria-${krit.id_kriteria}`}
                className="text-lg font-semibold"
              >
                {krit.nama_kriteria}
              </Label>
              <Select
                id={`kriteria-${krit.id_kriteria}`}
                value={nilaiPenilaian[krit.id_kriteria] || ""}
                onChange={(e) => handleChange(e, krit.id_kriteria)}
                required
                className="p-2 mt-2 border rounded-lg"
              >
                <option value="">Pilih Sub Kriteria</option>
                {krit.subKriteria.length > 0 ? (
                  krit.subKriteria.map((sub) => (
                    <option
                      key={sub.id_sub_kriteria}
                      value={sub.id_sub_kriteria}
                    >
                      {sub.nama_sub_kriteria} - bobot: {sub.bobot_sub_kriteria}
                    </option>
                  ))
                ) : (
                  <option disabled>Tidak ada sub kriteria</option>
                )}
              </Select>
            </div>
          ))
        )}

        <div className="col-span-full flex justify-end mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            isProcessing={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Penilaian"}
          </Button>
        </div>
      </form>
    </div>
  );
}
