"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { AddExpenseForm } from "@/components/add-expense-form"
import { SuccessModal } from "@/components/success-modal"

export default function AddExpensePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showSuccess, setShowSuccess] = useState(false)
  const [expenseData, setExpenseData] = useState<any>(null)

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
  }

  const handleExpenseSubmit = (data: any) => {
    setExpenseData(data)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <AddExpenseForm onSubmit={handleExpenseSubmit} />
        </div>
      </div>
      <SuccessModal isOpen={showSuccess} expenseData={expenseData} />
    </div>
  )
}
