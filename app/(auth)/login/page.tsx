'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both fields are required. Please fill in all fields.');
      return;
    }

    console.log('Logging in user:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000))
    setMessage('Account created successfully. Redirecting to login page...')

    setTimeout(() => {
      setError('')
      setMessage('')
    }, 5000)   
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className='text-center'>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account to continue.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <Button type="submit" className="w-full">Login</Button>
            <div>
              <Button variant="link" className="text-sm">Forgot password?</Button>
              <Link href="/register">
                <Button variant="link" className="text-sm">Create an account</Button>
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
