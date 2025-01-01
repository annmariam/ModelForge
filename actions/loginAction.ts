"use server";

import { cookies } from "next/headers";

export default async function loginAction(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const remember = formData.get('remember') as string
  
    if (email === 'user@example.com' && password === 'password') {
        if (remember === 'on') {
            (await cookies()).set('user', email, { maxAge: 30 * 24 * 60 * 60 }) // 30 days
        }
        return { success: true, message: 'Login successful!' }
    } else {
        return { success: false, message: 'Invalid email or password' }
    }
}  
  