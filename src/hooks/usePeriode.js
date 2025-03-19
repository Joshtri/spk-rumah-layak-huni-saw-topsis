import { useState, useEffect } from "react";
import { getAllPeriode, createPeriode, updatePeriode, deletePeriode } from "@/api/periodeApi";

export const usePeriode = () => {
    const [periode, setPeriode] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPeriode();
    }, []);

    const fetchPeriode = async () => {
        setLoading(true);
        try {
            const data = await getAllPeriode();
            setPeriode(data);
        } catch (error) {
            console.error("Error fetching periode:", error);
        }
        setLoading(false);
    };

    const addPeriode = async (newPeriode) => {
        try {
            const data = await createPeriode(newPeriode);
            setPeriode([...periode, data]); // Update state dengan data baru
        } catch (error) {
            console.error("Error adding periode:", error);
            throw error;
        }
    };

    const editPeriode = async (id, updatedPeriode) => {
        try {
            const data = await updatePeriode(id, updatedPeriode);
            setPeriode(periode.map((item) => (item.id_periode === id ? data : item)));
        } catch (error) {
            console.error("Error updating periode:", error);
            throw error;
        }
    };

    const removePeriode = async (id) => {
        try {
            await deletePeriode(id);
            setPeriode(periode.filter((item) => item.id_periode !== id));
        } catch (error) {
            console.error("Error deleting periode:", error);
            throw error;
        }
    };

    return { periode, loading, fetchPeriode, addPeriode, editPeriode, removePeriode };
};
