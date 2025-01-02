"use server";

import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function loginAction(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: "User logged in successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Login failed" };
    }
}