"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  fetchFunction: () => Promise<number>;
  icon: React.ReactNode;
}

export default function DashboardCard({ title, fetchFunction, icon }: DashboardCardProps) {
    const [value, setValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFunction();
                setValue(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setValue(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchFunction]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium"> {title} </CardTitle> {icon}
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-8 w-[100px]" />
                ) : (
                    <div className="text-2xl font-bold animate-fade-in">
                        {value !== null ? value.toLocaleString() : "N/A"}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

