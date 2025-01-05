"use client";

import fetchUsers from "@/actions/fetchUsers";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Pencil, Trash2 } from "lucide-react";
import { EditUserData } from "@/components/EditUserData";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface UserCollection {
    userID: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

export default function Users() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUserData] = useState<UserCollection[]>([]);
    const [filteredData, setFilteredData] = useState<UserCollection[]>([]);
    const [editingUser, setEditingUser] = useState<UserCollection | null>(null);
    const [filter, setFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Edit Data
    const handleEdit = (user: UserCollection) => {
        console.log("edit");
        setEditingUser(user);
    };

    // Update Data
    const handleUpdate = (user: UserCollection) => {
        console.log("Update user with ID:", user);
    };

    // Delete Data
    const handleDelete = (userID: string) => {
        console.log("Delete user with ID:", userID);
    };

    // Fetch users from the database
    const fetch = async () => {
        try {
            const data = await fetchUsers();
            setUserData(data);
            setFilteredData(data);
        } catch (error) {
            console.error(error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    // Badge color based on role
    const roleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-500 text-white">Admin</Badge>;
            case "customer":
                return <Badge className="bg-blue-500 text-white">Customer</Badge>;
            case "designer":
                return <Badge className="bg-green-500 text-white">Designer</Badge>;
            case "printer":
                return <Badge className="bg-purple-500 text-white">Printer</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">--</Badge>;
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
    }, []);

    useEffect(() => {
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
            
            {/* Filter and Search Options */}
            <div className="flex gap-4 mb-4">
                <Input type="text" placeholder="Search by name or email" value={searchQuery} onChange={handleSearchChange} className="w-1/3" />
                <Select onValueChange={handleFilterChange} value={filter}>
                    <SelectTrigger>
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
            </div>

            <Table>
                <TableCaption>A list of users in the system.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Photo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No users found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredData.map((user) => (
                            <TableRow key={user.userID}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={user.photoURL} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{roleBadge(user.role)}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => handleEdit(user)} variant="ghost" size="sm" className="mr-2">
                                        <Pencil size={16} />
                                    </Button>
                                    <Button onClick={() => handleDelete(user.userID)} variant="ghost" size="sm">
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {editingUser && (
                <EditUserData user={editingUser} open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)} onSave={handleUpdate} />
            )}
        </div>
    );
}
