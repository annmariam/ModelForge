"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface ProductCollection {
    productID: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    material: string;
    size: string;
    "model file": string;
}

export default async function fetchProducts(): Promise<ProductCollection[]> {
    try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);

        const productsData: ProductCollection[] = productsSnapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
                productID: doc.id,
                name: docData.name || "",
                price: docData.price || 0,
                image: docData.image || "",
                description: docData.description || "",
                category: docData.category || "",
                material: docData.material || "",
                size: docData.size || "",
                "model file": docData["model file"] || "",
            };
        });
        return productsData;
        
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
        
    }
}