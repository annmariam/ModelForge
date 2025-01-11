"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Design {
    designID: string;
    customerID: string;
    status: string;
    material: string;
    quantity: number;
    size: string;
    color: string;
    description: string;
}

interface DesignResponse {
    success: boolean;
    data?: Design[];
    message?: string;
}

export async function fetchDesigns(): Promise<DesignResponse> {
    try {
        const design = await getDocs(collection(db, "designs"));
        const designData: Design[] = [];

        if (!design.empty) {
            design.forEach((doc) => {
                designData.push({
                    designID: doc.id,
                    customerID: doc.data().customerID,
                    status: doc.data().status,
                    material: doc.data().requirements.material,
                    quantity: doc.data().requirements.quantity,
                    size: doc.data().requirements.size,
                    color: doc.data().requirements.color,
                    description: doc.data().requirements.description
                });
            });
            return { success: true, data: designData };

        } else {
            console.warn("No such document!");
            return { success: false, message: "No designs found" };

        }

    } catch (error) {
        console.error("Error fetching designs: ", error);
        return { success: false, message: "Error fetching designs" };
    }
}
