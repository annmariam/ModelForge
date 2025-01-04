import React from "react";

export default function CategoryLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className=" p-4 sm:p-6 lg:p-8">
            {children}
        </div>
    )
}