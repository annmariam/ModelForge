"use client";

import { useEffect, useState } from "react";
import { useAuth } from '@/config/AuthProvider';
import dashboardActions from "@/actions/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen, PackagePlus, Users, ShoppingCart, FileText, Printer, Clock, PrinterCheck } from 'lucide-react';

interface DashboardCardProps {
    title: string;
    fetchFunction: () => Promise<number>;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const DashboardData = (id: string) => ({
    admin: [
        { title: "Total Design", fetchFunction: dashboardActions.fetchModelCount, icon: PackageOpen },
        { title: "Total Orders", fetchFunction: dashboardActions.fetchOrderCount, icon: ShoppingCart },
        { title: "Total Products", fetchFunction: dashboardActions.fetchProductCount, icon: PackagePlus },
        { title: "Total Users", fetchFunction: dashboardActions.fetchUserCount, icon: Users },
    ],
    customer: [
        { title: "My Models", fetchFunction: () => dashboardActions.fetchModelCountUser(id), icon: PackageOpen },
        { title: "My Orders", fetchFunction: () => dashboardActions.fetchOrderCountUser(id), icon: ShoppingCart },
    ],
    designer: [
        { title: "Assigned Designs", fetchFunction: () => dashboardActions.fetchOrderCountUser(id), icon: FileText },
        { title: "Working Designs", fetchFunction: () => dashboardActions.fetchWorkingDesignUser(id), icon: Clock },
        { title: "Completed Designs", fetchFunction: () => dashboardActions.fetchCompletedDesignUser(id), icon: FileText },
    ],
    printer: [
        { title: "Assigned Print", fetchFunction: () => dashboardActions.fetchAssignedPrintUser(id), icon: Printer },
        { title: "Working Print", fetchFunction: () => dashboardActions.fetchWorkingPrintUser(id), icon: Clock },
        { title: "Completed Print", fetchFunction: () => dashboardActions.fetchCompletedPrintUser(id), icon: PrinterCheck },
    ],
});

export default function Dashboard() {
    const { data, user }: { data: { role: keyof typeof DashboardData }, user: { uid: string } } = useAuth();
    const id = user.uid;
    const role = data.role;
    const dashboardData: { [key: string]: DashboardCardProps[] } = DashboardData(id);

    // State for card data
    const [loading, setLoading] = useState<boolean>(true);
    const [cardData, setCardData] = useState<{ [key: string]: number | null }>({});

    useEffect(() => {
        const fetchData = async () => {
            const newCardData: { [key: string]: number | null } = {};

            // Fetch the data for each card
            await Promise.all(
                dashboardData[role]?.map(async (card) => {
                    const value = await card.fetchFunction();
                    newCardData[card.title] = value;
                })
            );

            setCardData(newCardData);
            setLoading(false);
        };

        fetchData();
    }, [role, dashboardData]);

    return (
        <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardData[role]?.map((card: DashboardCardProps, index: number) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-mediusm"> {card.title} </CardTitle> 
                            <card.icon width={24} height={24} className="text-muted-foreground" />
                        </CardHeader>
                        <div className="px-4">
                            <Separator className="h-2" />
                        </div>
                        <CardContent className="pt-2 space-y-0">
                            {loading ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-xl">{cardData[card.title]}</span>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
