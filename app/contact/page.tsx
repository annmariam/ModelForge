'use client'

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSuccessMessage(null)

    const formData = new FormData(event.currentTarget)
    console.log(formData);
    // const result = await submitContactForm(formData)
    
    setIsSubmitting(false)
    // if (result.success) {
    //   event.currentTarget.reset()
    //   setSuccessMessage(result.message)
    // } else {
    //   setErrors(result.errors as FormErrors)
    // }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <Alert className="mb-6">
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your name" />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your email" />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message" />
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
              <p className="text-sm text-muted-foreground">Please provide as much detail as possible.</p>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

