"use client";

import { Loader, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PrinterCollection {
    printerID: string;
    name: string;
    status: string;
    location: string;
    ipAddress: string;
    assignedTo: string;
    category: string;
}

export default function AssignedPrint() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [editingPrinter, setEditingPrinter] = useState<PrinterCollection | null>(null);
    const [printers, setPrinters] = useState<PrinterCollection[]>([]);

    const categories = ["All", "Arts", "Science", "Engineering"];
    const statuses = ["All", "Active", "Inactive"];

    const handleEdit = (printer: PrinterCollection) => {
        setEditingPrinter(printer);
    };

    const handleUpdate = async (updatedPrinter: PrinterCollection) => {
        setPrinters(printers.map(p => p.printerID === updatedPrinter.printerID ? updatedPrinter : p));
        setEditingPrinter(null);
        setMessage("Printer updated successfully");
        setTimeout(() => setMessage(null), 5000);
    };

    const handleDelete = async (printerID: string) => {
        setPrinters(printers.filter(p => p.printerID !== printerID));
        setMessage("Printer deleted successfully");
        setTimeout(() => setMessage(null), 5000);
    };

    const fetchPrints = async () => {
        setPrinters([
            { printerID: '1', name: 'Printer 1', status: 'Active', location: 'Office A', ipAddress: '192.168.1.100', assignedTo: 'John Doe', category: 'Arts' },
            { printerID: '2', name: 'Printer 2', status: 'Inactive', location: 'Office B', ipAddress: '192.168.1.101', assignedTo: 'Jane Smith', category: 'Science' },
            { printerID: '3', name: 'Printer 3', status: 'Active', location: 'Office C', ipAddress: '192.168.1.102', assignedTo: 'Bob Johnson', category: 'Engineering' },
            { printerID: '4', name: 'Printer 4', status: 'Active', location: 'Office D', ipAddress: '192.168.1.103', assignedTo: 'Alice Brown', category: 'Arts' },
            { printerID: '5', name: 'Printer 5', status: 'Active', location: 'Office A', ipAddress: '192.168.1.100', assignedTo: 'John Doe', category: 'Arts' },
            { printerID: '6', name: 'Printer 6', status: 'Inactive', location: 'Office B', ipAddress: '192.168.1.101', assignedTo: 'Jane Smith', category: 'Science' },
            { printerID: '7', name: 'Printer 7', status: 'Active', location: 'Office C', ipAddress: '192.168.1.102', assignedTo: 'Bob Johnson', category: 'Engineering' },
            { printerID: '8', name: 'Printer 8', status: 'Active', location: 'Office D', ipAddress: '192.168.1.103', assignedTo: 'Alice Brown', category: 'Arts' },
            { printerID: '9', name: 'Printer 9', status: 'Active', location: 'Office A', ipAddress: '192.168.1.100', assignedTo: 'John Doe', category: 'Arts' },
            { printerID: '10', name: 'Printer 10', status: 'Inactive', location: 'Office B', ipAddress: '192.168.1.101', assignedTo: 'Jane Smith', category: 'Science' },
            { printerID: '11', name: 'Printer 11', status: 'Active', location: 'Office C', ipAddress: '192.168.1.102', assignedTo: 'Bob Johnson', category: 'Engineering' },
            { printerID: '12', name: 'Printer 12', status: 'Active', location: 'Office D', ipAddress: '192.168.1.103', assignedTo: 'Alice Brown', category: 'Arts' },
        ])
        setLoading(false);
    };

    useEffect(() => {
        fetchPrints();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-82px)] spinner">
                <Loader size={48} className="animate-spin" />
            </div>
        );
    }

    const filteredPrinters = printers.filter(printer =>
        (printer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        printer.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (categoryFilter.toLowerCase() === 'all' || printer.category.toLowerCase() === categoryFilter.toLowerCase()) &&
        (statusFilter.toLowerCase() === 'all' || printer.status.toLowerCase() === statusFilter.toLowerCase())
    );

    return (
        <div>
            {error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-100 px-4 py-3 rounded relative mb-4" role="alert">
                    {error}
                    <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}
            {message && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-100 px-4 py-3 rounded relative mb-4" role="alert">
                    {message}
                    <button className="absolute top-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <Input type='text' placeholder='Search by Name or Assigned User' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-1/2 dark:bg-gray-800 dark:text-white" />
                <Select onValueChange={(value) => setCategoryFilter(value)} defaultValue="all">
                    <SelectTrigger className="w-full md:w-1/4 dark:bg-gray-800 dark:text-white">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800">
                        {categories.map((category) => (
                            <SelectItem key={category.toLowerCase()} value={category.toLowerCase()}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="all">
                    <SelectTrigger className="w-full md:w-1/4 dark:bg-gray-800 dark:text-white">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800">
                        {statuses.map((status) => (
                            <SelectItem key={status.toLowerCase()} value={status.toLowerCase()}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filteredPrinters.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No printers found matching your criteria.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[calc(100vh-250px)]">
                    {filteredPrinters.map((printer) => (
                        <Card key={printer.printerID} className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-semibold">{printer.name}</CardTitle>
                                <Badge variant={printer.status === 'Active' ? 'default' : 'secondary'} className="text-xs px-2 py-1">
                                    {printer.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="text-sm space-y-2">
                                    <p><span className="font-medium">Location:</span> {printer.location}</p>
                                    <p><span className="font-medium">IP Address:</span> {printer.ipAddress}</p>
                                    <p><span className="font-medium">Assigned To:</span> {printer.assignedTo}</p>
                                    <p><span className="font-medium">Category:</span> {printer.category}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" onClick={() => handleEdit(printer)} className="dark:bg-gray-600 dark:text-white">Edit</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-white">
                                        <DialogHeader>
                                            <DialogTitle>Edit Printer</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">Name</Label>
                                                <Input id="name" defaultValue={printer.name} className="col-span-3 dark:bg-gray-700 dark:text-white" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="status" className="text-right">Status</Label>
                                                <Select defaultValue={printer.status}>
                                                    <SelectTrigger className="col-span-3 dark:bg-gray-700 dark:text-white">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent className="dark:bg-gray-700">
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-x-6">
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => setEditingPrinter(null)} className="dark:bg-gray-600 dark:text-white">Cancel</Button>
                                            </DialogTrigger>
                                            <Button type="submit" onClick={() => handleUpdate(editingPrinter!)} className="dark:bg-blue-600 dark:text-white">Save changes</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => handleDelete(printer.printerID)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

