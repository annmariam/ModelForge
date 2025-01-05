'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import registerAction from "@/actions/register";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState<File | string>('');
    const [message, setMessage] = useState('');

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    // Handle adding data to the database
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !password || !image) {
            setError('All fields are required. Please fill in all fields.');
            return;
        }
        
        // Call the register action
        try {
            const response = await registerAction(email, password, name);
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
        setName('');
        setEmail('');
        setImage('');
        setPassword('');
        
        // Clear register status after 10 seconds
        setTimeout(() => {
        setError('')
        setMessage('')
        }, 10000)    
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
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
                            <Label htmlFor="image">Profile Image</Label>
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
                    <CardFooter className="flex flex-col space-y-2">
                        <Button type="submit" className="w-full">Register</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}