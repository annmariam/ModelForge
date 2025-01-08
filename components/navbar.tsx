"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/ModelForge.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { Download, Plus, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const nav_left = [
    { name: "3D Models", href: "/3d-models" },
    { name: "Generate", href: "/slicing" },
]

const nav_right = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];

export function Navbar() {
    const router = useRouter();
    const { user, data, logOut } = useAuth();

    return (
        <nav className="sticky top-0 z-50 border-b bg-background">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center px-3 py-2">
                            <Image src={Logo} alt="ModelForge" width={50} height={50} priority />
                            <span className="text-2xl font-bold text-primary pl-2"> ModelForge </span>
                        </Link>
                        <div className="hidden md:block">
                            {nav_left.map((item) => (
                                <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"> {item.name} </Link>
                            ))}
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="hidden md:block">
                        <div className="flex items-center justify-center gap-3">
                            <ModeToggle />
                            {user ? (
                                <div className="flex items-center gap-3">
                                    {/* Upload Design */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="rounded-2xl p-3 text-sm font-medium text-black hover:text-primary hover:bg-black hover:border-gray-400 border-2">
                                                <Upload size={20} /> Upload
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-background p-2">
                                            <DropdownMenuItem onClick={() => router.push("/upload")} className="hover:bg-gray-200 hover:text-black">
                                                <Upload size={20} className="mr-2" /> 
                                                <div className="flex flex-col">
                                                    <span>Upload Model</span>
                                                    <span className="text-sm text-gray-400">Upload your 3D model.</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <div className="py-2 px-4">
                                                <Separator className="bg-white" />
                                            </div>
                                            <DropdownMenuItem onClick={() => router.push("/upload/idea")} className="hover:bg-gray-200 hover:text-black">
                                                <Plus size={20} className="mr-2" />
                                                <div className="flex flex-col">
                                                    <span>Upload Idea</span>
                                                    <span className="text-sm text-gray-400">Upload your idea to generate the modal that you design.</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <div className="py-2 px-4">
                                                <Separator className="bg-white" />
                                            </div>
                                            <DropdownMenuItem onClick={() => router.push("/upload/import")} className="hover:bg-gray-200 hover:text-black">
                                                <Download size={20} className="mr-2" />
                                                <div className="flex flex-col">
                                                    <span>Import Modal From third-party website</span>
                                                    <span className="text-sm text-gray-400">Supported: Printables and Thingiverse</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                      {/* Avatar */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="bg-gray-500 text-black dark:text-white">
                                                {data?.photoURL ? (
                                                    <AvatarImage src={data.photoURL} alt={data?.name || "User"} />
                                                ) : (
                                                    <AvatarFallback>{data?.name?.[0] || "?"}</AvatarFallback>
                                                )}
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-background">
                                            <DropdownMenuItem onClick={() => router.push("/dashboard")}> Dashboard </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push("/dashboard/orders")}> Orders </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => { logOut(); }}> Logout </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>   
                                </div>
                            ) : (
                                nav_right.map((item) => (
                                    <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"> {item.name} </Link>
                                ))
                            )}
                        </div>
                    </div>
                    {/* Mobile Section */}
                    <div className="md:hidden flex items-center justify-center">
                        <ModeToggle />
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="bg-gray-500 text-black dark:text-white">
                                        {data?.photoURL ? (
                                            <AvatarImage src={data.photoURL} alt={data?.name || "User"} />
                                        ) : (
                                            <AvatarFallback>{data?.name?.[0] || "?"}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-background">
                                    <DropdownMenuItem onClick={() => router.push("/dashboard")}> Dashboard </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push("/dashboard/orders")}> Orders </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => { logOut(); }}> Logout </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
