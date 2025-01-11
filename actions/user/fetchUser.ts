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

interface FetchUser {
    success: boolean;
    user?: User;
    message?: string;
}

export async function fetchUser(userID: string): Promise<FetchUser> {
    try {
        const userDoc = doc(db, "users", userID);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const docData = docSnap.data();
            const userData = {
                name: docData.name || "",
                email: docData.email || "",
                photoURL: docData.photoURL || null,
                role: docData.role || "",
                timestamp: docData.timestamp || Timestamp.now(),
            };
            return { success: true, user: userData };

        } else {
            console.warn("No such document!");
            return { success: false, message: "No such document!" };

        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return { success: false, message: "Error fetching user data!" };

    }
}
