"use client"

import { motion } from "framer-motion"
import { SparklesIcon } from "@/components/icon-components"

interface SmartBudgetCardProps {
  onClick: () => void
}

export function SmartBudgetCard({ onClick }: SmartBudgetCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-primary/20 hover:border-primary/40 p-6 w-full transition-all duration-300"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <SparklesIcon size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground">Generate Smart Budget</p>
            <p className="text-xs text-muted-foreground">Personalized plan based on your data</p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
