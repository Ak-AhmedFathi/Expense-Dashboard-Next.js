"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ZapIcon, TrendingDownIcon, TargetIcon } from "@/components/icon-components"

export function AiTipsCard() {
  const tips = [
    {
      Icon: TrendingDownIcon,
      title: "Reduce Spending",
      description: "Your entertainment spending increased by 23% this month.",
      color: "text-orange-500",
    },
    {
      Icon: TargetIcon,
      title: "Budget Goal",
      description: "You're 15% away from reaching your monthly budget.",
      color: "text-blue-500",
    },
  ]

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="glass glass-dark">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <ZapIcon size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-foreground">AI Financial Tips</h3>
          </div>

          <div className="space-y-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-3">
                  <tip.Icon className={`${tip.color} flex-shrink-0 mt-0.5`} size={20} />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{tip.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="glass glass-dark">
        <div className="p-6">
          <h4 className="text-sm font-semibold text-foreground mb-4">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Daily Average</span>
              <span className="font-bold text-foreground">$94.25</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Budget Used</span>
              <span className="font-bold text-foreground">68%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Days Left</span>
              <span className="font-bold text-foreground">6</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
