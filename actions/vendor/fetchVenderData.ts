"use server";

import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export async function fetchVenderData(userID: string) {
    try {
        const userRef = doc(db, "users", userID);
        const userData = await getDoc(userRef);
        
        const printerRef = collection(db, "users", userID, "printers");
        const printerData = await getDocs(printerRef);

        const materialRef = collection(db, "users", userID, "materials");
        const materialData = await getDocs(materialRef);

        if (userData.exists() && !printerData.empty) {
            const result = {
                name: userData.data().name,
                email: userData.data().email,
                photoURL: userData.data().photoURL,
                role: userData.data().role,
                phone: userData.data().phone || "N/A",
                address: userData.data().address || "N/A",

                materialDetails: materialData.docs.map((material) => ({
                    id: material.id,
                    name: material.data().name,
                    color: material.data().color,
                    quantity: material.data().quantity,
                    status: material.data().status,
                })),

                printerDetails: printerData.docs.map((printer) => ({
                    id: printer.id,
                    name: printer.data().name,
                    status: printer.data().status,
                    workID: printer.data().workID || "N/A",
                }))
            }
            return { success: true, data: result };

        }

        
    } catch (error) {
        console.error(error);
        return { success: false, error: "Fetching Vender Data Failed" };
        
    }
}