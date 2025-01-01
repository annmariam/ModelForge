import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ModelForge",
  description: "ModelForge is a comprehensive 3D printing service platform offering seamless user experiences for customers, designers, and printers. Empowering creativity with features like user-friendly dashboards, geolocation-based printing, customizable 3D model uploads, and a unique rewards system for loyal users and sellers. Whether you're uploading, selling, or printing, ModelForge connects innovation and precision with state-of-the-art technology.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <Navbar />
                    <main style={{ minHeight: "calc(100vh - 82px)" }} className="flex justify-center items-center">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
