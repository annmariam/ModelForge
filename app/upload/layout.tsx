import React from "react";

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    return <div style={{ minHeight: "calc(100vh - 82px)" }} className="container mx-auto">{children}</div>;
}