"use client"

import { motion } from "framer-motion"

export function SpendingChart() {
  // Sample data for spending pattern over 30 days
  const data = [
    { day: 1, amount: 45 },
    { day: 2, amount: 52 },
    { day: 3, amount: 48 },
    { day: 4, amount: 61 },
    { day: 5, amount: 55 },
    { day: 6, amount: 67 },
    { day: 7, amount: 72 },
    { day: 8, amount: 65 },
    { day: 9, amount: 70 },
    { day: 10, amount: 78 },
    { day: 11, amount: 82 },
    { day: 12, amount: 75 },
    { day: 13, amount: 80 },
    { day: 14, amount: 85 },
    { day: 15, amount: 90 },
    { day: 16, amount: 88 },
    { day: 17, amount: 92 },
    { day: 18, amount: 95 },
    { day: 19, amount: 87 },
    { day: 20, amount: 91 },
  ]

  const maxAmount = Math.max(...data.map((d) => d.amount))
  const chartHeight = 250

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">Spending Pattern</h3>

      <div className="space-y-4">
        {/* Chart */}
        <div className="flex items-end justify-between gap-1 h-64 bg-muted/30 rounded-lg p-4">
          {data.map((d, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${(d.amount / maxAmount) * (chartHeight - 20)}px` }}
              transition={{ delay: idx * 0.02, duration: 0.5 }}
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.8)" }}
              className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t transition-colors duration-200 group hover:from-primary hover:to-blue-400"
              title={`Day ${d.day}: $${d.amount}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Day 1</span>
          <span>Day 20</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Avg</p>
            <p className="font-semibold text-foreground">$74.20</p>
          </div>
          <div className="p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Max</p>
            <p className="font-semibold text-foreground">$95</p>
          </div>
          <div className="p-2 bg-muted/50 rounded">
            <p className="text-xs text-muted-foreground">Min</p>
            <p className="font-semibold text-foreground">$45</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
