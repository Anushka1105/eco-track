"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Menu, X } from "lucide-react"

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact us" },
  ]

  return (
    <header className="w-full bg-transparent py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 w-fit">
          <h1 className="text-2xl font-bold">Ecotrack</h1>
          <Logo />
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary" : "text-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
          <Link href="/signin">
            <Button variant="outline" className="rounded-full bg-white text-foreground hover:bg-white/90 border-0 px-6">
              Sign in
            </Button>
          </Link>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-xl font-medium transition-colors hover:text-primary",
                    pathname === route.href ? "text-primary" : "text-foreground",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              <Link href="/signin">
                <Button size="lg" className="rounded-full">
                  Sign in
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

