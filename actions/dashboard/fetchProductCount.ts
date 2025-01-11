"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Admin: All Product Count
export async function fetchProductCount(): Promise<number> {
    try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        return productsSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching product count: ", error);
        return 0;
    }
}