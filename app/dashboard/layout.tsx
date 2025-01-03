"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/config/AuthProvider";
// import { Bell, User, Settings, LogOut } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const { data, logOut } = useAuth();
    type Role = "admin" | "customer" | "printer";
    const [role, setRole] = useState<Role>("admin");

    // Update role when data changes
    useEffect(() => {
        if (data?.role) {
            setRole(data.role);
        }
    }, [data]);


    const navItems = {
        admin: [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Profile", href: "/dashboard/profile" },
            { name: "Users", href: "/dashboard/users" },
            { name: "Settings", href: "/dashboard/settings" },
        ],
        customer: [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Models", href: "/dashboard/models" },
            { name: "My Orders", href: "/dashboard/orders" },
            { name: "Profile", href: "/dashboard/profile" },
            { name: "Settings", href: "/dashboard/settings" },
        ],
        printer: [
            { name: "Dashboard", href: "/dashboard" },
            { name: "Assigned Order", href: "/dashboard/printer" },
            { name: "Completed Orders", href: "/dashboard/printer/completed" },
            { name: "Printer Status", href: "/dashboard/printer/status" },
            { name: "Designs", href: "/dashboard/designs" },
            { name: "Submit Design", href: "/dashboard/designs/submit" },
            { name: "Settings", href: "/dashboard/settings" },
        ],
    };

    return (
        <div className="h-[calc(100vh-82px)]">
            <div className="flex h-full bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md dark:bg-gray-800">
                    <div className="p-4">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">3D Print Hub</h2>
                        <p className="text-sm text-gray-600 mt-1 capitalize dark:text-gray-400">
                        {role} Dashboard
                        </p>
                    </div>
                    <div className="flex flex-col h-[calc(100vh-180px)] justify-between">
                        <nav>
                            {navItems[role]?.map((item) => (
                                <Link key={item.name} href={item.href} className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${router.asPath === item.href ? "bg-gray-200 dark:bg-gray-700" : "text-red-400" }`}> {item.name} </Link>
                            ))}
                        </nav>
                        <Button variant={"link"} onClick={logOut} className="flex items-center justify-center w-full p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700">
                            <LogOut size={24} className="mr-2" /> Log Out
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    {/* Page Content */}
                    <div className="mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
