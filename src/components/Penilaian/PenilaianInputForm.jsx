import { useState, useEffect } from "react";
import { useKriteria } from "../../hooks/useKriteria";
import { useAlternatif } from "../../hooks/useAlternatif";
import { usePenilaian } from "../../hooks/usePenilaian";
import { toast } from "sonner";
import { Button, Label, Select } from "flowbite-react";

export default function PenilaianInputForm() {
  const { kriteria, loading: kriteriaLoading } = useKriteria();
  const { alternatif, loading: alternatifLoading } = useAlternatif();
  const { addPenilaian } = usePenilaian();

  const [selectedAlternatif, setSelectedAlternatif] = useState("");
  const [nilaiPenilaian, setNilaiPenilaian] = useState({});

  // Handle perubahan nilai pada setiap kriteria
  const handleChange = (e, kriteriaId) => {
    setNilaiPenilaian({
      ...nilaiPenilaian,
      [kriteriaId]: e.target.value,
    });
  };

  // Submit penilaian
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlternatif) {
      toast.error("Pilih alternatif terlebih dahulu!");
      return;
    }

    try {
      // Loop untuk menyimpan semua penilaian berdasarkan kriteria
      for (const kriteriaId in nilaiPenilaian) {
        await addPenilaian(selectedAlternatif, kriteriaId, nilaiPenilaian[kriteriaId]);
      }

      toast.success("Penilaian berhasil ditambahkan!");
      setNilaiPenilaian({});
    } catch (error) {
      toast.error("Gagal menambahkan penilaian.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Form Input Penilaian
      </h2>

      {/* Pilih Alternatif */}
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
            <option value="">Loading...</option>
          ) : (
            alternatif.map((alt) => (
              <option key={alt.id_alternatif} value={alt.id_alternatif}>
                {alt.nama_alternatif}
              </option>
            ))
          )}
        </Select>
      </div>

      {/* Form Input Kriteria */}
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
                      {sub.nama_sub_kriteria}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Tidak ada sub kriteria
                  </option>
                )}
              </Select>
            </div>
          ))
        )}

        {/* Submit Button */}
        <div className="col-span-full flex justify-end mt-6">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Simpan Penilaian
          </Button>
        </div>
      </form>
    </div>
  );
}
