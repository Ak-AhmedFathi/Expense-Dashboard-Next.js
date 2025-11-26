"use client"

import { motion } from "framer-motion"
import { TrendingUpIcon, TrendingDownIcon, TargetIcon } from "@/components/icon-components"

interface StatisticalCardsProps {
  selectedCategory: string
  selectedMonth: Date
}

export function StatisticalCards({ selectedCategory, selectedMonth }: StatisticalCardsProps) {
  const stats = [
    {
      label: "Total Spent",
      value: "$2,450.50",
      icon: TargetIcon,
      trend: -12,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Average Daily",
      value: "$81.68",
      icon: TrendingUpIcon,
      trend: 8,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Biggest Category",
      value: "Food",
      subtitle: "$650.00",
      icon: TrendingDownIcon,
      trend: -5,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Trend",
      value: "+12%",
      icon: TrendingUpIcon,
      trend: 12,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
          className="group bg-card border border-border rounded-xl p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
              {stat.subtitle && <p className="text-xs text-muted-foreground">{stat.subtitle}</p>}
            </div>
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}
            >
              <stat.icon size={24} />
            </div>
          </div>

          {/* Trend indicator */}
          <div className="flex items-center gap-1 text-sm">
            {stat.trend > 0 ? (
              <>
                <span className="text-green-600 dark:text-green-400 font-semibold">{stat.trend}%</span>
                <span className="text-green-600 dark:text-green-400 text-xs">vs last month</span>
              </>
            ) : (
              <>
                <span className="text-red-600 dark:text-red-400 font-semibold">{stat.trend}%</span>
                <span className="text-red-600 dark:text-red-400 text-xs">vs last month</span>
              </>
            )}
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/0 transition-all duration-300 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  )
}
