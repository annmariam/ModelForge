"use client";

import Image from 'next/image';
import { Loader } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AddProducts } from "@/components/AddProduct";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import productActions from '@/actions/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
    productID: string
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    material: string;
    size: string;
    "model file": string;
}

export default function Products() {
    const [filter, setFilter] = useState<string>("all")
    const [loading, setLoading] = useState<boolean>(true)
    const [addData, setAddData] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [productsData, setProductsData] = useState<Product[]>([])
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    // Update Data
    const handleUpdate = (product: Product) => {
        setSelectedProduct(product)
    }

    // Delete Data
    const handleDelete = (productID: string) => {
        console.log("Delete product with ID:", productID)
        // Implement delete functionality here
    }

    // Fetch products from database
    const fetchProducts = async(): Promise<Product[]> => {
        const data = await productActions.fetchProducts()
        return data;
    }

    // Filter Data
    const applyFilters = useCallback(() => {
        let filtered = productsData

        if (filter !== "all") {
            filtered = productsData.filter((design) => design.category === filter)
        }

        if (searchQuery) {
            filtered = filtered.filter((design) => 
                design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                design.productID.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }
        setFilteredData(filtered)
    }, [productsData, filter, searchQuery])

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await fetchProducts()
                setProductsData(data)
                setFilteredData(data)
            } catch (error) {
                console.error(error)
                setError("An error occurred while fetching data")
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

    return (
        <div>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

            {/* Filter and Search Options */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Input type="text" placeholder="Search by name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full" />
                <Select onValueChange={setFilter} value={filter}>
                    <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="Crafts">Crafts</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant={"default"} onClick={() => setAddData(true)}>Add Product</Button>
            </div>

            {/* Design Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((product) => (
                    <Card key={product.productID} className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-lg">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                                <Badge variant="secondary">{product.category}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="relative w-full h-48 mb-4">
                                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" className="rounded-md" />
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">ID: {product.productID}</p>
                                <p className="text-sm font-medium">${product.price}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm">Material: {product.material}</p>
                                <p className="text-sm">Size: {product.size}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => handleUpdate(product)} size="sm">Update</Button>
                            <Button variant="destructive" onClick={() => handleDelete(product.productID)} size="sm">Delete</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {selectedProduct && <AddProducts open={addData} onOpenChange={setAddData} product={selectedProduct} />}

            {addData && <AddProducts open={addData} onOpenChange={setAddData} />}

        </div>
    )
}
