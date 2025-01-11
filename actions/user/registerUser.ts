"use server";

import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function registerUser(email: string, password: string, name: string, image: string, role: string = 'customer', catogory: string = '') {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: name,
            email: email,
            photoURL: image,
            role: role,
            catogory: catogory,
            timestamp: serverTimestamp()
        });
        console.log('User registered:', userCredential.user.uid);
        return { success: true, message: 'Registration Success' };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'An error occurred during registration. Please try again.' };
    }
}
