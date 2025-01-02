"use server";

import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function loginAction(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

        return { success: true, message: "User logged in successfully", user: userDoc.data() };
    } catch (error) {
        return { success: false, message: error || "Login failed" };
    }
}