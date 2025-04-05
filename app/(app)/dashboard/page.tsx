"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Logo } from "../../../components/logo"
import { Button } from "../../../components/ui/button"
import { CircularProgress } from "../../../components/circular-progress"
import { ActivityList } from "../../../components/activity-list"
import { useAuth } from "../../../lib/auth"
import { getRecentCarbonData, CarbonEntry } from "../../../lib/carbon-storage"
import { ArrowRight, Home, Menu, User } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [footprintData, setFootprintData] = useState({
    today: 0,
    thisMonth: 0,
    lastMonth: 0,
  })
  const [recentActivities, setRecentActivities] = useState<CarbonEntry[]>([])

  useEffect(() => {
    const recentData = getRecentCarbonData()
    if (recentData.length > 0) {
      // Calculate today's footprint (most recent entry)
      const todayFootprint = recentData[0].footprint
      
      // Calculate this month's footprint (sum of last 30 days)
      const thisMonthFootprint = recentData
        .filter((entry: CarbonEntry) => {
          const entryDate = new Date(entry.timestamp)
          const now = new Date()
          return entryDate.getMonth() === now.getMonth() && 
                 entryDate.getFullYear() === now.getFullYear()
        })
        .reduce((sum: number, entry: CarbonEntry) => sum + entry.footprint, 0)
      
      // Calculate last month's footprint (sum of previous month)
      const lastMonthFootprint = recentData
        .filter((entry: CarbonEntry) => {
          const entryDate = new Date(entry.timestamp)
          const now = new Date()
          const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
          const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
          return entryDate.getMonth() === lastMonth && 
                 entryDate.getFullYear() === year
        })
        .reduce((sum: number, entry: CarbonEntry) => sum + entry.footprint, 0)

      setFootprintData({
        today: todayFootprint,
        thisMonth: thisMonthFootprint,
        lastMonth: lastMonthFootprint
      })
      setRecentActivities(recentData)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-green-50 py-2 px-2 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm">Hello, {user?.name || "User"}</span>
            <Button variant="outline" size="sm" onClick={() => logout()}>
              Sign Out
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="mt-4 px-4 py-2 bg-white rounded-lg md:hidden">
            <div className="flex flex-col gap-2">
              <div className="p-2">Hello, {user?.name || "User"}</div>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Carbon FootPrint Calculator</h1>
          <div className="h-0.5 w-16 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-medium mb-4">TODAY</h2>
            <CircularProgress value={footprintData.today} max={100} />
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-medium mb-4">THIS MONTH</h2>
            <CircularProgress 
              value={footprintData.thisMonth} 
              previousValue={footprintData.lastMonth}
              max={100} 
            />
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-medium mb-4">LAST MONTH</h2>
            <CircularProgress value={footprintData.lastMonth} max={100} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityList activities={recentActivities} />

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator">
                <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Calculator</p>
                    <p className="text-sm text-muted-foreground">Track your emissions</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-primary" />
                </div>
              </Link>

              <Link href="/profile">
                <div className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Profile</p>
                    <p className="text-sm text-muted-foreground">Manage your account</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-primary" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}