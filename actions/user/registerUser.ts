"use server";

import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface UserData {
    name: string;
    email: string;
    photoURL: string;
    role: string;
    category?: string;
    timestamp: ReturnType<typeof serverTimestamp>;
}

export async function registerUser(email: string, password: string, name: string, image: string, role: string = 'customer', category?: string) {
    // Validate input fields
    if (!email || !password || !name || !image) {
        return { success: false, message: 'All fields are required.' };
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData: UserData = {
            name,
            email,
            photoURL: image,
            role,
            timestamp: serverTimestamp(),
        };
        // Add category if the role is 'printer'
        if (role === 'printer') {
            if (!category) {
                return { success: false, message: 'Category is required for printer role.' };
            }
            userData.category = category;
        }

        // Save user data in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), userData);

        console.log('User registered:', userCredential.user.uid);
        return { success: true, message: 'Registration Success', uid: userCredential.user.uid };

    } catch (error: any) {
        console.error('Error registering user:', error);

        let message = 'An error occurred during registration. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
            message = 'The email address is already in use by another account.';
        } else if (error.code === 'auth/weak-password') {
            message = 'The password is too weak. Please choose a stronger password.';
        }

        return { success: false, message };
    }
}
