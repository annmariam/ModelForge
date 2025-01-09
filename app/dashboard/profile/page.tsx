"use client";

import { Mail } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/config/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const { data } = useAuth();

    // Convert Firestore timestamp to a readable date string
    const formatTimestamp = (timestamp: Timestamp) => {
        if (!timestamp) return "N/A";
        const date = timestamp.seconds
            ? new Date(timestamp.seconds * 1000) // Firestore timestamp object
            : timestamp.toDate();
        return date.toLocaleDateString(); // Format as 'MM/DD/YYYY' or localized format
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
                return <Badge className="bg-purple-500 text-white">Vendor</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">--</Badge>;
        }
    };

    return (
        <div className="container mx-auto py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        {data?.photoURL ? (
                            <AvatarImage src={data.photoURL} alt={data?.name || "User"} />
                        ) : (
                            <AvatarFallback>{data?.name?.[0] || "?"}</AvatarFallback>
                        )}
                    </Avatar>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold">{data?.name}</CardTitle>
                        <div className="flex items-center justify-center space-x-2"> {roleBadge(data?.role)} </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <span>{data?.email}</span>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        Member since: {formatTimestamp(data?.timestamp)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
