"use server";

import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Order {
    customerID: string;
    status: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    fileUrl: string;
}

export default async function addOrder(order: Order) {
    try {
        // Add a new document to the "orders" collection
        const docRef = await addDoc(collection(db, "orders"), {
            customerId: order.customerID,
            status: "new",
            requirements: {
                material: order.material,
                quantity: order.quantity,
                size: order.size,
                color: order.color,
            },
            fileUrl: order.fileUrl,
            createdAt: serverTimestamp(),
        });

        console.log("order document created in Firestore with ID:", docRef.id);
    } catch (error) {
        console.error("Error adding order document to Firestore:", error);
    }
}
