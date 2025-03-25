import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllAlternatif,
  createAlternatif,
  updateAlternatif,
  deleteAlternatif,
} from "../api/alternatifApi";

const AlternatifContext = createContext();

export const useAlternatifContext = () => useContext(AlternatifContext);

export const AlternatifProvider = ({ children }) => {
  const [alternatif, setAlternatif] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlternatif = async () => {
    setLoading(true);
    try {
      const data = await getAllAlternatif();
      setAlternatif(data);
    } catch (error) {
      console.error("❌ Error fetching alternatif:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlternatif();
  }, []);

  const addAlternatif = async (newAlternatif) => {
    try {
      const data = await createAlternatif(newAlternatif);
      setAlternatif((prev) => [...prev, data]);
      await fetchAlternatif();
    } catch (error) {
      console.error("❌ Error adding alternatif:", error);
      throw error;
    }
  };

  const editAlternatif = async (id_alternatif, updatedAlternatif) => {
    try {
      const data = await updateAlternatif(id_alternatif, updatedAlternatif);
      setAlternatif((prev) =>
        prev.map((item) =>
          item.id_alternatif === id_alternatif ? data : item
        )
      );
    } catch (error) {
      console.error("❌ Error updating alternatif:", error);
      throw error;
    }
  };

  const removeAlternatif = async (id_alternatif) => {
    try {
      await deleteAlternatif(id_alternatif);
      setAlternatif((prev) =>
        prev.filter((item) => item.id_alternatif !== id_alternatif)
      );
    } catch (error) {
      console.error("❌ Error deleting alternatif:", error);
      throw error;
    }
  };

  return (
    <AlternatifContext.Provider
      value={{
        alternatif,
        loading,
        fetchAlternatif,
        addAlternatif,
        editAlternatif,
        removeAlternatif,
      }}
    >
      {children}
    </AlternatifContext.Provider>
  );
};
