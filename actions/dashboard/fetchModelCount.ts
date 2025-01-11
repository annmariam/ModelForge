"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Admin: All Model Count
export async function fetchModelCount(): Promise<number> {
    try {
        const modelsCollection = collection(db, "models");
        const modelsSnapshot = await getDocs(modelsCollection);
        return modelsSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching model count: ", error);
        return 0;
    }
}