'use client'

import React, { createContext, useContext, useMemo, useState } from "react"

export type ExpenseCategory = "Food" | "Bills" | "Shopping" | "Transport" | "Health" | "Entertainment" | "Other"

export interface Expense {
  id: string
  title: string
  amount: number
  category: ExpenseCategory
  date: string // ISO date string: YYYY-MM-DD
  notes?: string
}

interface ExpensesContextValue {
  expenses: Expense[]
  addExpense: (input: Omit<Expense, "id">) => Expense
}

const ExpensesContext = createContext<ExpensesContextValue | null>(null)

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Coffee Shop",
    amount: 5.5,
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    notes: "Morning latte",
  },
  {
    id: "2",
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
  },
  {
    id: "3",
    title: "Gas Station",
    amount: 45,
    category: "Transport",
    date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
  },
]

export function ExpensesProvider({ children }: { readonly children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES)

  const value = useMemo<ExpensesContextValue>(
    () => ({
      expenses,
      addExpense: (input) => {
        const newExpense: Expense = {
          ...input,
          id: Date.now().toString(),
        }
        setExpenses((prev) => [newExpense, ...prev])
        return newExpense
      },
    }),
    [expenses],
  )

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext)
  if (!ctx) {
    throw new Error("useExpenses must be used within an ExpensesProvider")
  }
  return ctx
}


