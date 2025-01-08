"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { BadgeCheck, ChevronLeft, ChevronRight, FileUp, LayoutDashboard, Loader, LogOut, PackageOpen, PackagePlus, Users, UserRoundPen, ShoppingBasket, Settings } from "lucide-react";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const pathName = usePathname();
    const { data, logOut, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<Role>("admin");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    type Role = "admin" | "customer" | "designer" | "printer";

    useEffect(() => {
        if (user) {
            if (data?.role) {
                setRole(data.role);
                setLoading(false);
            }
        } else {
            router.push("/");
        }
    }, [data, router, user]);

    const navItems = {
        admin: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Assign Designs", href: "/dashboard/assign-designs", icon: PackagePlus },
            { name: "Assign Orders", href: "/dashboard/assign-orders", icon: ShoppingBasket },
            { name: "Users", href: "/dashboard/users", icon: Users },
            { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ],
        customer: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Models", href: "/dashboard/models", icon: PackageOpen },
            { name: "My Orders", href: "/dashboard/orders", icon: BadgeCheck },
            { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ],
        designer: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Designs", href: "/dashboard/designs", icon: PackageOpen },
            { name: "Submit Design", href: "/dashboard/designs/submit", icon: FileUp },
            { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ],
        printer: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Assigned Order", href: "/dashboard/printer", icon: PackageOpen },
            { name: "Completed Orders", href: "/dashboard/printer/completed", icon: BadgeCheck },
            { name: "Printer Status", href: "/dashboard/printer/status", icon: PackageOpen },
            { name: "Designs", href: "/dashboard/designs", icon: PackageOpen },
            { name: "Submit Design", href: "/dashboard/designs/submit", icon: FileUp },
            { name: "Settings", href: "/dashboard/settings", icon: Settings },
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
                        <Link key={item.name} href={item.href} className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} px-4 py-2 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${pathName === item.href ? "bg-gray-200 dark:bg-gray-700" : ""}`}>
                            <item.icon size={24} className={`${pathName === item.href ? "text-red-600 dark:text-red-400" : ""}`} />
                            <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}> {item.name} </span>
                        </Link>
                    ))}
                </nav>
                <div className={`flex flex-col w-full ${sidebarOpen ? "items-start" : "items-center"}`}>
                    <button onClick={() => router.push("/dashboard/profile")} className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`}>
                        <UserRoundPen size={24} className={`${pathName === "/dashboard/profile" ? "text-red-600 dark:text-red-400" : ""}`} />
                        <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}>Profile</span>
                    </button>
                    <button onClick={logOut} className={`flex items-center ${sidebarOpen ? "justify-start" : "justify-center"} w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`}>
                        <LogOut size={24} />
                        <span className={`${sidebarOpen ? "ml-2" : "hidden"} block`}>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="mx-auto py-6 sm:px-6 lg:px-8">
                    <div className='w-full flex justify-between items-center pb-5'>                        
                        <span className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{navItems[role].find(link => link.href === pathName)?.name}</span>
                        <Button variant={"destructive"} onClick={logOut}>Logout</Button>
                    </div>
                    <div>{children}</div>
                </div>
            </main>
        </div>
    );
}
