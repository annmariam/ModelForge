"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchCompletedPrintUser(uid: string): Promise<number> {
    try {
        const ordersCollection = collection(db, "users", uid, "completedPrints");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching working print count for user: ", error);
        return 0;
    }
}