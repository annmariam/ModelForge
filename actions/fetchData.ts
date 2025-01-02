"use server";

import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function fetchData(userID: string): Promise<{ photoURL: string, userName: string }> {
    try {
        const userDoc = doc(db, "users", userID);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
            const { photoURL, name } = docSnap.data();
            console.log("Fetched Data:", { photoURL, name });
            return { photoURL: photoURL || "", userName: name || "" };
        } else {
            console.warn("No such document!");
            return { photoURL: "", userName: "" };
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        return { photoURL: "", userName: "" };
    }
}
