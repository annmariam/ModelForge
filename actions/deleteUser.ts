"use server";

import { db } from "@/config/firebase";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";

export async function deleteUser(userID: string) {
    try {
        // Main Doc
        await deleteDoc(doc(db, 'users', userID));

        // Subcollections
        const subcollections = ['orders', 'products'];
        for (const collectionID of subcollections) {
            const querySnapshot = await getDocs(collection(db, 'users', userID, collectionID));
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        }
        return { success: true, message: 'User deleted successfully' };

    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, message: 'An error occurred while deleting the user. Please try again.' };

    }
}