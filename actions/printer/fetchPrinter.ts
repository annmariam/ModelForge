"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface PrinterDevice {
    id: string;
    name: string;
    status: "active" | "inactive";
    workID: string;
}

export async function fetchPrinter( userID: string ) {
    try {
        const printerRef = collection(db, "users", userID, "printers")
        const printerData = await getDocs(printerRef);

        const data: PrinterDevice[] = printerData.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            status: doc.data().status,
            workID: doc.data().workID || "N/A",
        }));

        console.log("Fetched Vender Data")
        return { success: true, data: data, message: "Data fetched Successfully" };
        
    } catch (error) {
        console.error(error);
        return { success: false, message: "Fetching Vender Data Failed" };
        
    }
}