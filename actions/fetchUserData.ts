"use server";

import { db } from "@/config/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export default async function fetchUserData(userID: string): Promise<{ name: string; email: string, photoURL: string | null, role: string, timestamp: Timestamp }> {
    try {
        const userDoc = doc(db, "users", userID);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const docData = docSnap.data();

            // Ensure that the data matches the expected structure
            return {
                name: docData.name || "",  // Provide a default value if not found
                email: docData.email || "",  // Same for email
                photoURL: docData.photoURL || null,  // photoURL can be null if not available
                role: docData.role || "",  // Ensure role exists
                timestamp: docData.timestamp || Timestamp.now(),  // Use current timestamp if missing
            };
        } else {
            console.warn("No such document!");
            return { name: "", email: "", photoURL: null, role: "", timestamp: Timestamp.now() };
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        // Return an empty object or default values in case of error
        return { name: "", email: "", photoURL: null, role: "", timestamp: Timestamp.now() };
    }
}
