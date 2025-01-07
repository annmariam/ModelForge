"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/actions/registerUser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    };

    // Handle adding data to the database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !password || !image || !role) {
            setError('All fields are required. Please fill in all fields.');
            setTimeout(() => {
                setError('')
            }, 5000) 
            return;
        }
        
        // Call the register action
        try {
            const response = await registerUser(email, password, name, image, role);
            if (response.success) {
                setMessage(response.message);
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.log(error)
            setError('An error occurred during registration. Please try again.');
        }

        // Clear form fields
        setName('');
        setRole('');
        setEmail('');
        setImage('');
        setPassword('');
        
        // Clear register status after 10 seconds
        setTimeout(() => {
            setError('')
            setMessage('')
        }, 10000)    
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="h-16 flex items-center justify-center mb-2">
                        {!image && <p>Image Not Uploaded</p>}
                        {image && <Image src={image} alt="Profile Preview" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right"> Profile Image </Label>
                        <div className="col-span-3">
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right"> Name </Label>
                        <Input id="name" name="name" placeholder="007" value={name} onChange={(e) => setName(e.target.value)} minLength={3} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right"> Email </Label>
                        <Input id="email" name="email" placeholder="007@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Password</Label>
                        <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8}  className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">Role</Label>
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
                                    <SelectItem value="printer">Printer</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Add User</Button>
                    
                </DialogFooter>
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
