"use client";

import { usePathname } from "next/navigation";

export const RouteBasedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathName = usePathname();
    const isDashboard = pathName?.startsWith("/dashboard") ?? false;

    return (
        <div>
            <main style={{ minHeight: "calc(100vh - 82px)" }} className={isDashboard ? "" : "mx-auto"}>
                {children}
            </main>
        </div>
    );
}