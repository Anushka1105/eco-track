"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

  // Load recent inputs on component mount
  useEffect(() => {
    const loadRecent = async () => {
      const { getRecentInputs } = await import("../lib/carbon-storage")
      const recent = getRecentInputs()
      if (recent) {
        setEnergy(recent.energy)
        setCarTravel(recent.carTravel)
        setFood(recent.food)
        setElectricity(recent.electricity)
      }
    }
    loadRecent()
  }, [])

  // Save inputs when they change
  useEffect(() => {
    const saveInputs = async () => {
      const { saveRecentInputs } = await import("../lib/carbon-storage")
      saveRecentInputs({
        energy,
        carTravel,
        food,
        electricity
      })
    }
    saveInputs()
  }, [energy, carTravel, food, electricity])
  const [footprint, setFootprint] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const energyValue = Number.parseFloat(energy) || 0
    const carValue = Number.parseFloat(carTravel) || 0
    const foodValue = Number.parseFloat(food) || 0
    const electricityValue = Number.parseFloat(electricity) || 0

    const result = energyValue * 0.5 + carValue * 0.15 + foodValue * 0.2 + electricityValue * 0.3
    setFootprint(result)

    // Save to storage
    const today = new Date()
    const activities = {
      energy: energyValue,
      carTravel: carValue,
      food: foodValue,
      electricity: electricityValue
    }
    
    const { saveCarbonData } = await import("../lib/carbon-storage")
    saveCarbonData(today, result, activities)

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
              id="travel"
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

          <Button type="submit" className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 ease-in-out ">
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