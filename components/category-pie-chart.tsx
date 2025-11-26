"use client"

import { motion } from "framer-motion"
import type { Expense } from "@/components/expenses-provider"

interface CategoryPieChartProps {
  readonly expenses: Expense[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#EF4444",
  Transport: "#3B82F6",
  Shopping: "#10B981",
  Bills: "#F59E0B",
  Health: "#22C55E",
  Entertainment: "#8B5CF6",
  Other: "#8B5CF6",
}

export function CategoryPieChart({ expenses }: CategoryPieChartProps) {
  const totalsByCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const entries = Object.entries(totalsByCategory)

  const fallbackCategories = [
    { name: "Food", amount: 650, color: "#EF4444" },
    { name: "Transport", amount: 450, color: "#3B82F6" },
    { name: "Shopping", amount: 580, color: "#10B981" },
    { name: "Bills", amount: 520, color: "#F59E0B" },
    { name: "Other", amount: 250, color: "#8B5CF6" },
  ]

  const categories =
    entries.length === 0
      ? fallbackCategories.map((c) => ({
          ...c,
          percentage: (c.amount / fallbackCategories.reduce((s, x) => s + x.amount, 0)) * 100,
        }))
      : (() => {
          const total = entries.reduce((sum, [, amount]) => sum + amount, 0)
          return entries.map(([name, amount]) => ({
            name,
            amount,
            percentage: (amount / total) * 100,
            color: CATEGORY_COLORS[name] || "#8B5CF6",
          }))
        })()

  // Calculate pie chart segments
  let currentAngle = 0
  const segments = categories.map((cat) => {
    const sliceAngle = (cat.percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    currentAngle = endAngle
    return { ...cat, startAngle, endAngle, sliceAngle }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Spending by Category</h3>

      <div className="space-y-4">
        {/* Donut Chart SVG */}
        <div className="flex justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
            {segments.map((segment, idx) => {
              const startRad = (segment.startAngle * Math.PI) / 180
              const endRad = (segment.endAngle * Math.PI) / 180
              const x1 = 100 + 70 * Math.cos(startRad)
              const y1 = 100 + 70 * Math.sin(startRad)
              const x2 = 100 + 70 * Math.cos(endRad)
              const y2 = 100 + 70 * Math.sin(endRad)
              const largeArc = segment.sliceAngle > 180 ? 1 : 0

              const innerRadius = 50
              const x3 = 100 + innerRadius * Math.cos(endRad)
              const y3 = 100 + innerRadius * Math.sin(endRad)
              const x4 = 100 + innerRadius * Math.cos(startRad)
              const y4 = 100 + innerRadius * Math.sin(startRad)

              const pathData = `M ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`

              return (
                <motion.path
                  key={segment.name}
                  d={pathData}
                  fill={segment.color}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover:opacity-100 transition-opacity cursor-pointer"
                />
              )
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="48" fill="var(--color-card)" />
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <div className="flex-1">
                <p className="text-xs font-medium text-foreground">{cat.name}</p>
                <p className="text-xs text-muted-foreground">${cat.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
