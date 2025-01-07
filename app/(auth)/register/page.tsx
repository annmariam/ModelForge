'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerUser } from '@/actions/registerUser';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    };

    // Handle adding data to the database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!image) {
            setError('Please upload a profile image.')
            return
        }

        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required. Please fill in all fields.')
            return
        }
        
        if (password !== confirmPassword) {
            setError('Passwords do not match. Re-enter your password and confirm password.')
            return
        }
        
        // Call the register action
        try {
            const response = await registerUser(email, password, name, image);
            if (response.success) {
                setMessage(response.message);
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.log(error)
            setError('An error occurred during registration. Please try again.');
        }

        // Clear form fields
        setName('')
        setEmail('')
        setImage('')
        setPassword('')
        setConfirmPassword('')
        
        // Clear register status after 10 seconds
        setTimeout(() => {
            setError('')
            setMessage('')
        }, 10000)    
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader className='text-center'>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Create a new account to get started.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} minLength={3} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmpassword">Confirm Password</Label>
                            <Input id="confirmpassword" type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={8} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        {error && (
                            <div className="flex items-center text-red-600">
                                <AlertCircle className="w-10 h-10 mr-2" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                        {message && (
                            <div className="flex items-center text-green-600">
                                <CheckCircle className="w-10 h-10 mr-2" />
                                <span className="text-sm">{message}</span>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button type="submit" className="w-full">Register</Button>
                        <Link href="/login">
                            <Button variant="link" className="text-sm">Log in to an existing account</Button> 
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

