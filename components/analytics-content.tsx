"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MonthSelector } from "@/components/month-selector"
import { StatisticalCards } from "@/components/statistical-cards"
import { SpendingChart } from "@/components/spending-chart"
import { CategoryPieChart } from "@/components/category-pie-chart"
import { FilterPanel } from "@/components/filter-panel"
import { DownloadIcon } from "@/components/icon-components"

export function AnalyticsContent({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateRange, setDateRange] = useState({ from: 1, to: 30 })

  const handleExportPDF = () => {
    console.log("[v0] Exporting PDF with month:", selectedMonth, "category:", selectedCategory)
    alert("PDF export feature would integrate with a PDF library like jsPDF")
  }

  const handleExportCSV = () => {
    console.log("[v0] Exporting CSV with month:", selectedMonth, "category:", selectedCategory)
    const csvData = "Date,Category,Amount,Description\n2024-11-15,Food,25.50,Lunch\n2024-11-16,Transport,15.00,Uber"
    const blob = new Blob([csvData], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "expenses.csv"
    a.click()
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">Track your spending patterns and financial insights</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExportPDF}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
              >
                <DownloadIcon size={16} />
                Export PDF
              </button>
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 text-sm font-medium"
              >
                <DownloadIcon size={16} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Month Selector */}
          <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
        </motion.div>

        {/* Filters and Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <FilterPanel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </motion.div>

        {/* Statistical Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <StatisticalCards selectedCategory={selectedCategory} selectedMonth={selectedMonth} />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <SpendingChart />
          <CategoryPieChart />
        </motion.div>
      </div>
    </div>
  )
}
