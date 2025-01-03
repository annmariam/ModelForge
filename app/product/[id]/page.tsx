"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function ProductPage() {
    const router = usePathname();
    const id = router.split('/product/');

    return (
        <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">Product ID: {id}</h1>
        </div>
    );
}
