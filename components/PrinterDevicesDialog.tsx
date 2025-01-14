"use client";

import { useEffect, useState } from "react";
import vendorActions from "@/actions/vendor";
import { Input } from "@/components/ui/input";
import printerActions from "@/actions/printer";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface PrinterDevice {
    id: string;
    name: string;
    status: "active" | "inactive";
    workID: string;
}

interface PrinterDevicesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userID: string;
}

export function PrinterDevicesDialog({ open, onOpenChange, userID }: PrinterDevicesDialogProps) {
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [editingDevice, setEditingDevice] = useState<PrinterDevice | null>(null);
    const [localPrinterDevices, setLocalPrinterDevices] = useState<PrinterDevice[]>([]);

    const handleAddOrUpdateDevice = async () => {
        if (editingDevice) {
            const { id, name, status } = editingDevice;

            try {
                const response = await vendorActions.addOrUpdateVenderPrinter(userID, name, status, id);

                if (response.success) {
                    setMessage(response.message);
                    setEditingDevice(null);
                } else {
                    setError(response.message);
                    console.error("Failed to add or update the printer device:", response.message);
                }
            } catch (error) {
                console.error("Error adding or updating the printer device:", error);
            }
        }
    };

    const handleEdit = (device: PrinterDevice) => {
        setEditingDevice(device);
    };

    const handleCancel = () => {
        setEditingDevice(null);
    };

    const handleRemove = async(device: PrinterDevice) => {
        if (device.id) {
            const response = await vendorActions.deleteVenderPrinter(userID, device.id)
            if (response.success) {
                setMessage(response.message);
            } else {
                setError(response.message);
            }
        }
    };

    useEffect(() => {
        const fetchPrinterDevices = async () => {
            try {
                const response = await printerActions.fetchPrinter(userID);
                if (response.success) {
                    if (response.data) {
                        setLocalPrinterDevices(response.data);
                    } else {
                        setError("Failed to fetch printer devices");
                    }
                } else {
                    setError(response.message || "Failed to fetch printer devices");
                }
            } catch (error) {
                console.error("Error fetching printer devices:", error);
                setError("Error fetching printer devices");
            }
        };

        if (open) {
            fetchPrinterDevices();
        }
    }, [open, userID]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Printer Devices</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {error && <div className="text-red-500">{error}</div>}
                    {message && <div className="text-green-500">{message}</div>}
                    {localPrinterDevices.map((device) => (
                        <div key={device.id} className="flex items-center space-x-2">
                            <div className="flex-grow">
                                <p className="font-medium">{device.name}</p>
                                <p className="text-sm text-gray-500">Status: {device.status}</p>
                                <p className="text-sm text-gray-500">Work ID: {device.workID}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(device)} aria-label="Edit printer device">
                                <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleRemove(device)} aria-label="Remove printer device">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    {!editingDevice && (
                        <Button type="button" variant="outline" onClick={() => setEditingDevice({ id: "", name: "", status: "inactive", workID: "" })} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Printer Device
                        </Button>
                    )}
                </div>

                {editingDevice && (
                    <div className="space-y-4 py-4 border-t pt-4">
                        <Input placeholder="Device Name" value={editingDevice.name} onChange={(e) => setEditingDevice({ ...editingDevice, name: e.target.value })} />
                        <Select value={editingDevice.status} onValueChange={(value) => setEditingDevice({ ...editingDevice, status: value as "active" | "inactive" })} >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={handleCancel}> Cancel </Button>
                            <Button onClick={handleAddOrUpdateDevice}> {editingDevice.id ? "Update" : "Add"} </Button>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    <Button type="button" onClick={() => onOpenChange(false)}> Close </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
