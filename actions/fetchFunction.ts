"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Admin: All User Count
export async function fetchUserCount(): Promise<number> {
    try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        return usersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching user count: ", error);
        return 0;
    }
}

// Admin: All Orders Count
export async function fetchOrderCount(): Promise<number> {
    try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching order count: ", error);
        return 0;
    }
}

// Admin: All Model Count
export async function fetchModelCount(): Promise<number> {
    try {
        const modelsCollection = collection(db, "models");
        const modelsSnapshot = await getDocs(modelsCollection);
        return modelsSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching model count: ", error);
        return 0;
    }
}

// Admin: All Product Count
export async function fetchProductCount(): Promise<number> {
    try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        return productsSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching product count: ", error);
        return 0;
    }
}

// Customer: Order Count
export async function fetchOrderCountUser(uid: string): Promise<number> {
    try {
        const ordersCollection = collection(db, "users", uid, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching order count for user: ", error);
        return 0;
    }
}

// Customer: Modal Count
export async function fetchModelCountUser(uid: string): Promise<number> {
    try {
        const ordersCollection = collection(db, "users", uid, "models");
        const ordersSnapshot = await getDocs(ordersCollection);
        return ordersSnapshot.docs.length;
    } catch (error) {
        console.warn("Error fetching order count for user: ", error);
        return 0;
    }
}
