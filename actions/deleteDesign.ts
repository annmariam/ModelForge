"use server";

import { db } from "@/config/firebase";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";

export async function deleteUser(designID: string) {
    try {
        const data = await getDocs(collection(db, 'designs', designID));
        const customerID = data.docs[0].data().customerId;
        await deleteDoc(doc(db, 'designs', designID));
        await deleteDoc(doc(db, 'users', customerID, 'designs', designID));
        console.log('Design deleted successfully');
        return { success: true, message: 'Design deleted successfully' };

    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: 'An error occurred while deleting the user. Please try again.' };

    }
}