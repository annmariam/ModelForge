"use server";

import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function registerAction(email: string, password: string, name: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: name,
            email: email,
            role: 'customer',
            timestamp: serverTimestamp()
        });
        console.log('User registered:', userCredential.user.uid);

        return { success: true, message: "User registered successfully" };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: "Registration failed" };
    }
}