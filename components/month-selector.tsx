"use client"
import { motion } from "framer-motion"

interface MonthSelectorProps {
  selectedMonth: Date
  onMonthChange: (date: Date) => void
}

export function MonthSelector({ selectedMonth, onMonthChange }: MonthSelectorProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentMonth = selectedMonth.getMonth()

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {months.map((month, idx) => (
        <motion.button
          key={month}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const newDate = new Date()
            newDate.setMonth(idx)
            onMonthChange(newDate)
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentMonth === idx
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              : "bg-card text-foreground hover:bg-muted border border-border"
          }`}
        >
          {month}
        </motion.button>
      ))}
    </div>
  )
}
