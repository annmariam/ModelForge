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
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface UserCollection {
    userID: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

export default function Users() {
    const [filter, setFilter] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [adduser, setAdduser] = useState<boolean>(false);
    const [edituser, setEdituser] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [addPrinter, setAddPrinter] = useState<boolean>(false); 
    const [userData, setUserData] = useState<UserCollection[]>([]);
    const [filteredData, setFilteredData] = useState<UserCollection[]>([]);
    const [editingUser, setEditingUser] = useState<UserCollection | null>(null);
    const [id, setID] = useState<string>("");

    // Edit Data
    const handleEdit = (user: UserCollection) => {
        console.log("Edit user with ID:", user.userID);
        setEdituser(true);
        setEditingUser(user);
    };

    // Update Data
    const handleUpdate = (user: UserCollection) => {
        console.log("Update user with ID:", user.userID);
    };

    // Handle Add Printer Details
    const handlePrinter = (userID: string) => {
        setAddPrinter(true);
        setID(userID);
    }

    // Delete Data
    const handleDelete = async(userID: string) => {
        console.log("Delete user with ID:", userID);
        const response = await deleteUser(userID);
        if (response.success) {
            setMessage(response.message);
        } else {    
            setError(response.message);
        }
        fetch();
        setTimeout(() => {
            setError("");
            setMessage("");
        }, 5000);
    };

    // Fetch users from the database
    const fetch = async () => {
        try {
            const data = await userActions.fetchUsers();
            setUserData(data);
            setFilteredData(data);
        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    // Filter users based on role or search query
    const applyFilters = useCallback(() => {
        let filtered = userData;

        if (filter !== "all") {
            filtered = filtered.filter((user) => user.role === filter);
        }

        if (searchQuery) {
            filtered = filtered.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [userData, filter, searchQuery]);

    // Handle filter change
    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        applyFilters();
    };

    // Handle search query change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        applyFilters();
    };

    useEffect(() => {
        fetch();
        applyFilters();
    }, [applyFilters, filter, searchQuery]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-82px)] spinner">
                <Loader size={48} className="animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {error && <div className="alert alert-error">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            
            {/* Filter and Search Options */}
            <div className="flex gap-4 mb-4">
                <Input type="text" placeholder="Search by name or email" value={searchQuery} onChange={handleSearchChange} className="w-full" />
                <Select onValueChange={handleFilterChange} value={filter}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="printer">Printer</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant={"default"} onClick={() => setAdduser(true)}>Add User</Button>
            </div>

            {/* UserCard View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length === 0 ? (
                    <div className="alert alert-info">No users found</div>
                ) : (
                    filteredData.map((user) => ( <UserCard key={user.userID} user={user} onEdit={handleEdit} onDelete={handleDelete} addPrinter={() => handlePrinter(user.userID)} /> ))
                )}
            </div>

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
