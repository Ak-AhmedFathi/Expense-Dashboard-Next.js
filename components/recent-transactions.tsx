"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useExpenses } from "@/components/expenses-provider"

export function RecentTransactions() {
  const { expenses } = useExpenses()

  const transactions = expenses
    .slice(0, 5)
    .map((expense) => ({
      id: expense.id,
      description: expense.title,
      category: expense.category,
      amount: `-$${expense.amount.toFixed(2)}`,
      date: expense.date,
    }))

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      Entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      Transport: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      Health: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass glass-dark">
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-border/50 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-foreground">{tx.description}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={getCategoryColor(tx.category)}>
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right text-sm font-semibold text-foreground">{tx.amount}</td>
                    <td className="py-4 px-4 text-right text-sm text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
