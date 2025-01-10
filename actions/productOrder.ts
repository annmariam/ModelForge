"use server";

import { db } from "@/config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function productOrder(productID: string, uid: string) {
    try {
        const time = serverTimestamp();
        // Add a products to orders collection
        const orderRef = doc(db, "orders");
        await setDoc(orderRef, {
            productID: productID,
            createdAt: time,
        });

        const userRef = doc(db, "users", uid, "orders", orderRef.id);
        const docRef = await setDoc(userRef, {
            productID: productID,
            status: "new",
            createdAt: time
        });
        console.log("Product document created in Firestore with ID:", docRef);
        return { success: true, message: "Product order created successfully" };

    } catch (error) {
        console.error("Error adding product document to Firestore:", error);
        return { success: false, message: "Error creating product order" };

    }
}