"use server";

import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function updateProduct(id: string, name: string, price: number, image: string, description: string, category: string, material: string, size: string, link: string) {
    try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            material: material,
            size: size,
            "model file": link,
        });
        console.log("Product document updated in Firestore with ID:", id);
        return { success: true, message: "Product updated successfully." };

    } catch (error) {
        console.error("Error updating product document in Firestore:", error);
        return { success: false, message: "An error occurred during product update. Please try again." };
    }
}
