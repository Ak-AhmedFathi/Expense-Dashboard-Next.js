"use client"

import { motion } from "framer-motion"
import { AnalyticsCards } from "@/components/analytics-cards"
import { RecentTransactions } from "@/components/recent-transactions"
import { ChartsSection } from "@/components/charts-section"
import { AiTipsCard } from "@/components/ai-tips-card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@/components/icon-components"

interface DashboardContentProps {
  sidebarOpen: boolean
}

export function DashboardContent({ sidebarOpen }: DashboardContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <main className="flex-1 overflow-auto">
      <motion.div
        className="p-4 lg:p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your expense overview.</p>
          </div>
          <Button className="w-full md:w-auto gap-2">
            <PlusIcon size={18} />
            Add New Expense
          </Button>
        </motion.div>

        {/* Analytics Cards */}
        <motion.div variants={itemVariants}>
          <AnalyticsCards />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left side - Charts and Transactions */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <ChartsSection />
            <RecentTransactions />
          </motion.div>

          {/* Right side - AI Tips */}
          <motion.div variants={itemVariants}>
            <AiTipsCard />
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
