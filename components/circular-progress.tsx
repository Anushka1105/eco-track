import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  max: number
  previousValue?: number
  size?: number
  strokeWidth?: number
  className?: string
  label?: string
}

export function CircularProgress({
  value,
  max,
  previousValue,
  size = 120,
  strokeWidth = 10,
  className,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(value, 0), max)
  const percentage = progress / max
  const strokeDashoffset = circumference * (1 - percentage)

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-secondary"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-primary transition-all duration-300 ease-in-out"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          <span className="text-lg font-medium">{label}</span>
        ) : (
          <>
            <span className="text-xl font-bold text-primary">{value} kg</span>
            {previousValue !== undefined && (
              <span className={`text-xs mt-1 ${
                value < previousValue ? 'text-green-500' : 'text-red-500'
              }`}>
                {value < previousValue ? '↓' : '↑'} {Math.abs(value - previousValue).toFixed(1)} kg
              </span>
            )}
          </>
        )}
      </div>
    </div>
  )
}

