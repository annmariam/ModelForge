"use client"

import { Loader } from 'lucide-react';
import orderActions from '@/actions/order';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { OrderDetailsModal } from "@/components/OrderDetailsModal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Order {
    orderID: string
    customerID: string
    status: string
    material: string
    quantity: number
    size: string
    color: string
    fileUrl: string
}

export default function AssignOrders() {
    const [filter, setFilter] = useState<string>("all")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [orderData, setOrderData] = useState<Order[]>([])
    const [filteredData, setFilteredData] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    // Update Data
    const handleUpdate = (order: Order) => {
        console.log("Update order with ID:", order.orderID)
    }

    // Delete Data
    const handleDelete = (orderID: string) => {
        console.log("Delete order with ID:", orderID)
    }

    // View Order Details
    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    // Fetch orders from the database
    const fetchOrders = async (): Promise<Order[]> => {
        const response = await orderActions.fetchOrders()
        if (response.status) {
            if (response.data) {
                return response.data;
            } else if(response.message) {
                setError(response.message)
                return []
            } else {
                setError("Error fetching data")
                return []
            }
        } else {
            setError("No data")
            return []
        }
    }

    // Filter Data
    const applyFilters = useCallback(() => {
        let filtered = orderData

        if (filter !== "all") {
            filtered = orderData.filter((order) => order.status === filter)
        }

        if (searchQuery) {
            filtered = filtered.filter((order) => order.customerID.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        setFilteredData(filtered)
    }, [orderData, filter, searchQuery])

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await fetchOrders()
                setOrderData(data)
                setFilteredData(data)
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
                <Button className="w-full md:w-auto">Add Order</Button>
            </div>

            {/* Order Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((order) => (
                    <Card key={order.orderID} className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg cursor-pointer"onClick={() => handleViewDetails(order)}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg font-bold">Order #{order.orderID}</CardTitle>
                                <Badge className={`${getStatusColor(order.status)} capitalize`}> {order.status} </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                <p className="text-sm"><span className="font-medium">Customer ID:</span> {order.customerID}</p>
                                <Separator />
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="font-medium">Material:</span> {order.material}</p>
                                    <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
                                    <p><span className="font-medium">Size:</span> {order.size}</p>
                                    <p><span className="font-medium">Color:</span> {order.color}</p>
                                </div>
                                <Separator />
                                <p className="text-sm"><span className="font-medium">File:</span> {order.fileUrl}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleUpdate(order); }} size="sm"> Update </Button>
                            <Button variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(order.orderID); }} size="sm"> Delete </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

