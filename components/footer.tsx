"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
    const path = usePathname();

    if (path === '/login' || path === '/register' || path.startsWith('/dashboard')) {
        return null;
    }

    return(
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-gray-300">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Community</h4>
                        <ul className="space-y-2">
                            <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
                            <li><Link href="/forum" className="hover:text-gray-300">Forum</Link></li>
                            <li><Link href="/creators" className="hover:text-gray-300">Creators</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="/help" className="hover:text-gray-300">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-gray-300">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-gray-300">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
                            <li><Link href="/copyright" className="hover:text-gray-300">Copyright</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2025 ModelForge. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}