import { createContext, useContext, useEffect, useState } from "react";
import {
  daftarAlternatifKePeriode,
  hapusAlternatifDariPeriode,
  getPeriodeByAlternatif,
  getAlternatifByPeriode,
  getAllAlternatifPeriode,
} from "../api/alternatifPeriodeApi";

const AlternatifPeriodeContext = createContext();

export const useAlternatifPeriodeContext = () => useContext(AlternatifPeriodeContext);

export const AlternatifPeriodeProvider = ({ children }) => {
  const [alternatifPeriode, setAlternatifPeriode] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllAlternatifPeriode = async () => {
    setLoading(true);
    try {
      const data = await getAllAlternatifPeriode();
      setAlternatifPeriode(data);
    } catch (error) {
      console.error("❌ Error fetching all alternatif-periode:", error);
    }
    setLoading(false);
  };

  const fetchAlternatifByPeriode = async (periodeId) => {
    if (!periodeId) return;
    setLoading(true);
    try {
      const data = await getAlternatifByPeriode(periodeId);
      setAlternatifPeriode(data);
    } catch (error) {
      console.error("❌ Error fetching alternatif by periode:", error);
    }
    setLoading(false);
  };

  const fetchPeriodeByAlternatif = async (alternatifId) => {
    if (!alternatifId) return;
    setLoading(true);
    try {
      const data = await getPeriodeByAlternatif(alternatifId);
      setAlternatifPeriode(data);
    } catch (error) {
      console.error("❌ Error fetching periode by alternatif:", error);
    }
    setLoading(false);
  };

  const daftarAlternatifPeriode = async (alternatifId, periodeId) => {
    try {
      await daftarAlternatifKePeriode(alternatifId, periodeId);
      await fetchAllAlternatifPeriode();
    } catch (error) {
      console.error("❌ Error registering alternatif to periode:", error);
      throw error;
    }
  };

  const hapusAlternatif = async (alternatifId, periodeId) => {
    try {
      await hapusAlternatifDariPeriode(alternatifId, periodeId);
      await fetchAllAlternatifPeriode();
    } catch (error) {
      console.error("❌ Error removing alternatif from periode:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllAlternatifPeriode();
  }, []);

  return (
    <AlternatifPeriodeContext.Provider
      value={{
        alternatifPeriode,
        loading,
        fetchAllAlternatifPeriode,
        fetchAlternatifByPeriode,
        fetchPeriodeByAlternatif,
        daftarAlternatifPeriode,
        hapusAlternatif,
      }}
    >
      {children}
    </AlternatifPeriodeContext.Provider>
  );
};
