"use server";

import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

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

interface DesignData {
    success: boolean;
    data?: Design | null;
    message?: string;
}

export async function fetchDesign(designID: string): Promise<DesignData> {
    try {
        const designRef = doc(db, "designs", designID);
        const designSnap = await getDoc(designRef);

        if (designSnap.exists()) {
            const designData: Design = {
                designID: designSnap.id,
                customerID: designSnap.data().customerID,
                status: designSnap.data().status,
                material: designSnap.data().requirements.material,
                quantity: designSnap.data().requirements.quantity,
                size: designSnap.data().requirements.size,
                color: designSnap.data().requirements.color,
                description: designSnap.data().requirements.description
            };
            return { success: true, data: designData };

        } else {
            console.warn("No such document!");
            return { success: false, message: "No such document!" };

        }
        
    } catch (error) {
        console.error("Error fetching design: ", error);
        return { success: false, message: "Error fetching design" };
    }
}