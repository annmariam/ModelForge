'use client';

import { useRouter } from 'next/navigation';
import { auth, db } from '@/config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);

    const fetchUserData = async (user) => {
        if (user) {
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setData(data);
                }
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        }
    };

    // Monitor the authentication state and update user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            fetchUserData(user);
        });
        return () => unsubscribe();
    }, []);

    const signInGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const signInEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        router.push('/');
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, data, signInGoogle, signInEmail, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
