"use client";

import { Loader } from "lucide-react";
import userActions from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCard } from "@/components/UserCard";
import { deleteUser } from "@/actions/user/deleteUser";
import { AddUserDialog } from "@/components/AddUserData";
import { EditUserData } from "@/components/EditUserData";
import { useState, useEffect, useCallback } from "react";
import { PrinterDevicesDialog } from "@/components/PrinterDevicesDialog";

interface UserCollection {
    userID: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

export default function Users() {
    const [loading, setLoading] = useState<boolean>(true);
    const [adduser, setAdduser] = useState<boolean>(false);
    const [edituser, setEdituser] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [addPrinter, setAddPrinter] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserCollection[]>([]);
    const [editingUser, setEditingUser] = useState<UserCollection | null>(null);
    const [id, setID] = useState<string>("");

    // Edit Data
    const handleEdit = (user: UserCollection) => {
        setEdituser(true);
        setEditingUser(user);
    };

    // Update Data
    const handleUpdate = async (user: UserCollection) => {
        const response = await userActions.updateUser(user);
        if (response.success) {
            setMessage(response.message);
        } else {
            setError(response.message);
        }
        fetchUsers();
        setTimeout(() => {
            setError("");
            setMessage("");
        }, 5000);
    };

    // Handle Add Printer Details
    const handlePrinter = (userID: string) => {
        setAddPrinter(true);
        setID(userID);
    };

    // Delete Data
    const handleDelete = async (userID: string) => {
        const response = await deleteUser(userID);
        if (response.success) {
            setMessage(response.message);
        } else {
            setError(response.message);
        }
        fetchUsers();
        setTimeout(() => {
            setError("");
            setMessage("");
        }, 5000);
    };

    // Fetch users from the database
    const fetchUsers = async () => {
        try {
            const data = await userActions.fetchUsers();
            if (data.success) {
                if (data.user) {
                    setUserData(data.user);
                }
            } else {
                setError(data.message || "Error fetching users");
            }
        } catch (error) {
            console.log(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    // Filter users by roles
    const groupUsersByRole = useCallback(() => {
        const grouped: Record<string, UserCollection[]> = {
            admin: [],
            customer: [],
            designer: [],
            printer: [],
        };

        const lowerCaseQuery = searchQuery.toLowerCase();

        userData.forEach((user) => {
            if (grouped[user.role] && (user.name.toLowerCase().includes(lowerCaseQuery) || user.email.toLowerCase().includes(lowerCaseQuery))) {
                grouped[user.role].push(user);
            }
        });

        return grouped;
    }, [userData, searchQuery]);

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-82px)] spinner">
                <Loader size={48} className="animate-spin" />
            </div>
        );
    }

    const groupedUsers = groupUsersByRole();

    return (
        <div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">{message}</div>}

            {/* Search and Add User Button */}
            <div className="flex gap-4 mb-4">
                <Input type="text" placeholder="Search by name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
                <Button variant="default" onClick={() => setAdduser(true)}>Add User</Button>
            </div>

            {/* User Sections */}
            {Object.keys(groupedUsers).map((role) => (
                <div key={role} className="mb-6">
                    <h2 className="text-xl font-semibold capitalize mb-4">{role}s</h2>
                    <div className="flex flex-wrap gap-6">
                        {groupedUsers[role].length === 0 ? (
                            <p>No {role}s found</p>
                        ) : (
                            groupedUsers[role].map((user) => (
                                <UserCard key={user.userID} user={user} onEdit={handleEdit} onDelete={handleDelete} addPrinter={() => handlePrinter(user.userID)} />
                            ))
                        )}
                    </div>
                </div>
            ))}

            {addPrinter && id && (
                <PrinterDevicesDialog open={addPrinter} onOpenChange={(open) => !open && setAddPrinter(false)} userID={id} />
            )}

            {edituser && editingUser && (
                <EditUserData user={editingUser} open={edituser} onOpenChange={(open) => { if (!open) { setEdituser(false); setEditingUser(null); } }} onSave={handleUpdate} />
            )}

            {adduser && (
                <AddUserDialog open={adduser} onOpenChange={(open) => !open && setAdduser(false)} />
            )}
        </div>
    );
}
