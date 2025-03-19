import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/api/userApi";
import { toast } from "sonner";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    };

    const addUser = async (newUser) => {
        try {
            const data = await createUser(newUser);
            setUsers([...users, data]);
            toast.success("User berhasil ditambahkan!");
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Gagal menambahkan user!");
        }
    };

    const editUser = async (id, updatedUser) => {
        try {
            const data = await updateUser(id, updatedUser);
            setUsers(users.map((user) => (user.id_user === id ? data : user)));
            toast.success("User berhasil diperbarui!");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Gagal mengedit user!");
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id_user !== id));
            toast.success("User berhasil dihapus!");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Gagal menghapus user!");
        }
    };

    return { users, loading, fetchUsers, addUser, editUser, removeUser };
};
