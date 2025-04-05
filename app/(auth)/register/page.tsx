"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError("All fields are required")
      return
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    try {
      const success = await register(name, email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed")
    }
  }

  return (
    <div className="h-screen relative w-screen overflow-hidden">
      <div className="form-container max-w-md w-full mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <Logo />
        </div>

        <svg className="absolute top-[-5%] right-[-100%] z-[-100] w-[1000px] h-[500px]" width="777" height="405" viewBox="0 0 777 405" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M325 148C209 128.5 31.5 181 0.999939 -12L777 0V404C777 404 727 274 669 240C611 206 475 306 441 240C407 174 441 167.5 325 148Z" fill="#3CCB4D" stroke="#3CCB4D" />
        </svg>

        <svg className="absolute bottom-[5%] right-[10%] z-[-40] w-[1000px] h-[500px]" width="1118" height="408" viewBox="0 0 1118 408" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M413 309.143C283 261.234 367 -136.947 -21 51.1435V417.143L1117 433.143C1117 433.143 1015 239.053 887 177.143C771 95.2336 543 357.053 413 309.143Z" fill="#3CCB4D" stroke="#3CCB4D" />
        </svg>

        <h1 className="text-3xl font-bold text-center text-primary mb-6">Create An Account</h1>


        <form className="space-y-6 " onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Id</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password (min 6 characters)</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I Agree To All The{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </Link>
            </label>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" className="w-full">
            Sign up
          </Button>

          <div className="text-center text-sm">or</div>

          <Button variant="outline" className="w-full">
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
              <path
                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                fill="#EA4335"
              />
              <path
                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                fill="#4285F4"
              />
              <path
                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                fill="#FBBC05"
              />
              <path
                d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.87043 19.25 6.22043 17.14 5.27039 14.295L1.28039 17.39C3.25539 21.31 7.31039 24 12.0004 24Z"
                fill="#34A853"
              />
            </svg>
            Sign up with Google
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
