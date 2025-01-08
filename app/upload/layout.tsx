"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/config/AuthProvider";

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [router, user]);

    return <div style={{ minHeight: "calc(100vh - 82px)" }} className="container mx-auto">{children}</div>;
}