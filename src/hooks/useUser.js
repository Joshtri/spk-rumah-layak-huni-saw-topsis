import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/api/userApi";

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
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    };

    const editUser = async (id, updatedUser) => {
        try {
            const data = await updateUser(id, updatedUser);
            setUsers(users.map((user) => (user.id === id ? data : user)));
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };

    const removeUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };

    return { users, loading, fetchUsers, addUser, editUser, removeUser };
};
