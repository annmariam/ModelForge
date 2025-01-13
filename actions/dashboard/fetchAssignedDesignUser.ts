"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchAssignedDesignUser(uid: string): Promise<number> {
    try {
        const ordersCollection = collection(db, "users", uid, "assignedDesigns");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching working design count for user: ", error);
        return 0;
    }
}