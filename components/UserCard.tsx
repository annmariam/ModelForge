'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, Pencil, Trash2 } from 'lucide-react';
import VendorDetailsDialog from '@/components/VendorDetailsDialog';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface UserCardProps {
    user: {
        userID: string;
        name: string;
        email: string;
        photoURL: string;
        role: string;
    };
    onEdit: (user: UserCardProps['user']) => void;
    onDelete: (userID: string) => void;
    addPrinter: (userID: string) => void;
}

export function UserCard({ user, onEdit, onDelete, addPrinter }: UserCardProps) {
    const [view, setView] = useState<boolean>(false);

    // Return the role badge
    const roleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-500 text-white font-semibold px-3 py-1">Admin</Badge>;
            case "customer":
                return <Badge className="bg-blue-500 text-white font-semibold px-3 py-1">Customer</Badge>;
            case "designer":
                return <Badge className="bg-green-500 text-white font-semibold px-3 py-1">Designer</Badge>;
            case "printer":
                return <Badge className="bg-purple-500 text-white font-semibold px-3 py-1">Vendor</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white font-semibold px-3 py-1">--</Badge>;
        }
    };

    return (
        <>
            <Card className="w-fit transition-all duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                        <AvatarImage src={user.photoURL} alt={user.name} />
                        <AvatarFallback className="text-lg font-bold">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="self-start mt-2">
                        {roleBadge(user.role)}
                    </div>
                </CardHeader>
                <CardContent className="pt-2 pb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">User ID:</span>
                        <span className="font-mono bg-secondary px-2 py-1 rounded">{user.userID}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-end gap-2 bg-secondary/50 rounded-b-lg pt-4">
                    {user.role === "printer" && (
                        <div className='flex items-center gap-2'>
                            <Button onClick={() => addPrinter(user.userID)} variant="outline" size="sm" className="transition-all duration-300 hover:bg-green-500 hover:text-white">
                                <CirclePlus size={16} className="mr-2" /> Add Printer
                            </Button>
                            <Button onClick={() => setView(true)} variant="outline" size="sm" className="transition-all duration-300 hover:bg-yellow-500 hover:text-white">
                                <Eye size={16} className="mr-2" /> View Vendor
                            </Button>
                        </div>
                    )}
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => onEdit(user)} variant="outline" size="sm" className="transition-all duration-300 hover:bg-blue-500 hover:text-white">
                            <Pencil size={16} className="mr-2" /> Edit
                        </Button>
                        <Button onClick={() => onDelete(user.userID)} variant="outline" size="sm" className="transition-all duration-300 hover:bg-red-500 hover:text-white">
                            <Trash2 size={16} className="mr-2" /> Delete
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            {view && (<VendorDetailsDialog isOpen={view} onClose={() => setView(false)} vendorId={user.userID} />)}
        </>
    );
}

