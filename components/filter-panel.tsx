"use client"

import { motion } from "framer-motion"

interface FilterPanelProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  dateRange: { from: number; to: number }
  onDateRangeChange: (range: { from: number; to: number }) => void
}

export function FilterPanel({ selectedCategory, onCategoryChange, dateRange, onDateRangeChange }: FilterPanelProps) {
  const categories = ["all", "Food", "Bills", "Shopping", "Transport", "Other"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 sm:p-6 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Date Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="31"
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: Number.parseInt(e.target.value) })}
              placeholder="From"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="flex items-center text-muted-foreground">to</span>
            <input
              type="number"
              min="1"
              max="31"
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: Number.parseInt(e.target.value) })}
              placeholder="To"
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
