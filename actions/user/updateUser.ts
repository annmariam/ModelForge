"use server";

import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface UserCollection {
    userID: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

export async function updateUser(user: UserCollection) {
    const docRef = doc(db, "users", user.userID);

    try {
        await updateDoc(docRef, {
            name: user.name,
            email: user.email,
            photoURL: user.photoURL,
            role: user.role,
        });
        console.log("User document updated in Firestore.");
        return { success: true, message: "User document updated successfully." };
    
    } catch (error) {
        console.error("Error updating user document: ", error);
        return { success: false, message: "Error updating user document." };

    }
}