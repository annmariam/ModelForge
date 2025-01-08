"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadIcon, FolderPlusIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

export default function Upload() {
    const [fileType, setFileType] = useState<'3mf' | 'stl'>('stl');

    return (
        <div className='flex flex-col py-16 gap-5'>
            <h2 className='text-center text-2xl'>Upload Model</h2>

            {/* File Type Selection */}
            <div className="space-y-4 border-2 border-dashed rounded-lg p-4">
                <Label className="text-lg felx items-center gap-1">
                    <span className="text-red-500 pr-2">*</span> Do you have a 3D model file or a 3D model?
                </Label>
                <RadioGroup defaultValue='stl' onValueChange={(value: '3mf' | 'stl') => setFileType(value)}>
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

            {/* Progress Steps */}
            <div className='flex justify-center'>
                <div className="flex items-center justify-between max-w-2xl gap-2">
                    <div className="flex items-center">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">1</div>
                        <span className="ml-2 text-green-500">Upload</span>
                    </div>
                    <Separator className='bg-white w-10'/>
                    <div className="flex items-center opacity-50">
                        <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center">2</div>
                        <span className="ml-2">Model Information</span>
                    </div>
                    <Separator className='bg-white w-10'/>
                    <div className="flex items-center opacity-50">
                        <div className="bg-gray-300 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center">3</div>
                        <span className="ml-2">Print Profile Information</span>
                    </div>
                </div>
            </div>

            {/* File Upload Sections */}
            <div className="space-y-6">
                {fileType === '3mf' && (
                    <div className="space-y-4">
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
                        <span className="text-red-500">*</span>
                        Raw Model Files
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

            {/* Next Step Button */}
            <div className="flex justify-end">
                <Button className="px-8">
                Next Step
                </Button>
            </div>
        </div>
    )
}
