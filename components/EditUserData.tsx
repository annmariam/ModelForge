"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface UserCollection {
    userID: string
    name: string
    email: string
    photoURL: string
    role: string
}

interface EditUserDialogProps {
    user: UserCollection
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (updatedUser: UserCollection) => void
}

export function EditUserData({ user, open, onOpenChange, onSave }: EditUserDialogProps) {
    const [editedUser, setEditedUser] = useState<UserCollection>(user)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
    }

    const handleRoleChange = (value: string) => {
        setEditedUser({ ...editedUser, role: value })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setEditedUser({ ...editedUser, photoURL: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(editedUser);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center items-center">
                        <Image src={editedUser.photoURL} alt="Profile Preview" width={112} height={112} className="mb-2 h-28 w-28 rounded-full object-cover" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right"> Profile Image </Label>
                        <div className="col-span-3">
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right"> Name </Label>
                        <Input id="name" name="name" value={editedUser.name} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right"> Email </Label>
                        <Input id="email" name="email" value={editedUser.email} onChange={handleInputChange} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right"> Role </Label>
                        <Select onValueChange={handleRoleChange} defaultValue={editedUser.role}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="customer">Customer</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="printer">Printer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

