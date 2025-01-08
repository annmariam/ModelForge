"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UploadIcon, FolderPlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Upload() {
    const [state, setState] = useState(1);
    const [fileType, setFileType] = useState<'3mf' | 'stl' | null>(null);

    const handleNext = () => {
        if (fileType && state < progress[fileType].length) {
            setState((prev) => prev + 1);
        }
    }

    const handleBack = () => {
        setState((prev) => (prev > 1 ? prev - 1 : 1));
    }

    const progress = {
        "3mf": [
            { id: 1, title: "Upload" },
            { id: 2, title: "Model Information" },
            { id: 3, title: "Print Profile Information" },
        ],
        "stl": [
            { id: 1, title: "Upload" },
            { id: 2, title: "Model Information" }
        ]
    }

    return (
        <div className='flex flex-col py-16 gap-5'>
            <h2 className='text-center text-2xl'>Upload Model</h2>

            {/* File Type Selection */}
            <div className="space-y-4 border-2 border-dashed rounded-lg p-4">
                <Label className="text-lg felx items-center gap-1">
                    <span className="text-red-500 pr-2">*</span> Do you have a 3D model file or a 3D model?
                </Label>
                <RadioGroup onValueChange={(value: '3mf' | 'stl') => setFileType(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3mf" id="3mf" />
                        <Label htmlFor="3mf" className="text-base">Yes (earn extra points reward)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stl" id="stl" />
                        <Label htmlFor="stl" className="text-base">I have STL/CAD files or other types of 3MF files</Label>
                    </div>
                </RadioGroup>
            </div>

            

            {/* File Upload Sections */}
            {fileType !== null && (
                <div>
                    <div className='flex justify-center mt-8'>
                        <div className="flex items-center justify-between max-w-2xl gap-2">
                            {progress[fileType].map((item, index) => (
                                <div key={item.id} className="flex justify-center items-center">
                                    <div className="flex items-center">
                                        <div className={`rounded-full w-8 h-8 flex items-center justify-center ${state >= item.id ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            {item.id}
                                        </div>
                                        <span className={`ml-2 ${state >= item.id ? 'text-green-500' : 'text-gray-600'}`}>{item.title}</span>
                                    </div>
                                    {index < progress[fileType].length - 1 && (
                                        <div className="px-2">
                                            <Separator className='bg-white w-10'/>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    
                    <div className="space-y-6 flex flex-col gap-6 mt-8">

                        {/* State 1: File Upload */}
                        <div className={`flex flex-col ${state === 1 ? 'block' : 'hidden'}`}>
                            {fileType === '3mf' && (
                                <div className="space-y-4 mb-4">
                                    <Label className="text-lg flex items-center gap-1">
                                        <span className="text-red-500">*</span>
                                        Bambu Studio File (Print Profile)
                                    </Label>
                                    <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                                        <div className="flex justify-center">
                                            <UploadIcon className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <div className="text-lg">Drag your 3mf file here</div>
                                        <div className="text-sm text-gray-500">Only 3mf files produced by Bambu Studio are supported</div>
                                        <div className="flex justify-center">
                                            <Button variant="outline" className="gap-2">
                                                <UploadIcon className="w-4 h-4" /> Browse
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <Label className="text-lg flex items-center gap-1">
                                    <span className="text-red-500">*</span> Raw Model Files
                                </Label>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                                    <div className="flex justify-center">
                                        <UploadIcon className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <div className="text-lg">Drag your files here</div>
                                    <div className="text-sm text-gray-500">Supported 3D formats: 3ds, amf, blend, dwg, dxf, f3d, f3z, factory, fcstd, iges, ipt, obj, ply, py, rsdoc, scad, shape, shapr, skp, sldasmx, sldprt, slvs, step, stl, stp, studio3, zip, 3mf, stpz, fcstd</div>
                                    <div className="flex justify-center gap-4">
                                        <Button variant="outline" className="gap-2">
                                            <UploadIcon className="w-4 h-4" /> Browse
                                        </Button>
                                        <Button variant="outline" className="gap-2">
                                            <FolderPlusIcon className="w-4 h-4" /> New folder
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* State 2: Model Information */}
                        <div className={`flex flex-col ${state === 2 ? 'block' : 'hidden'}`}>
                            
                        </div>
                        {/* State 3: Print Profile Information */}
                        <div className={`flex flex-col ${state === 2 ? 'block' : 'hidden'}`}>
                            
                        </div>
                        

                        {/* Next Button */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className='flex justify-start'>
                                <Button className="px-8" onClick={handleBack}> Previous Step </Button>
                            </div>
                            <div className='flex justify-end'>
                                <Button className="px-8" onClick={handleNext}> Next Step </Button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
