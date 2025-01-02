"use client";

import { useAuth } from "@/config/AuthProvider";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const { user, userData, logOut } = useAuth();

    console.log(user, userData);

    return ( 
        <div>
            <header>
                <h1>Welcome, {user?.name}</h1>
                <button onClick={logOut}>Log Out</button>
            </header>
            {children}
        </div>
    );
}