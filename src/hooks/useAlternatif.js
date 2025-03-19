import { useState, useEffect } from "react";
import { getAllAlternatif, createAlternatif, updateAlternatif, deleteAlternatif } from "../api/alternatifApi";

export const useAlternatif = () => {
    const [alternatif, setAlternatif] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlternatif();
    }, []);

    const fetchAlternatif = async () => {
        setLoading(true);
        try {
            const data = await getAllAlternatif();
            setAlternatif(data);
        } catch (error) {
            console.error("Error fetching alternatif:", error);
        }
        setLoading(false);
    };

    const addAlternatif = async (newAlternatif) => {
        try {
            const data = await createAlternatif(newAlternatif);
            setAlternatif([...alternatif, data]); // Update state langsung
        } catch (error) {
            console.error("Error adding alternatif:", error);
            throw error;
        }
    };

    const editAlternatif = async (id, updatedAlternatif) => {
        try {
            const data = await updateAlternatif(id, updatedAlternatif);
            setAlternatif(alternatif.map((item) => (item.id === id ? data : item)));
        } catch (error) {
            console.error("Error updating alternatif:", error);
            throw error;
        }
    };

    const removeAlternatif = async (id) => {
        try {
            await deleteAlternatif(id);
            setAlternatif(alternatif.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting alternatif:", error);
            throw error;
        }
    };

    return { alternatif, loading, fetchAlternatif, addAlternatif, editAlternatif, removeAlternatif };
};
