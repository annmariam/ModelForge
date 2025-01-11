"use server";

import { db } from "@/config/firebase";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

interface Order {
    customerID: string;
    status: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    fileUrl: string;
}

export async function createOrder(order: Order) {
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

        // Add a copy of order id to user collection
        const userOrderRef = doc(db, "users", order.customerID, "orders", docRef.id);
        await setDoc(userOrderRef, {
            orderId: docRef.id,
        });
        console.log("order document created in Firestore with ID:", docRef.id);
        return { success: true, message: "Order created successfully" };

    } catch (error) {
        console.error("Error adding order document to Firestore:", error);
        return { success: false, message: "Order was not created successfully" };

    }
}
