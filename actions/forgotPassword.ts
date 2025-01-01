"use server";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export default async function forgetPasswordAction(formData: FormData) {
    const email = formData.get("email") as string;
    
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Password reset email sent!" };
    } catch (error) {
        return { success: false, message: error || "An error occurred" };
    }
};
