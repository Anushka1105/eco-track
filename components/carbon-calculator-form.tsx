"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CalculatorFormProps {
  onCalculate?: (result: number) => void
}

export function CarbonCalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [energy, setEnergy] = useState("")
  const [carTravel, setCarTravel] = useState("")
  const [food, setFood] = useState("")
  const [electricity, setElectricity] = useState("")
  const [footprint, setFootprint] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple calculation for demonstration purposes
    // In a real app, this would be more sophisticated
    const energyValue = Number.parseFloat(energy) || 0
    const carValue = Number.parseFloat(carTravel) || 0
    const foodValue = Number.parseFloat(food) || 0
    const electricityValue = Number.parseFloat(electricity) || 0

    // Formula: Different weights for each category (simplified)
    const result = energyValue * 0.5 + carValue * 0.15 + foodValue * 0.2 + electricityValue * 0.3

    setFootprint(result)

    if (onCalculate) {
      onCalculate(result)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Calculate Your Carbon Footprint
        <br />
        <span className="text-lg font-normal">Based On Your Daily Activities.</span>
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="energy">Energy Consumption (kWh):</Label>
            <Input
              id="energy"
              type="number"
              placeholder="Enter your energy consumption"
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="car">Car Travel (Km):</Label>
            <Input
              id="car"
              type="number"
              placeholder="Enter your car travel distance"
              value={carTravel}
              onChange={(e) => setCarTravel(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="food">Food Consumption (meat/plant based):</Label>
            <Input
              id="food"
              type="number"
              placeholder="Enter 1-10 (10 being mostly meat)"
              value={food}
              onChange={(e) => setFood(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="electricity">Electricity Usage (kWh):</Label>
            <Input
              id="electricity"
              type="number"
              placeholder="Enter your electricity usage"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Calculate Footprint
          </Button>
        </div>
      </form>

      {footprint !== null && (
        <div className="mt-4">
          <p className="text-lg">
            Your Carbon Footprint is: <span className="font-bold">{footprint.toFixed(2)} kg CO2e</span>
          </p>
        </div>
      )}
    </div>
  )
}

