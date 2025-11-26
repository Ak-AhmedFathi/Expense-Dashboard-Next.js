"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BarChart3Icon, ZapIcon, TrendingUpIcon } from "@/components/icon-components"

export function AnalyticsCards() {
  const cards = [
    {
      title: "Total Expenses",
      value: "$2,847.50",
      change: "+12.5%",
      trend: "up",
      Icon: BarChart3Icon,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Highest Category",
      value: "Entertainment",
      change: "$542.80",
      trend: "neutral",
      Icon: ZapIcon,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Monthly Summary",
      value: "$8,234.20",
      change: "+5.2%",
      trend: "up",
      Icon: TrendingUpIcon,
      color: "from-teal-500 to-teal-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const Icon = card.Icon
        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="glass glass-dark overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                    <h3 className="text-2xl font-bold text-foreground">{card.value}</h3>
                    <p
                      className={`text-xs mt-2 ${card.trend === "up" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                    >
                      {card.change}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
