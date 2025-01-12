"use client"

import { Loader } from 'lucide-react';
import designActions from '@/actions/design';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { DesignDetailsModal } from '@/components/DesignDetailsModal';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Design {
    designID: string;
    customerID: string;
    status: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    description: string;
}

export default function AssignDesign() {
    const [filter, setFilter] = useState<string>("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [designData, setDesignData] = useState<Design[]>([]);
    const [filteredData, setFilteredData] = useState<Design[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

    // Update Data
    const handleUpdate = (design: Design) => {
        console.log("Update design with ID:", design.designID)
    }

    // Delete Data
    const handleDelete = (designID: string) => {
        console.log("Delete design with ID:", designID)
    }

    // View Design Details
    const handleViewDetails = (design: Design) => {
        setSelectedDesign(design)
        setIsModalOpen(true)
    }

    // Fetch designs from the database
    const fetchDesigns = async () => {
        const response = await designActions.fetchDesigns()
        if (response.success) {
            if (response.data) {
                setDesignData(response.data)
                setFilteredData(response.data)
            } else {
                setError("No data found")
            }
        } else if (response.message) {
            setError(response.message)
        } else {
            setError("Error fetching data");
        }
    }

    // Filter Data
    const applyFilters = useCallback(() => {
        let filtered = designData

        if (filter !== "all") {
            filtered = designData.filter((design) => design.status === filter)
        }

        if (searchQuery) {
            filtered = filtered.filter((design) => design.customerID.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        setFilteredData(filtered)
    }, [designData, filter, searchQuery])

    useEffect(() => {
        const fetch = async () => {
            try {
                await fetchDesigns()
            } catch (error) {
                console.error(error)
                setError("Error fetching data")
            } finally {
                setLoading(false)
            }
        }

        fetch()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [applyFilters])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-82px)] spinner">
                <Loader size={48} className="animate-spin" />
            </div>
        )
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'approved':
                return 'bg-green-100 text-green-800'
            case 'rejected':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            {/* Filter and Search Options */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input type="text" placeholder="Search by Customer ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
                <Select onValueChange={setFilter} value={filter}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="w-full md:w-auto">Add Design</Button>
            </div>

            {/* Design Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((design) => (
                    <Card key={design.designID} className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg cursor-pointer" onClick={() => handleViewDetails(design)}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg font-bold">Design #{design.designID}</CardTitle>
                                <Badge className={`${getStatusColor(design.status)} capitalize`}> {design.status} </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                <p className="text-sm"><span className="font-medium">Customer ID:</span> {design.customerID}</p>
                                <Separator />
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="font-medium">Material:</span> {design.material}</p>
                                    <p><span className="font-medium">Quantity:</span> {design.quantity}</p>
                                    <p><span className="font-medium">Size:</span> {design.size}</p>
                                    <p><span className="font-medium">Color:</span> {design.color}</p>
                                </div>
                                <Separator />
                                <p className="text-sm"><span className="font-medium">Description:</span> {design.description}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleUpdate(design); }} size="sm"> Update </Button>
                            <Button variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(design.designID); }} size="sm"> Delete </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Design Details Modal */}
            <DesignDetailsModal design={selectedDesign} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

