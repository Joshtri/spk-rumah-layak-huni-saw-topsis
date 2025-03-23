// src/context/KriteriaContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllKriteria,
  createKriteria,
  updateKriteria,
  deleteKriteria,
  getKriteriaById as fetchKriteriaById,
  getSubKriteriaByKriteria as fetchSubKriteriaByKriteria
} from "../api/kriteriaApi";

const KriteriaContext = createContext();

export const useKriteriaContext = () => useContext(KriteriaContext);

export const KriteriaProvider = ({ children }) => {
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchKriteria = async () => {
    setLoading(true);
    try {
      const data = await getAllKriteria();
      setKriteria(data);
    } catch (error) {
      console.error("❌ Error fetching kriteria:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  const addKriteria = async (newKriteria) => {
    try {
      const data = await createKriteria(newKriteria);
      setKriteria((prev) => [...prev, data]);
    } catch (error) {
      console.error("❌ Error adding kriteria:", error);
    }
  };

  const editKriteria = async (id, updatedKriteria) => {
    try {
      const data = await updateKriteria(id, updatedKriteria);
      setKriteria((prev) =>
        prev.map((item) => (item.id_kriteria === id ? data : item))
      );
    } catch (error) {
      console.error("❌ Error updating kriteria:", error);
    }
  };

  const removeKriteria = async (id) => {
    try {
      await deleteKriteria(id);
      setKriteria((prev) => prev.filter((item) => item.id_kriteria !== id));
    } catch (error) {
      console.error("❌ Error deleting kriteria:", error);
    }
  };

  const getKriteriaById = async (id) => {
    try {
      return await fetchKriteriaById(id);
    } catch (error) {
      console.error(`❌ Error fetching kriteria ID ${id}:`, error);
      return null;
    }
  };

  const getSubKriteriaByKriteria = async (idKriteria) => {
    try {
      return await fetchSubKriteriaByKriteria(idKriteria);
    } catch (error) {
      console.error(`❌ Error fetching subkriteria ID ${idKriteria}:`, error);
      return [];
    }
  };

  return (
    <KriteriaContext.Provider
      value={{
        kriteria,
        loading,
        fetchKriteria,
        addKriteria,
        editKriteria,
        removeKriteria,
        getKriteriaById,
        getSubKriteriaByKriteria,
      }}
    >
      {children}
    </KriteriaContext.Provider>
  );
};
