"use client";

import Image from "next/image";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import productActions from "@/actions/product";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: {
        productID: string;
        name: string;
        price: number;
        image: string;
        description: string;
        category: string;
        material: string;
        size: string;
        "model file": string;
    };
}

export function AddProducts({ open, onOpenChange, product }: AddUserDialogProps) {
    const [link, setLink] = useState(product?.["model file"] || '');
    const [name, setName] = useState(product?.name || '');
    const [size, setSize] = useState(product?.size || '');
    const [price, setPrice] = useState(product?.price || 0);
    const [image, setImage] = useState(product?.image || '');
    const [category, setCategory] = useState(product?.category || '');
    const [material, setMaterial] = useState(product?.material || '');
    const [description, setDescription] = useState(product?.description || '');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        setImage("https://github.com/shadcn.png");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            setError('Please upload an image for the product.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        if (!name || !price || !description || !category || !material || !size) {
            setError('All fields are required. Please fill in all fields.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        const response = product ? await productActions.updateProduct(product.productID, name, price, image, description, category, material, size, link) : await productActions.createProduct(name, price, image, description, category, material, size, link);
        if (response.success) {
            setMessage(response.message);
        } else {
            setError(response.message);
        }

        // Clear form fields if adding a new product
        if (!product) {
            setName('');
            setPrice(0);
            setImage('');
            setDescription('');
            setCategory('');
            setMaterial('');
            setSize('');
            setLink('');
        }

        // Close after 2 seconds
        setTimeout(() => onOpenChange(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="h-16 flex items-center justify-center mb-2">
                        {!image && <p>Image Not Uploaded</p>}
                        {image && <Image src={image} alt="Profile Preview" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right"> Product Image </Label>
                        <div className="col-span-3">
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right"> Product Name </Label>
                        <Input id="name" name="name" placeholder="007" value={name} onChange={(e) => setName(e.target.value)} minLength={3} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right"> Price </Label>
                        <Input id="price" name="price" placeholder="007" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Description" className="text-right"> Description </Label>
                        <Textarea id="description" name="description" placeholder="007" value={description} onChange={(e) => setDescription(e.target.value)} minLength={3} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="catogory" className="text-right"> Product Catogory</Label>
                        <Select onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Catogory" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Catogory</SelectLabel>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="material" className="text-right"> Product Material </Label>
                        <Select onValueChange={(value) => setMaterial(value)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select Catogory" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Product Material</SelectLabel>
                                    <SelectItem value="arts">Arts</SelectItem>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="size" className="text-right"> Product Size </Label>
                        <Input id="size" name="size" placeholder="0x0x0 mm" value={size} onChange={(e) => setSize(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="link" className="text-right"> Product Modal Link </Label>
                        <Input id="link" name="link" placeholder="Modal Link" value={link} onChange={(e) => setLink(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Add User</Button>
                </DialogFooter>
                <div className="flex flex-col items-center">
                    <div className="">
                        {error && <div className="text-red-700 p-2 rounded">{error}</div>}
                        {message && <div className="text-green-700 p-2 rounded">{message}</div>}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
