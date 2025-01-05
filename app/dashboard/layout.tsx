"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { Loader, LogOut, ChevronLeft, ChevronRight, UserRoundPen } from "lucide-react";
import { FaTachometerAlt, FaUsers, FaCogs, FaBoxOpen, FaCheckCircle, FaUpload } from "react-icons/fa";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const pathName = usePathname();
    const { data, logOut, user } = useAuth();
    type Role = "admin" | "customer" | "designer" | "printer";
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<Role>("admin");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (user) {
            if (data?.role) {
                setRole(data.role);
                setLoading(false);
            }
        } else {
            router.push("/login");
        }
    }, [data, router, user]);

    const navItems = {
        admin: [
            { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
            { name: "Assign Orders", href: "/dashboard/assign", icon: FaCartShopping },
            { name: "Users", href: "/dashboard/users", icon: FaUsers },
            { name: "Settings", href: "/dashboard/settings", icon: FaCogs },
        ],
        customer: [
            { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
            { name: "Models", href: "/dashboard/models", icon: FaBoxOpen },
            { name: "My Orders", href: "/dashboard/orders", icon: FaCheckCircle },
            { name: "Settings", href: "/dashboard/settings", icon: FaCogs },
        ],
        designer: [
            { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
            { name: "Designs", href: "/dashboard/designs", icon: FaBoxOpen },
            { name: "Submit Design", href: "/dashboard/designs/submit", icon: FaUpload },
            { name: "Settings", href: "/dashboard/settings", icon: FaCogs },
        ],
        printer: [
            { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
            { name: "Assigned Order", href: "/dashboard/printer", icon: FaBoxOpen },
            { name: "Completed Orders", href: "/dashboard/printer/completed", icon: FaCheckCircle },
            { name: "Printer Status", href: "/dashboard/printer/status", icon: FaBoxOpen },
            { name: "Designs", href: "/dashboard/designs", icon: FaBoxOpen },
            { name: "Submit Design", href: "/dashboard/designs/submit", icon: FaUpload },
            { name: "Settings", href: "/dashboard/settings", icon: FaCogs },
        ],
    };

    const roleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-red-500 text-white">Admin</Badge>;
            case "customer":
                return <Badge className="bg-blue-500 text-white">Customer</Badge>;
            case "designer":
                return <Badge className="bg-green-500 text-white">Designer</Badge>;
            case "printer":
                return <Badge className="bg-purple-500 text-white">Printer</Badge>;
            default:
                return <Badge className="bg-gray-500 text-white">--</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-82px)]">
                <Loader size={48} className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-82px)] bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className={`transition-transform duration-300 bg-white shadow-md dark:bg-gray-800 ${sidebarOpen ? "w-64" : "w-16"} flex flex-col`}>
                <div className="flex items-center justify-between p-2">
                    <div className={`${sidebarOpen ? "flex" : "hidden"} flex-col`}>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">3D Print Hub</h2>
                        {roleBadge(role)}
                    </div>
                    <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-800 dark:text-gray-100">
                        {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                    </Button>
                </div>
                <nav className="flex-grow">
                    {navItems[role]?.map((item) => (
                        <Link key={item.name} href={item.href} className={`flex items-center px-4 py-2 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${pathName === item.href ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
                            <item.icon size={24} className={`${pathName === item.href ? "text-red-600 dark:text-red-400" : ""}`} />
                            <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}> {item.name} </span>
                        </Link>
                    ))}
                </nav>
                <div className={`flex flex-col ${sidebarOpen ? "items-start" : "items-center"}`}>
                    <Link href="/dashboard/profile">
                        <div className={`flex items-center px-4 py-2 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${pathName === "/dashboard/profile" ? "bg-gray-200 dark:bg-gray-700" : "" }`}>
                            <UserRoundPen size={24} className={`${pathName === "/dashboard/profile" ? "text-red-600 dark:text-red-400" : ""}`} />
                            <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}>Profile</span>
                        </div>
                    </Link>
                    <button onClick={logOut} className={`flex ${sidebarOpen ? "items-start" : "items-center"} w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`}>
                        <LogOut size={24} />
                        <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
}
