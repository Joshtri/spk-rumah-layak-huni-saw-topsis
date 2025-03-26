import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getAllPeriode, createPeriode, updatePeriode, deletePeriode } from "../api/periodeApi";

const PeriodeContext = createContext();

export const usePeriodeContext = () => useContext(PeriodeContext);

export const PeriodeProvider = ({ children }) => {
  const [periode, setPeriode] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Bungkus fetchPeriode pakai useCallback
  const fetchPeriode = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPeriode();
      setPeriode(data);
    } catch (error) {
      console.error("❌ Error fetching periode:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeriode();
  }, [fetchPeriode]); // aman karena useCallback

  const addPeriode = async (newPeriode) => {
    try {
      const data = await createPeriode(newPeriode);
      setPeriode((prev) => [...prev, data]);
    } catch (error) {
      console.error("❌ Error adding periode:", error);
      throw error;
    }
  };

  const editPeriode = async (id, updatedPeriode) => {
    try {
      const data = await updatePeriode(id, updatedPeriode);
      setPeriode((prev) => prev.map((item) => (item.id_periode === id ? data : item)));
    } catch (error) {
      console.error("❌ Error updating periode:", error);
      throw error;
    }
  };

  const removePeriode = async (id) => {
    try {
      await deletePeriode(id);
      setPeriode((prev) => prev.filter((item) => item.id_periode !== id));
    } catch (error) {
      console.error("❌ Error deleting periode:", error);
      throw error;
    }
  };

  return (
    <PeriodeContext.Provider
      value={{
        periode,
        loading,
        fetchPeriode,
        addPeriode,
        editPeriode,
        removePeriode,
      }}
    >
      {children}
    </PeriodeContext.Provider>
  );
};
