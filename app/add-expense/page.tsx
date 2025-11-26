"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { AddExpenseForm } from "@/components/add-expense-form"
import { SuccessModal } from "@/components/success-modal"
import { useExpenses } from "@/components/expenses-provider"

export default function AddExpensePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [expenseData, setExpenseData] = useState<any>(null)
  const { addExpense } = useExpenses()

  const handleExpenseSubmit = (data: any) => {
    const created = addExpense({
      title: data.title,
      amount: Number.parseFloat(data.amount),
      category: data.category,
      date: data.date,
      notes: data.notes,
    })
    setExpenseData(created)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <AddExpenseForm onSubmit={handleExpenseSubmit} />
        </div>
      </div>
      <SuccessModal isOpen={showSuccess} expenseData={expenseData} />
    </div>
  )
}
