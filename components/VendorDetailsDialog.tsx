"use client";

import { useEffect, useState } from "react";
import vendorActions from "@/actions/vendor";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Printer, AlertCircle } from 'lucide-react';

interface VendorDetailsDialogProps {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    vendorId: string;
}

interface VendorData {
    name: string;
    email: string;
    photoURL: string;
    phone: string;
    role: string;
    address: string;
    printerDetails: PrinterData[];
}

interface PrinterData {
    id: string;
    name: string;
    status: string;
    workID: string;
}

export default function VendorDetailsDialog({ isOpen, onClose, vendorId }: VendorDetailsDialogProps) {
    const [vendorData, setVendorData] = useState<VendorData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen || !vendorId) return;

            try {
                setLoading(true);
                setError(null);
                const response = await vendorActions.fetchVenderData(vendorId);
                if (response?.success) {
                    if (response.data) {
                        setVendorData(response.data);
                    } else {
                        throw new Error("Vendor data is undefined");
                    }
                } else {
                    throw new Error(response?.error || "Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load vendor data. Please try again later.");
                setVendorData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isOpen, vendorId]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Vendor Details: {vendorData?.name || "Loading..."}</DialogTitle>
                    <DialogDescription>Information about the vendor and their printers.</DialogDescription>
                </DialogHeader>
                {loading ? ( <LoadingState /> ) : error ? ( <ErrorState message={error} /> ) : vendorData ? ( <VendorDetails data={vendorData} /> ) : ( <p>No data available for this vendor.</p> )}
            </DialogContent>
        </Dialog>
    );
}

function LoadingState() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
        </div>
    );
}

function ErrorState({ message }: { message: string }) {
    return (
        <div className="text-center py-4">
            <p className="text-red-500">{message}</p>
        </div>
    );
}

function VendorDetails({ data }: { data: VendorData }) {
    return (
        <div className="mt-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem label="Email" value={data.email} />
                        <InfoItem label="Phone" value={data.phone} />
                        <InfoItem label="Address" value={data.address} className="sm:col-span-2" />
                    </dl>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Printer className="h-5 w-5" />
                        Printer Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {data.printerDetails.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data.printerDetails.map((printer) => (
                                <PrinterCard key={printer.id} printer={printer} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-4 text-sm text-gray-500">
                            <AlertCircle className="mr-2 h-4 w-4" />
                            No printer details available.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function PrinterCard({ printer }: { printer: PrinterData }) {
    return (
        <Card>
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">{printer.name}</h3>
                <dl className="space-y-2">
                    <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd><PrinterStatus status={printer.status} /></dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Work ID</dt>
                        <dd className="text-sm font-mono">{printer.workID || 'N/A'}</dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
}

function PrinterStatus({ status }: { status: string }) {
    let color = "bg-gray-100 text-gray-800";
    if (status.toLowerCase() === "active") {
        color = "bg-green-100 text-green-800";
    } else if (status.toLowerCase() === "inactive") {
        color = "bg-red-100 text-red-800";
    }

    return (
        <Badge variant="outline" className={`${color} text-xs font-medium px-2.5 py-0.5 rounded`}>
            {status}
        </Badge>
    );
}

function InfoItem({ label, value, className = "" }: { label: string; value: string; className?: string }) {
    return (
        <div className={`${className} flex flex-col`}>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-gray-400">{value}</dd>
        </div>
    );
}
