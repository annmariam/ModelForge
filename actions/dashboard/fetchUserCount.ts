"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Admin: All User Count
export async function fetchUserCount(): Promise<number> {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        return usersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching user count: ", error);
        return 0;
    }
}
