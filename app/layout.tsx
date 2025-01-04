import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/config/AuthProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { RouteBasedLayout } from "@/components/routebasedlayout";
import { ThemeProvider } from "@/components/theme/theme-provider";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <AuthProvider>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Navbar />
                        <RouteBasedLayout>{children}</RouteBasedLayout>
                        <Footer />
                    </ThemeProvider>
                </body>
            </AuthProvider>
        </html>
    );
}
