"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function ChartsSection() {
  const pieData = [
    { name: "Food", value: 450, color: "hsl(var(--color-chart-1))" },
    { name: "Entertainment", value: 300, color: "hsl(var(--color-chart-2))" },
    { name: "Transport", value: 200, color: "hsl(var(--color-chart-3))" },
    { name: "Health", value: 150, color: "hsl(var(--color-chart-4))" },
    { name: "Other", value: 100, color: "hsl(var(--color-chart-5))" },
  ]

  const lineData = [
    { name: "Week 1", value: 450 },
    { name: "Week 2", value: 520 },
    { name: "Week 3", value: 480 },
    { name: "Week 4", value: 610 },
  ]

  const PieChart = () => {
    const total = pieData.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = -90

    const slices = pieData.map((item, index) => {
      const sliceAngle = (item.value / total) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + sliceAngle
      currentAngle = endAngle

      const radius = 80
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      const x1 = 100 + radius * Math.cos(startRad)
      const y1 = 100 + radius * Math.sin(startRad)
      const x2 = 100 + radius * Math.cos(endRad)
      const y2 = 100 + radius * Math.sin(endRad)

      const largeArc = sliceAngle > 180 ? 1 : 0

      const pathData = [`M 100 100`, `L ${x1} ${y1}`, `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`, "Z"].join(
        " ",
      )

      return (
        <g key={index}>
          <path d={pathData} fill={item.color} stroke="hsl(var(--color-card))" strokeWidth="2" />
          <text
            x={100 + radius * 0.65 * Math.cos((startRad + endRad) / 2)}
            y={100 + radius * 0.65 * Math.sin((startRad + endRad) / 2)}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-semibold fill-white"
          >
            ${item.value}
          </text>
        </g>
      )
    })

    return (
      <svg viewBox="0 0 200 200" className="w-full h-64">
        {slices}
      </svg>
    )
  }

  const LineChart = () => {
    const maxValue = Math.max(...lineData.map((d) => d.value))
    const padding = 40
    const chartWidth = 400
    const chartHeight = 200

    const points = lineData.map((item, index) => {
      const x = padding + (index / (lineData.length - 1)) * (chartWidth - 2 * padding)
      const y = chartHeight - padding - (item.value / maxValue) * (chartHeight - 2 * padding)
      return { x, y, ...item }
    })

    const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

    return (
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-64">
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => {
          const y = padding + (i / 3) * (chartHeight - 2 * padding)
          return (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="hsl(var(--color-border))"
              strokeDasharray="4"
              strokeWidth="1"
            />
          )
        })}

        {/* X Axis */}
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="hsl(var(--color-border))"
          strokeWidth="1"
        />

        {/* Y Axis */}
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="hsl(var(--color-border))"
          strokeWidth="1"
        />

        {/* Y-axis labels */}
        {[0, 1, 2, 3].map((i) => {
          const y = chartHeight - padding - (i / 3) * (chartHeight - 2 * padding)
          const value = Math.round((i / 3) * maxValue)
          return (
            <text
              key={`label-${i}`}
              x={padding - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              className="text-xs fill-muted-foreground"
            >
              ${value}
            </text>
          )
        })}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="hsl(var(--color-primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fill under line */}
        <path
          d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
          fill="hsl(var(--color-primary))"
          opacity="0.1"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={`point-${i}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--color-primary))"
              stroke="hsl(var(--color-card))"
              strokeWidth="2"
            />
            {/* X-axis labels */}
            <text
              x={point.x}
              y={chartHeight - padding + 20}
              textAnchor="middle"
              dominantBaseline="start"
              className="text-xs fill-muted-foreground"
            >
              {point.name}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="glass glass-dark h-full">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Expense by Category</h3>
            <div className="flex flex-col gap-4">
              <PieChart />
              <div className="space-y-2 mt-4">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">${item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="glass glass-dark h-full">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6">Weekly Spending Trend</h3>
            <LineChart />
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
