"use server";

import { db } from "@/config/firebase";
import { User as UserType } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default async function addUser(user: UserType) {
    const docRef = doc(db, "users", user.uid);

    // Get user document
    const userDoc = await getDoc(docRef);

    // Create one if it does not exist
    if (!userDoc.exists()) {
        await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            role: "customer",
            timestamp: serverTimestamp(),
        });
        console.log("User document created in Firestore.");
    } else {
        console.log("User document already exists in Firestore.");
    }
};