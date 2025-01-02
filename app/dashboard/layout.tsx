"use client";

import { auth } from '@/config/firebase';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });

        if (!user) {
            router.push("/login");
        }

        return () => unsubscribe(); // Cleanup subscription
    }, [router, user]);

    return ( 
        <div>
            {children}
        </div>
    );
}