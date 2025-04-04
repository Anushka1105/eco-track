"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

const STORAGE_KEY = "ecotrack-user"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initializeAuth = () => {
        try {
          const storedUser = localStorage.getItem(STORAGE_KEY)
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          }
        } catch (e) {
          console.error("Failed to parse user data from localStorage", e)
          localStorage.removeItem(STORAGE_KEY)
        } finally {
          setLoading(false)
        }
      }
      
      initializeAuth()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const userData = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const userData = {
        id: Date.now().toString(),
        name,
        email,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value: AuthContextType = { user, loading, login, register, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}