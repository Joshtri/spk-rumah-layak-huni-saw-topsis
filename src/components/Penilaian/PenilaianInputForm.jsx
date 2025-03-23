import { useState } from "react";
import { useKriteriaContext as useKriteria } from "../../contexts/kriteriaContext";
import { useAlternatifContext as useAlternatif } from "../../contexts/alternatifContext";
import { usePenilaianContext as usePenilaian } from "../../contexts/penilaianContext";
import { toast } from "sonner";
import { Button, Label, Select } from "flowbite-react";

export default function PenilaianInputForm() {
  const { kriteria, loading: kriteriaLoading } = useKriteria();
  const { alternatif, loading: alternatifLoading } = useAlternatif();
  const { addPenilaian } = usePenilaian();

  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [nilaiPenilaian, setNilaiPenilaian] = useState({});

  const handleChange = (e, kriteriaId) => {
    setNilaiPenilaian({
      ...nilaiPenilaian,
      [kriteriaId]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlternatif) {
      toast.error("Pilih alternatif terlebih dahulu!");
      return;
    }

    for (const krit of kriteria) {
      const value = nilaiPenilaian[krit.id_kriteria];
      if (!value || value === "") {
        toast.error(`Sub kriteria untuk "${krit.nama_kriteria}" belum dipilih!`);
        return;
      }
    }

    try {
      for (const kriteriaId in nilaiPenilaian) {
        const subKriteriaId = nilaiPenilaian[kriteriaId];
        await addPenilaian(Number(selectedAlternatif), Number(subKriteriaId));
      }

      toast.success("Penilaian berhasil ditambahkan!");
      setNilaiPenilaian({});
      setSelectedAlternatif("");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan penilaian.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Form Input Penilaian
      </h2>

      <div className="mb-6">
        <Label htmlFor="alternatif" className="text-lg font-semibold">
          Pilih Alternatif
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kriteriaLoading ? (
          <p>Loading kriteria...</p>
        ) : (
          kriteria.map((krit) => (
            <div key={krit.id_kriteria} className="flex flex-col">
              <Label htmlFor={`kriteria-${krit.id_kriteria}`} className="text-lg font-semibold">
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
                    <option key={sub.id_sub_kriteria} value={sub.id_sub_kriteria}>
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
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Simpan Penilaian
          </Button>
        </div>
      </form>
    </div>
  );
}
