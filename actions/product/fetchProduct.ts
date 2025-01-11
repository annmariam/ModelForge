"use server";

import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

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

interface FetchProductResponse {
    success: boolean;
    data?: ProductCollection;
    message?: string;
}

export async function fetchProducts(productID: string): Promise<FetchProductResponse> {
    try {
        const productsCollection = doc(db, "products", productID);
        const productsSnapshot = await getDoc(productsCollection);
        const docData = productsSnapshot.data();
        if (!docData || docData.empty) {
            return { success: false, message: "Product not found" };
        }

        const productData: ProductCollection = {
            productID: productsSnapshot.id,
            name: docData.name || "",
            price: docData.price || 0,
            image: docData.image || "",
            description: docData.description || "",
            category: docData.category || "",
            material: docData.material || "",
            size: docData.size || "",
            "model file": docData["model file"] || "",
        };
        return { success: true, data: productData };

    } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        } else {
            return { success: false, message: "An unknown error occurred" };
        }
        
    }
}