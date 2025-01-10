"use server";

import { db } from "@/config/firebase";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";

export async function deleteOrder(orderID: string) {
    try {
        const data = await getDocs(collection(db, 'orders', orderID));
        const customerID = data.docs[0].data().customerId;
        await deleteDoc(doc(db, 'orders', orderID));
        await deleteDoc(doc(db, 'users', customerID, 'orders', orderID));
        console.log('Order deleted successfully');
        return { success: true, message: 'Order deleted successfully' };
        
    } catch (error) {
        console.error('Error deleting order:', error);
        return { success: false, message: 'An error occurred while deleting the order. Please try again.' };
        
    }
}