"use server";

import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default async function fetchVender(userID: string) {
    try {
        const userRef = doc(db, "users", userID);
        const userData = await getDoc(userRef);
        
        const printerRef = collection(db, "printers");
        const printerData = await getDocs(printerRef);

        if (userData.exists() && !printerData.empty) {
            const result = {
                name: userData.data().name,
                email: userData.data().email,
                photoURL: userData.data().photoURL,
                role: userData.data().role,
                phone: userData.data().phone || "N/A",
                address: userData.data().address || "N/A",

                printerDetails: printerData.docs.map((printer) => ({
                    id: printer.id,
                    name: printer.data().name,
                    status: printer.data().status,
                }))
            }
            return { success: true, data: result };

        }

        
    } catch (error) {
        console.error(error);
        return { success: false, error: "Fetching Vender Data Failed" };
        
    }
}