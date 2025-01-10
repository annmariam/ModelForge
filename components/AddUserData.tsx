"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/actions/registerUser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, X } from 'lucide-react';

interface AddUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface PrinterDevice {
    name: string;
    status: 'active' | 'inactive';
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [category, setCategory] = useState('');
    const [printerDevices, setPrinterDevices] = useState<PrinterDevice[]>([]);

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle adding printer device
    const addPrinterDevice = () => {
        setPrinterDevices([...printerDevices, { name: '', status: 'active' }]);
    };

    // Handle removing printer device
    const removePrinterDevice = (index: number) => {
        const updatedDevices = printerDevices.filter((_, i) => i !== index);
        setPrinterDevices(updatedDevices);
    };

    // Handle updating printer device
    const updatePrinterDevice = (index: number, field: 'name' | 'status', value: string) => {
        const updatedDevices = printerDevices.map((device, i) => {
            if (i === index) {
                return { ...device, [field]: value };
            }
            return device;
        });
        setPrinterDevices(updatedDevices);
    };

    // Handle adding data to the database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !image || !role) {
            setError('All fields are required. Please fill in all fields.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        if (role === 'printer' && !category) {
            setError('Please select a category for the vendor.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }

        if (role === 'printer' && printerDevices.length === 0) {
            setError('Please add at least one printer device.');
            setTimeout(() => {
                setError('');
            }, 5000);
            return;
        }
        
        // Call the register action
        try {
            const response = await registerUser(email, password, name, image, role, category);
            if (response.success) {
                setMessage(response.message);
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration. Please try again.');
        }

        // Clear form fields
        setName('');
        setRole('');
        setEmail('');
        setImage('');
        setPassword('');
        setCategory('');
        setPrinterDevices([]);
        
        // close after 2 seconds
        setTimeout(() => {
            onOpenChange(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="h-16 flex items-center justify-center mb-2">
                        {!image && <p>Image Not Uploaded</p>}
                        {image && <Image src={image} alt="Profile Preview" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Profile Image</Label>
                        <div className="col-span-3">
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" name="name" placeholder="007" value={name} onChange={(e) => setName(e.target.value)} minLength={3} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="007@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Password</Label>
                        <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Role</Label>
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Role</SelectLabel>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="designer">Designer</SelectItem>
                                    <SelectItem value="printer">Vendor</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {role === 'printer' && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Vendor Category</Label>
                                <Select onValueChange={(value) => setCategory(value)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            <SelectItem value="arts">Arts</SelectItem>
                                            <SelectItem value="engineering">Engineering</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Printer Devices</Label>
                                {printerDevices.map((device, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Input 
                                            placeholder="Device Name" 
                                            value={device.name} 
                                            onChange={(e) => updatePrinterDevice(index, 'name', e.target.value)}
                                        />
                                        <Select 
                                            value={device.status} 
                                            onValueChange={(value) => updatePrinterDevice(index, 'status', value as 'active' | 'inactive')}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => removePrinterDevice(index)}
                                            aria-label="Remove printer device"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={addPrinterDevice} className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Printer Device
                                </Button>
                            </div>
                        </>
                    )}
                    <DialogFooter>
                        <Button type="submit">Add User</Button>
                    </DialogFooter>
                </form>
                <div className="flex flex-col items-center">
                    <div className="">
                        {error && <div className="text-red-700 p-2 rounded">{error}</div>}
                        {message && <div className="text-green-700 p-2 rounded">{message}</div>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
