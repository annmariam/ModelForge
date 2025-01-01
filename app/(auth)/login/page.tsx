'use client'

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginAction from "@/actions/loginAction";
import { Button } from "@/components/ui/button";
import { useEffect, useActionState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  )
}

export default function LoginPage() {
    const [state, formAction] = useActionState(loginAction, null)

    useEffect(() => {
        if (state?.success) {
        // Redirect or update UI on successful login
        console.log("Login successful!")
        }
    }, [state])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <div className={cn("grid gap-6")}>
                    <form action={formAction}>
                        <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                            Email
                            </Label>
                            <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            required
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                            Password
                            </Label>
                            <Input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            autoCorrect="off"
                            required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" name="remember" />
                            <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            Remember me
                            </label>
                        </div>
                        <SubmitButton />
                        </div>
                    </form>
                    {state?.message && (
                        <p className={cn("text-sm text-center", state.success ? "text-green-600" : "text-red-600")}> {state.message} </p>
                    )}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                        </div>
                    </div>
                    <Button variant="outline" type="button">
                        <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Google" className="mr-2 h-4 w-4" /> Sign In With Google
                    </Button>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link href="/forgot-password" className="hover:text-brand underline underline-offset-4">
                        Forgot your password?
                    </Link>
                </p>
            </div>
        </div>
    )
}
