"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    // In a real app, you would update the user profile here
    setMessage("Profile updated successfully")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-green-50 py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {message && <div className="p-3 bg-green-50 text-green-800 rounded-md">{message}</div>}

                <Button type="submit">Save Changes</Button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Account Actions</h2>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => logout()}>
                  Sign Out
                </Button>

                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
              <h2 className="text-xl font-semibold mb-4">Carbon Stats</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Tracked Days:</span>
                  <span className="font-medium">32</span>
                </div>

                <div className="flex justify-between">
                  <span>Average Daily Footprint:</span>
                  <span className="font-medium">5.8 kg</span>
                </div>

                <div className="flex justify-between">
                  <span>Carbon Saved:</span>
                  <span className="font-medium text-primary">12.4 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

