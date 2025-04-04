"use client"

import { useState } from "react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { CarbonCalculatorForm } from "@/components/carbon-calculator-form"
import { CalendarView } from "@/components/calendar-view"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CalculatorPage() {
  const [carbonResult, setCarbonResult] = useState<number | null>(null)

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
          <h1 className="text-2xl font-bold">Calculate Your Footprint</h1>
          <p className="text-muted-foreground">Track your daily activities and measure your impact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <CalendarView />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <CarbonCalculatorForm onCalculate={(result) => setCarbonResult(result)} />

            {carbonResult !== null && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Consider using public transportation to reduce your car emissions</li>
                  <li>Reduce meat consumption to lower your food-related carbon footprint</li>
                  <li>Switch to energy-efficient appliances to save on electricity</li>
                  <li>Consider renewable energy sources for your home</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

