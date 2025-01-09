"use client";

import Image from 'next/image';
import { Loader, Upload } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useState } from "react";
import { ProductDialogModal } from "@/components/ProductDialogModal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
    productID: string
    name: string
    price: number
    image: string
    description: string
    category: string
    material: string
    size: string
}

export default function Products() {
    const [filter, setFilter] = useState<string>("all")
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [productsData, setProductsData] = useState<Product[]>([])
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false)

    // Update Data
    const handleUpdate = (product: Product) => {
        setSelectedProduct(product)
        setIsUpdateDialogOpen(true)
    }

    // Delete Data
    const handleDelete = (productID: string) => {
        console.log("Delete product with ID:", productID)
        // Implement delete functionality here
    }

    // Fetch products from database
    const fetchProducts = async(): Promise<Product[]> => {
        // Simulated API call
        return [
            {
                productID: "1",
                name: "Artistic Sculpture",
                price: 400,
                image: "/placeholder.svg",
                description: "A beautiful abstract sculpture perfect for modern interiors.",
                category: "Arts",
                material: "PLA",
                size: "45x50x55 mm",
            },
            {
                productID: "2",
                name: "Handcrafted Vase",
                price: 250,
                image: "/placeholder.svg",
                description: "Elegant handcrafted vase with intricate patterns.",
                category: "Crafts",
                material: "ABS",
                size: "30x40x50 mm",
            },
            {
                productID: "3",
                name: "Modern Desk Organizer",
                price: 300,
                image: "/placeholder.svg",
                description: "Sleek and functional desk organizer for a tidy workspace.",
                category: "Design",
                material: "PETG",
                size: "60x70x80 mm",
            }
        ]
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Simulating file upload and creating a new product
            const newProduct: Product = {
                productID: (productsData.length + 1).toString(),
                name: file.name,
                price: 0,
                image: URL.createObjectURL(file),
                description: "",
                category: "Uncategorized",
                material: "Unknown",
                size: "0x0x0 mm",
            }
            setSelectedProduct(newProduct)
            setIsUpdateDialogOpen(true)
        }
    }

    const handleProductUpdate = (updatedProduct: Product) => {
        if (selectedProduct?.productID) {
            // Update existing product
            setProductsData(prevData => 
                prevData.map(product => 
                    product.productID === updatedProduct.productID ? updatedProduct : product
                )
            )
        } else {
            // Add new product
            setProductsData(prevData => [...prevData, updatedProduct])
        }
        setIsUpdateDialogOpen(false)
        setSelectedProduct(null)
    }

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
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Crafts">Crafts</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                    </SelectContent>
                </Select>
                <input type="file" id="fileUpload" className="hidden" onChange={handleFileUpload} />
                <Button variant={"default"} onClick={() => document.getElementById('fileUpload')?.click()}>Add Product</Button>
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

            <ProductDialogModal isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} product={selectedProduct} onUpdate={handleProductUpdate} />
        </div>
    )
}
