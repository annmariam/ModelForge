"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface UserCollection {
    userID: string;
    name: string;
    email: string;
    photoURL: string;
    role: string;
}

export async function fetchUsers(): Promise<UserCollection[]> {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const usersData: UserCollection[] = usersSnapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
                userID: doc.id,
                name: docData.name || "",
                email: docData.email || "",
                photoURL: docData.photoURL || "",
                role: docData.role || "user", // Default role if missing
            };
        });

        return usersData;

    } catch (error) {
        console.error("Error fetching data:", error);
        return [];

    }
}
