"use server";

import { db } from "@/config/firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default async function addOrUpdateVenderPrinter( venderId: string, name: string, status: string, printerId?: string) {
    try {
        if (printerId) {
            const docRef = doc(db, "users", venderId, "printers", printerId)
            await updateDoc(docRef, {
                name: name,
                status: status,
                updateAt: serverTimestamp()
            })
            console.log("Updating Vender Device")
            return { success: true, message: "Added Printer Devices" }
        } else {
            const venderRef = await addDoc(collection(db, "users", venderId, "printers"),{
                name: name,
                status: status,
                createdAt: serverTimestamp()
            })
            console.log("Adding Vender Device", venderRef.id)
            return { success: true, message: "Added Printer Devices" }
        }

    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, message: "Failed To Add Vender Printer Details" };

    }
}