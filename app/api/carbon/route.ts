import { NextResponse } from "next/server"

// Carbon emission factors (simplified for demonstration)
const EMISSION_FACTORS = {
  energy: 0.5, // kg CO2e per kWh
  car: 0.15, // kg CO2e per km
  food: {
    meat: 3.0, // kg CO2e per meal
    mixed: 1.5,
    plant: 0.5,
  },
  electricity: 0.3, // kg CO2e per kWh
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Extract values or use defaults
    const energy = Number(data.energy) || 0
    const carTravel = Number(data.carTravel) || 0
    const food = data.food || "mixed" // 'meat', 'mixed', or 'plant'
    const electricity = Number(data.electricity) || 0

    // Calculate carbon footprint
    let totalEmissions = 0

    // Energy emissions
    totalEmissions += energy * EMISSION_FACTORS.energy

    // Car travel emissions
    totalEmissions += carTravel * EMISSION_FACTORS.car

    // Food emissions
    if (food === "meat") {
      totalEmissions += EMISSION_FACTORS.food.meat
    } else if (food === "plant") {
      totalEmissions += EMISSION_FACTORS.food.plant
    } else {
      totalEmissions += EMISSION_FACTORS.food.mixed
    }

    // Electricity emissions
    totalEmissions += electricity * EMISSION_FACTORS.electricity

    return NextResponse.json({
      success: true,
      data: {
        totalEmissions: Number(totalEmissions.toFixed(2)),
        breakdown: {
          energy: Number((energy * EMISSION_FACTORS.energy).toFixed(2)),
          carTravel: Number((carTravel * EMISSION_FACTORS.car).toFixed(2)),
          food: Number(EMISSION_FACTORS.food[food as keyof typeof EMISSION_FACTORS.food].toFixed(2)),
          electricity: Number((electricity * EMISSION_FACTORS.electricity).toFixed(2)),
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to calculate carbon footprint",
      },
      { status: 500 },
    )
  }
}

