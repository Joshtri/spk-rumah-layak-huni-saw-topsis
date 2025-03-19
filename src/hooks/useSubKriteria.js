import { useState, useEffect } from "react";
import { getAllSubKriteria, createSubKriteria, updateSubKriteria, deleteSubKriteria } from "@/api/subKriteriaApi";

export const useSubKriteria = () => {
  const [subKriteria, setSubKriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubKriteria();
  }, []);

  const fetchSubKriteria = async () => {
    setLoading(true);
    try {
      const data = await getAllSubKriteria();
      setSubKriteria(data);
    } catch (error) {
      console.error("Error fetching sub-kriteria:", error);
    }
    setLoading(false);
  };

  const addSubKriteria = async (newSubKriteria) => {
    try {
      const data = await createSubKriteria(newSubKriteria);
      setSubKriteria((prev) => [...prev, data]); // Update state langsung
      return data;
    } catch (error) {
      console.error("Error adding sub-kriteria:", error);
      throw error;
    }
  };

  const editSubKriteria = async (id, updatedSubKriteria) => {
    try {
      const data = await updateSubKriteria(id, updatedSubKriteria);
      setSubKriteria((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
    } catch (error) {
      console.error("Error updating sub-kriteria:", error);
      throw error;
    }
  };

  const removeSubKriteria = async (id) => {
    try {
      await deleteSubKriteria(id);
      setSubKriteria((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting sub-kriteria:", error);
      throw error;
    }
  };

  return { subKriteria, loading, fetchSubKriteria, addSubKriteria, editSubKriteria, removeSubKriteria };
};
