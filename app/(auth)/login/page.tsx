'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/config/AuthProvider";
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const { signInGoogle, signInEmail } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setErrorMessage('Both fields are required. Please fill in all fields.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      await signInEmail(email, password);
      setMessage('You have successfully logged in.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.log(error)
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setTimeout(() => {
        setMessage('');
        setError(false);
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInGoogle();
      setMessage('You have successfully logged in with Google.');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setTimeout(() => {
        setMessage('');
        setError(false);
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
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
              <div className="flex items-center text-red-600" aria-live="polite">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}
            {message && (
              <div className="flex items-center text-green-600" aria-live="polite">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">{message}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={!email || !password}>
              Login
            </Button>
            <Button type="button" className="w-full" variant="outline" onClick={handleGoogleSignIn}>
              <FcGoogle /> Sign in with Google
            </Button>
            <div className="flex justify-between">
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
