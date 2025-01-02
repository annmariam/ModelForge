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
    const [userData, setUserData] = useState(null);

    // Monitor the authentication state and update user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user.uid);
        });
        return () => unsubscribe();
    }, []);

    // Fetch user data when user is set
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log(data);
                        setUserData(data);
                    }
                } catch (error) {
                    console.error('Error getting user data:', error);
                }
            }
        };

        fetchUserData();
    }, [user]); // Depend on user state change to trigger this effect

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
        <AuthContext.Provider value={{ user, userData, signInGoogle, signInEmail, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
