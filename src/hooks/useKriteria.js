import { useState, useEffect } from "react";
import { getAllKriteria, createKriteria, updateKriteria, deleteKriteria, getKriteriaById as fetchKriteriaById } from "@/api/kriteriaApi";

export const useKriteria = () => {
    const [kriteria, setKriteria] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchKriteria();
    }, []);

    const fetchKriteria = async () => {
        setLoading(true);
        try {
            const data = await getAllKriteria();
            setKriteria(data);
        } catch (error) {
            console.error("Error fetching kriteria:", error);
        }
        setLoading(false);
    };

    const addKriteria = async (newKriteria) => {
        try {
            const data = await createKriteria(newKriteria);
            setKriteria([...kriteria, data]);
        } catch (error) {
            console.error("Error adding kriteria:", error);
        }
    };

    const editKriteria = async (id, updatedKriteria) => {
        try {
            const data = await updateKriteria(id, updatedKriteria);
            setKriteria(kriteria.map((item) => (item.id === id ? data : item)));
        } catch (error) {
            console.error("Error updating kriteria:", error);
        }
    };

    const removeKriteria = async (id) => {
        try {
            await deleteKriteria(id);
            setKriteria(kriteria.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting kriteria:", error);
        }
    };

        // ✅ Tambahkan fungsi getKriteriaById
        const getKriteriaById = async (id) => {
            try {
                const data = await fetchKriteriaById(id);
                return data;
            } catch (error) {
                console.error(`Error fetching kriteria dengan ID ${id}:`, error);
                return null;
            }
        };

    return { kriteria, loading, fetchKriteria, addKriteria, editKriteria, removeKriteria,getKriteriaById };
};
