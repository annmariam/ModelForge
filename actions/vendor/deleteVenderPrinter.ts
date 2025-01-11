"use server";

import { db } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteVenderPrinter( venderId: string, printerId: string ) {
    try {
        await deleteDoc(doc(db, "users", venderId, "printers", printerId));
        console.log('Vendor printer deleted successfully')
        return { success: true, message: 'Vendor printer deleted successfully' };
        
    } catch (error) {
        console.error('Error deleting Vender Printer details', error);
        return { success: false, message: 'An error occurred while deleting the vender printer details. Please try again.' }
        
    }
}