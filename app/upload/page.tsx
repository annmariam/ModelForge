"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UploadIcon, Plus, Trash } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function Upload() {
    const [state, setState] = useState(1);
    const [modalFile, setModalfile] = useState<string>("");
    const [images, setImages] = useState<string[]>([]);
    const [appcover, setAppCover] = useState<string>("");
    const [webCover, setWebCover] = useState<string>("");

    const handleRemovePhoto = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (state < progress.length) {
            setState((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setState((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const progress = [
        { id: 1, title: "Upload" },
        { id: 2, title: "Model Information" },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        console.log("Selected files:", files);
        setModalfile(files.toString());
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (id === 1) {
                    setWebCover(reader.result as string);
                } else if (id === 2) {
                    setAppCover(reader.result as string);
                } else {
                    console.log("Invalid ID");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prev) => (prev.length < 16 ? [...prev, reader.result as string] : prev));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted');
    }

    return (
        <div className='flex flex-col py-16'>
            <h2 className='text-center text-3xl font-bold text-primary mb-8'>Upload Model</h2>

            <div>
                <div className='flex justify-center mt-4 sticky top-0 z-10 py-4'>
                    <div className="flex items-center justify-between max-w-2xl gap-2">
                        {progress.map((item, index) => (
                            <div key={item.id} className="flex justify-center items-center">
                                <div className="flex items-center">
                                    <div className={`rounded-full w-10 h-10 flex items-center justify-center ${state >= item.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                        {item.id}
                                    </div>
                                    <span className={`ml-2 ${state >= item.id ? 'text-primary' : 'text-secondary'}`}>{item.title}</span>
                                </div>
                                {index < progress.length - 1 && (
                                    <div className="px-2">
                                        <Separator className='bg-white w-10' />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6 flex flex-col gap-6 mt-4 w-full">

                    <div className='flex flex-col'>
                        <div className="space-y-4 p-10">
                            <Label className="text-lg flex items-center gap-1">
                                <span className="text-red-500 text-2xl">*</span> Raw Model Files
                            </Label>
                            <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center space-y-4 transition-all hover:border-primary">
                                <div className="flex justify-center">
                                    <UploadIcon className="w-12 h-12 text-gray-400" />
                                </div>
                                <div className="text-lg">Drag your files here</div>
                                <div className="text-sm text-gray-500">Supported formats: 3ds, amf, blend, etc.</div>
                                <div className="flex justify-center gap-4">
                                    <Input type="file" id="file-upload" className="hidden" accept=".3ds,.amf,.blend,.dwg,.zip" onChange={handleFileChange} />
                                    <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={() => document.getElementById("file-upload")?.click()}>
                                        <UploadIcon className="w-4 h-4" /> Browse
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`flex flex-col ${state === 2 ? 'block' : 'hidden'}`}>
                        <div className="space-y-4 p-10">
                            <Label className="text-lg flex item-center gap-1">
                                <span className="text-red-500 text-2xl">*</span> Model Pictures
                            </Label>
                            <div className="border-2 border-dashed dark:border-gray-400 rounded-lg p-8 space-y-4">
                                <h2 className="text-lg font-semibold mb-4">Covers</h2>
                                <div className="flex flex-wrap gap-6">
                                    <div className="space-y-2 bg-transparent">
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-500 text-2xl">*</span> 
                                            <Label>Web Cover</Label>
                                        </div>
                                        {webCover && (
                                            <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                                                <Image src={webCover} alt="Web Cover" layout="fill" objectFit="cover" className="rounded-md border border-gray-300" />
                                                <Button className="absolute top-2 right-2 " onClick={() => setWebCover("")}>
                                                    <Trash className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        )}
                                        {!webCover && (
                                            <label className="w-64 h-64 flex items-center justify-center border border-dashed border-gray-400 rounded-md cursor-pointer">
                                                <Input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 1)} />
                                                <Plus className="w-4 h-4 text-gray-400" />
                                            </label>
                                        )}
                                        <div className="text-xs text-center text-muted-foreground">
                                            web cover is 4/3
                                        </div>
                                    </div>
                                    <div className="space-y-2 bg-transparent">
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-500 text-2xl">*</span>
                                            <Label>App Cover</Label>
                                        </div>
                                        {appcover && (
                                            <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                                                <Image src={appcover} alt="App Cover" layout="fill" objectFit="cover" className="rounded-md border border-gray-300" />
                                                <Button className="absolute top-2 right-2 " onClick={() => setAppCover("")}>
                                                    <Trash className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        )}
                                        {!appcover && (
                                            <label className="w-64 h-64 flex items-center justify-center border border-dashed border-gray-400 rounded-md cursor-pointer">
                                                <Input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 2)} />
                                                <Plus className="w-4 h-4 text-gray-400" />
                                            </label>
                                        )}
                                        <div className="text-xs text-center text-muted-foreground">
                                            app cover is 4/3
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-lg font-semibold mb-4">Model</h2>
                                <div className="flex flex-wrap gap-6">
                                    {images.map((src, index) => (
                                        <div key={index} className="relative w-32 h-32 rounded-lg overflow-hidden">
                                            <Image src={src} alt={`Uploaded Image ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md border border-gray-300" />
                                            <Button className="absolute top-2 right-2 " onClick={() => handleRemovePhoto(index)}>
                                                <Trash className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    ))}
                                    {images.length < 16 && (
                                        <label className="w-32 h-32 flex items-center justify-center border border-dashed border-gray-400 rounded-md cursor-pointer">
                                            <Input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
                                            <Plus className="w-4 h-4 text-gray-400" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 p-10">
                            <Label className="text-lg flex item-center gap-1">
                                <span className="text-red-500 text-2xl">*</span> Model Information
                            </Label>
                            <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 space-y-6 transition-all hover:border-primary">
                                <div className="flex flex-col gap-4">
                                    <Label className="text-sm">Model Name</Label>
                                    <Input type="text" placeholder="Enter model name" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label className="text-sm">Model Description</Label>
                                    <Input type="text" placeholder="Enter model description" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label className="text-sm">Model Category</Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Model Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-around mt-4">
                        <div className='flex justify-start'>
                            <Button variant="outline" className="px-8 hover:bg-primary hover:text-primary-foreground transition-colors" onClick={handleBack}> Previous Step </Button>
                        </div>
                        {state === 2 && (
                            <div className='flex justify-center'>
                                <Button variant="default" disabled={!images && !appcover && !webCover} className='px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors' onClick={handleSubmit}> Submit </Button>
                            </div>
                        )}
                        <div className='flex justify-end'>
                            <Button variant="default" className="px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" onClick={handleNext} disabled={!modalFile}> Next Step </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

