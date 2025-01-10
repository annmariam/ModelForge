"use server";

import { db } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default async function createProduct(name: string, price: number, image: string, description: string, category: string, material: string, size: string, link: string) {
    try {
        // Add a new document to the "products" collection
        const docRef = await addDoc(collection(db, "products"), {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            material: material,
            size: size,
            "model file": link,
            createdAt: serverTimestamp(),
        });
        console.log("Product document created in Firestore with ID:", docRef.id);
        return { success: true, message: "Product added successfully." };

    } catch (error) {
        console.error("Error adding product document to Firestore:", error);
        return { success: false, message: "An error occurred during product creation. Please try again." };
    }
}