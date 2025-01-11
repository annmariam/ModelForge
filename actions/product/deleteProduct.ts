"use server";

import { db } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteProduct(productID: string) {
    try {
        await deleteDoc(doc(db, 'products', productID));
        console.log('Product deleted successfully');
        return { success: true, message: 'Product deleted successfully' };
        
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, message: 'An error occurred while deleting the product. Please try again.' };

    }
}