"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Admin: All Orders Count
export async function fetchOrderCount(): Promise<number> {
    try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching order count: ", error);
        return 0;
    }
}
