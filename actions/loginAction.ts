"use server";

import { cookies } from "next/headers";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const remember = formData.get('remember') as string;
  
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userType = userData?.usertype;
            console.log("User Type:", userType);
            if (remember === 'on') {
                (await cookies()).set('user', email, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
            }
            return { success: true, message:"Sign In Successfull", role: userType };
        } else {
            await signOut(auth);
            return { success: false, message: "User data not found in Firestore" };
        }
    } catch (error) {
        await signOut(auth);
        return { success: false, message: error || "Sign In Failed" };
    }
}  
  