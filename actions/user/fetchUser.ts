"use server";

import { db } from "@/config/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

interface User {
    name: string;
    email: string;
    photoURL: string | null;
    role: string;
    timestamp: Timestamp;
}

export async function fetchUser(userID: string): Promise<User> {
    try {
        const userDoc = doc(db, "users", userID);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            return {
                name: docData.name || "",
                email: docData.email || "",
                photoURL: docData.photoURL || null,
                role: docData.role || "",
                timestamp: docData.timestamp || Timestamp.now(),
            };

        } else {
            console.warn("No such document!");
            return { name: "", email: "", photoURL: null, role: "", timestamp: Timestamp.now() };

        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return { name: "", email: "", photoURL: null, role: "", timestamp: Timestamp.now() };

    }
}
