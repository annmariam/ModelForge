"use server";

import { db } from "@/config/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

interface Design {
    customerID: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    description: string;
}

export default async function createDesign(design: Design) {
    try {
        // Add a new document to the "designs" collection
        const docRef = await addDoc(collection(db, "designs"), {
            customerId: design.customerID,
            status: "new",
            requirements: {
                material: design.material,
                quantity: design.quantity,
                size: design.size,
                color: design.color,
                description: design.description,
            },
            createdAt: serverTimestamp(),
        });

        // Add a copy of design id to user collection
        const userDesignRef = doc(db, "users", design.customerID, "designs", docRef.id);
        await setDoc(userDesignRef, {
            designId: docRef.id,
        });
        console.log("Design document created in Firestore with ID:", docRef.id);
        return true;

    } catch (error) {
        console.error("Error adding design document to Firestore:", error);
        return false;

    }
}
