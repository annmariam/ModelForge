"use server"

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchAssignedPrint(): Promise<number> {
    try {
        const ordersCollection = collection(db, "assignedPrints");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching order count for user: ", error);
        return 0;
    }
}