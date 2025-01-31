"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/ModelForge.png";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, PackageOpen, PackagePlus, Users, ShoppingBasket, ShoppingCart, Settings, Package2, Download, Plus, Upload, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const nav_left = [
    { name: "3D Models", href: "/3d-models" },
]

const nav_right = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];

export function Navbar() {
    const router = useRouter();
    const { user, data, logOut } = useAuth();

    const role = data?.role;

    // Badge color based on role
    const roleBadgeColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-500";
            case "customer":
                return "bg-blue-500";
            case "designer":
                return "bg-green-500";
            case "printer":
                return "bg-purple-500";
            default:
                return "bg-gray-500";
        }
    };

    // Navigation items based on role
    const loginNav = (() => {
        switch (role) {
            case "admin":
                return [
                    { name: "Designs", href: "/dashboard/assign-designs", icon: Package2 },
                    { name: "Orders", href: "/dashboard/assign-orders", icon: ShoppingBasket },
                    { name: "Products", href: "/dashboard/products", icon: PackagePlus },
                    { name: "Users", href: "/dashboard/users", icon: Users },
                    { name: "Settings", href: "/dashboard/settings", icon: Settings },
                ];
            case "customer":
                return [
                    { name: "Models", href: "/dashboard/models", icon: PackageOpen },
                    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingCart },
                    { name: "Settings", href: "/dashboard/settings", icon: Settings },
                ];
            case "designer":
                return [
                    { name: "Designs", href: "/dashboard/designs", icon: PackageOpen },
                ];
            case "printer":
                return [
                    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingCart },
                    { name: "Order", href: "/dashboard/printer", icon: PackageOpen },
                ];
            default:
                return [];
        }
    })();

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
                        <div className="hidden md:block gap-3">
                            {(!data?.role || data.role === "admin" || data.role === "customer") && nav_left.map((item) => (
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
                                    {data?.role === "customer" && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className="rounded-2xl p-3 text-sm font-medium border-2 bg-background dark:text-white hover:dark:text-black text-black hover:bg-gray-200 hover:text-black">
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
                                                        <span>Generate Model from your Idea</span>
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
                                    )}

                                    {/* Avatar */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                                <Avatar className="h-10 w-10">
                                                    {data?.photoURL ? (
                                                        <AvatarImage src={data.photoURL} alt={data?.name || "User"} />
                                                    ) : (
                                                        <AvatarFallback>{data?.name?.[0] || "?"}</AvatarFallback>
                                                    )}
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 bg-background p-2">
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">{data?.name || "User"}</p>
                                                    <p className="text-xs leading-none text-muted-foreground">{data?.email || ""}</p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => router.push("/dashboard")} className={`hover:bg-gray-200 hover:text-black text-white ${roleBadgeColor(data?.role)}`}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{data?.role.charAt(0).toUpperCase() + data?.role.slice(1)} Dashboard</span>
                                            </DropdownMenuItem>
                                            {Array.isArray(loginNav) && loginNav.map((item) => (
                                                <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-gray-200 hover:text-black">
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    <span>{item.name}</span>
                                                </DropdownMenuItem>
                                            ))}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => { logOut(); }} className="hover:bg-gray-200 hover:text-black">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
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
                    <div className="md:hidden flex items-center justify-center gap-3">
                        <ModeToggle />
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            {data?.photoURL ? (
                                                <AvatarImage src={data.photoURL} alt={data?.name || "User"} />
                                            ) : (
                                                <AvatarFallback>{data?.name?.[0] || "?"}</AvatarFallback>
                                            )}
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-background p-2">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{data?.name || "User"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{data?.email || ""}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push("/dashboard")} className={`hover:bg-gray-200 hover:text-black text-white ${roleBadgeColor(data?.role)}`}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>{data?.role.charAt(0).toUpperCase() + data?.role.slice(1)} Dashboard</span>
                                    </DropdownMenuItem>
                                    {data?.role !== "admin" && (
                                        <DropdownMenuItem onClick={() => router.push("/dashboard/orders")} className="hover:bg-gray-200 hover:text-black">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Orders</span>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => { logOut(); }} className="hover:bg-gray-200 hover:text-black">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="default" className="rounded-md px-3 py-2 text-sm font-medium dark:text-black hover:text-white hover:dark:text-black text-gray-300"> Menu </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-background p-2">
                                    {nav_left.map((item) => (
                                        <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-gray-200 hover:text-black">
                                            <span>{item.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    {nav_right.map((item) => (
                                        <DropdownMenuItem key={item.name} onClick={() => router.push(item.href)} className="hover:bg-gray-200 hover:text-black">
                                            <span>{item.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
