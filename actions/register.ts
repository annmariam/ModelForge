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
            usertype: 'admin',
            timestamp: serverTimestamp()
        });

        return { success: true, message: "User registered successfully", user: userCredential.user };
    } catch (error) {
        return { success: false, message: error || "Registration failed" };
    }
}