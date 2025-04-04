// Carbon emission factors (simplified for demonstration)
const EMISSION_FACTORS = {
  // Energy-related emissions
  electricity: 0.5, // kg CO2e per kWh
  naturalGas: 0.2, // kg CO2e per kWh

  // Transportation emissions
  car: {
    petrol: 0.17, // kg CO2e per km
    diesel: 0.15, // kg CO2e per km
    electric: 0.05, // kg CO2e per km
  },
  publicTransport: {
    bus: 0.1, // kg CO2e per km
    train: 0.05, // kg CO2e per km
  },
  flight: 0.25, // kg CO2e per km

  // Food emissions
  food: {
    meatHeavy: 3.0, // kg CO2e per day
    mixed: 1.5, // kg CO2e per day
    vegetarian: 1.0, // kg CO2e per day
    vegan: 0.5, // kg CO2e per day
  },

  // Waste emissions
  waste: {
    landfill: 0.3, // kg CO2e per kg
    recycled: 0.1, // kg CO2e per kg
  },
}

export interface CarbonData {
  energy?: {
    electricity?: number // kWh
    naturalGas?: number // kWh
  }
  transportation?: {
    carType?: "petrol" | "diesel" | "electric"
    carDistance?: number // km
    publicTransportType?: "bus" | "train"
    publicTransportDistance?: number // km
    flightDistance?: number // km
  }
  food?: {
    dietType: "meatHeavy" | "mixed" | "vegetarian" | "vegan"
  }
  waste?: {
    landfill?: number // kg
    recycled?: number // kg
  }
}

export function calculateCarbonFootprint(data: CarbonData): {
  total: number
  breakdown: Record<string, number>
} {
  const breakdown: Record<string, number> = {}
  let total = 0

  // Calculate energy emissions
  if (data.energy) {
    if (data.energy.electricity) {
      const electricityEmissions = data.energy.electricity * EMISSION_FACTORS.electricity
      breakdown.electricity = Number.parseFloat(electricityEmissions.toFixed(2))
      total += electricityEmissions
    }

    if (data.energy.naturalGas) {
      const gasEmissions = data.energy.naturalGas * EMISSION_FACTORS.naturalGas
      breakdown.naturalGas = Number.parseFloat(gasEmissions.toFixed(2))
      total += gasEmissions
    }
  }

  // Calculate transportation emissions
  if (data.transportation) {
    // Car emissions
    if (data.transportation.carDistance && data.transportation.carType) {
      const carEmissionFactor = EMISSION_FACTORS.car[data.transportation.carType]
      const carEmissions = data.transportation.carDistance * carEmissionFactor
      breakdown.car = Number.parseFloat(carEmissions.toFixed(2))
      total += carEmissions
    }

    // Public transport emissions
    if (data.transportation.publicTransportDistance && data.transportation.publicTransportType) {
      const ptEmissionFactor = EMISSION_FACTORS.publicTransport[data.transportation.publicTransportType]
      const ptEmissions = data.transportation.publicTransportDistance * ptEmissionFactor
      breakdown.publicTransport = Number.parseFloat(ptEmissions.toFixed(2))
      total += ptEmissions
    }

    // Flight emissions
    if (data.transportation.flightDistance) {
      const flightEmissions = data.transportation.flightDistance * EMISSION_FACTORS.flight
      breakdown.flight = Number.parseFloat(flightEmissions.toFixed(2))
      total += flightEmissions
    }
  }

  // Calculate food emissions
  if (data.food) {
    const foodEmissions = EMISSION_FACTORS.food[data.food.dietType]
    breakdown.food = Number.parseFloat(foodEmissions.toFixed(2))
    total += foodEmissions
  }

  // Calculate waste emissions
  if (data.waste) {
    if (data.waste.landfill) {
      const landfillEmissions = data.waste.landfill * EMISSION_FACTORS.waste.landfill
      breakdown.landfill = Number.parseFloat(landfillEmissions.toFixed(2))
      total += landfillEmissions
    }

    if (data.waste.recycled) {
      const recycledEmissions = data.waste.recycled * EMISSION_FACTORS.waste.recycled
      breakdown.recycled = Number.parseFloat(recycledEmissions.toFixed(2))
      total += recycledEmissions
    }
  }

  return {
    total: Number.parseFloat(total.toFixed(2)),
    breakdown,
  }
}

