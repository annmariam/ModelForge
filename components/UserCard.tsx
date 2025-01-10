import React, { useState } from 'react';
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
                return <Badge className="bg-red-500 text-white">Admin</Badge>;
            case "customer":
                return <Badge className="bg-blue-500 text-white">Customer</Badge>;
            case "designer":
                return <Badge className="bg-green-500 text-white">Designer</Badge>;
            case "printer":
                return <Badge className="bg-purple-500 text-white">Vendor</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">--</Badge>;
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage src={user.photoURL} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Role:</span>
                        {roleBadge(user.role)}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    {user.role === "printer" && (
                        <>
                            <Button onClick={() => addPrinter(user.userID)} variant="outline" size="sm">
                                <CirclePlus size={16} className="mr-2" /> Add Printer
                            </Button>
                            <Button onClick={() => setView(true)} variant="outline" size="sm">
                                <Eye size={16} className="mr-2" /> View Vendor
                            </Button>
                        </>
                    )}
                    <Button onClick={() => onEdit(user)} variant="outline" size="sm">
                        <Pencil size={16} className="mr-2" /> Edit
                    </Button>
                    <Button onClick={() => onDelete(user.userID)} variant="outline" size="sm">
                        <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                </CardFooter>
            </Card>
            {view && (<VendorDetailsDialog isOpen={view} onClose={() => setView(false)} vendorId={user.userID} />)}
        </>
    );
}
