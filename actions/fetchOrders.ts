"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Order {
    orderID: string;
    customerID: string;
    status: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    fileUrl: string;
}

export default async function fetchOrders(): Promise<Order[]> {
    try {
        const order = await getDocs(collection(db, "orders"));
        const orderData: Order[] = [];
        
        if (!order.empty) {
            order.forEach((doc) => {
                orderData.push({
                    orderID: doc.id,
                    customerID: doc.data().customerID,
                    status: doc.data().status,
                    material: doc.data().requirements.material,
                    quantity: doc.data().requirements.quantity,
                    size: doc.data().requirements.size,
                    color: doc.data().requirements.color,
                    fileUrl: doc.data().fileUrl
                });
            });
            return orderData;

        } else {
            console.warn("No such document!");
            return [];

        }
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return [];
    }
}