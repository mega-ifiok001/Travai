// components/dashboard/StatCard.tsx
"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface StatCardProps {
  label: string
  value: number
  change?: number
  trend?: "up" | "down"
  tooltip?: string
}

export function StatCard({ label, value, change, trend, tooltip }: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 800
    const increment = value / (duration / 16)
    const counter = setInterval(() => {
      start += increment
      if (start >= value) {
        start = value
        clearInterval(counter)
      }
      setAnimatedValue(Math.round(start))
    }, 16)
    return () => clearInterval(counter)
  }, [value])

  return (
    <div className="relative group">
      <Card className="p-5 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground">{animatedValue}</p>
          </div>

          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-semibold ${
                trend === "up" ? "text-accent" : "text-destructive"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </Card>

      {/* Tailwind Tooltip */}
      {tooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  )
}
