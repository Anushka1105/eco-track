"use client"

import { CarbonEntry } from "../lib/carbon-storage"
import { Car, Home, Zap, Utensils, Battery } from "lucide-react"

interface ActivityListProps {
  activities: CarbonEntry[]
}

export function ActivityList({ activities }: ActivityListProps) {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'energy': return <Zap className="h-5 w-5 text-white" />
      case 'carTravel': return <Car className="h-5 w-5 text-white" />
      case 'food': return <Utensils className="h-5 w-5 text-white" />
      case 'electricity': return <Battery className="h-5 w-5 text-white" />
      default: return <Home className="h-5 w-5 text-white" />
    }
  }

  const getActivityLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')
  }

  return (
    <div className="bg-background/80 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Recent Usage Breakdown</h3>
      <div className="space-y-4">
        {activities.slice(0, 5).map((entry) => (
          <div key={entry.timestamp} className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {new Date(entry.timestamp).toLocaleDateString()}
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total Footprint</span>
                <span className="font-medium">{entry.footprint.toFixed(2)} kg</span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(entry.activities).map(([type, value]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center mr-2">
                        {getActivityIcon(type)}
                      </div>
                      <span>{getActivityLabel(type)}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {value.toFixed(2)} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
