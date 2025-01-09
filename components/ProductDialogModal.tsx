"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

interface UpdateProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onUpdate: (product: Product) => void;
}

export function ProductDialogModal({ isOpen, onClose, product, onUpdate }: UpdateProductDialogProps) {
    const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null)

    useEffect(() => {
        setUpdatedProduct(product)
    }, [product])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUpdatedProduct(prev => prev ? { ...prev, [name]: value } : null)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (updatedProduct) {
            onUpdate(updatedProduct)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{product?.productID ? 'Update Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {updatedProduct?.image && (<Image src={updatedProduct?.image || '/placeholder.svg'} alt="Product Image" width={200} height={200} className="mx-auto" />)}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right"> Image </Label>
                            <Input id="image" name="image" value={updatedProduct?.image || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right"> Name </Label>
                            <Input id="name" name="name" value={updatedProduct?.name || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right"> Price </Label>
                            <Input id="price" name="price" type="number" value={updatedProduct?.price || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right"> Category </Label>
                            <Select name="category" value={updatedProduct?.category || ''} onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as React.ChangeEvent<HTMLSelectElement>)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Arts">Arts</SelectItem>
                                    <SelectItem value="Crafts">Crafts</SelectItem>
                                    <SelectItem value="Design">Design</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="material" className="text-right"> Material </Label>
                            <Input id="material" name="material" value={updatedProduct?.material || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="size" className="text-right"> Size </Label>
                            <Input id="size" name="size" value={updatedProduct?.size || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right"> Description </Label>
                            <Textarea id="description" name="description" value={updatedProduct?.description || ''} onChange={handleInputChange} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
