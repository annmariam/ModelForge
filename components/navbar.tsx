"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/public/ModelForge.png";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import React, { useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const nav_left = [
    { name: "Home", href: "/" },
    { name: "3D Model", href: "/3d-model" },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
    { name: "Contests", href: "/contests" },
];
const nav_right = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
];

export function Navbar() {
    const { user, userData } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b bg-background">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center px-3 py-2">
                            <Image src={Logo} alt="ModelForge" width={50} height={50} />
                            <span className="text-2xl font-bold text-primary"> ModelForge </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="flex items-baseline">
                                {nav_left.map((item) => (
                                    <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-200 hover:text-primary"> {item.name} </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="hidden md:block">
                        <div className="flex items-center justify-center">
                            <ModeToggle />
                            {user ? (
                                <Avatar>
                                    <AvatarImage src={userData.photoURL || ""} alt={userData.name} />
                                    <AvatarFallback>{userData.name}</AvatarFallback>
                                </Avatar>
                            ) : (
                                nav_right.map((item) => (
                                    <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"> {item.name} </Link>
                                ))
                            )}
                        </div>
                    </div>
                    {/* Mobile Section */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label={isOpen ? "Close Menu" : "Open Menu"}>
                                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[240px] bg-background sm:w-[300px]">
                                <nav className="flex flex-col space-y-4 mt-4">
                                    {nav_left.map((item) => (
                                        <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"> {item.name} </Link>
                                    ))}
                                    {!user &&
                                        nav_right.map((item) => (
                                            <Link key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary dark:text-gray-300"> {item.name} </Link>
                                        ))}
                                    <ModeToggle />
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                    {user && (
                        <div className="md:hidden">
                            <Avatar>
                                <AvatarImage src={userData.photoURL || ""} alt={userData.name} />
                                <AvatarFallback>{userData.name}</AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
