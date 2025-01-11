"use client";

import { useEffect, useState } from "react";
import vendorActions from "@/actions/vendor";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
            <DialogContent className="max-w-3xl">
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
        <div className="mt-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <dl className="flex flex-col gap-4 justify-start items-start">
                        <InfoItem label="Email" value={data.email} className="flex items-center justify-center gap-2" />
                        <InfoItem label="Phone" value={data.phone} className="flex items-center justify-center gap-2" />
                        <InfoItem label="Address" value={data.address} className="flex items-center justify-center gap-2" />
                    </dl>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Printer Details</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.printerDetails.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data.printerDetails.map((printer) => (
                                <Card key={printer.id}>
                                    <CardContent className="pt-4 flex flex-col gap-2 justify-start items-start">
                                        <InfoItem label="Printer Name" value={printer.name} className="flex items-center justify-center gap-2" />
                                        <InfoItem label="Status" value={printer.status} className="flex items-center justify-center gap-2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No printer details available.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function InfoItem({ label, value, className = "" }: { label: string; value: string; className?: string; }) {
    return (
        <div className={className}>
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="text-sm text-gray-900 dark:text-gray-400">{value}</dd>
        </div>
    );
}
