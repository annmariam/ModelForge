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

interface OrderResponse {
    status: boolean;
    data?: Order[];
    message?: string;
}

export async function fetchOrders(): Promise<OrderResponse> {
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
            return { status: true, data: orderData };

        } else {
            console.warn("No such document!");
            return { status: false, message: "No order found" };

        }
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return { status: false, message: "Error fetching data" };
    }
}