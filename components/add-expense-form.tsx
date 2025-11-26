"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircleIcon } from "@/components/icon-components"

const CATEGORIES = ["Food", "Bills", "Shopping", "Transport", "Other"]

interface FormErrors {
  title?: string
  amount?: string
  category?: string
  date?: string
}

export function AddExpenseForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Expense title is required"
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0"
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
      })
      setErrors({})
      setTouched({})
    }
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setErrors({})
    setTouched({})
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border border-border/50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-foreground">Add New Expense</CardTitle>
            <CardDescription>Track your spending with details and categories</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Expense Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-foreground">
                  Expense Title
                </Label>
                <div className="relative">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="e.g., Coffee at Cafe"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`transition-all ${
                      errors.title && touched.title
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-border focus-visible:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.title && touched.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-500 text-xs mt-1"
                  >
                    <AlertCircleIcon size={14} />
                    <span>{errors.title}</span>
                  </motion.div>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-foreground">
                  Amount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`pl-6 transition-all ${
                      errors.amount && touched.amount
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-border focus-visible:ring-blue-500"
                    }`}
                  />
                </div>
                {errors.amount && touched.amount && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-500 text-xs mt-1"
                  >
                    <AlertCircleIcon size={14} />
                    <span>{errors.amount}</span>
                  </motion.div>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-foreground">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 rounded-md border transition-all bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 ${
                    errors.category && touched.category
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-blue-500"
                  }`}
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-500 text-xs mt-1"
                  >
                    <AlertCircleIcon size={14} />
                    <span>{errors.category}</span>
                  </motion.div>
                )}
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-foreground">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`transition-all ${
                    errors.date && touched.date
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-border focus-visible:ring-blue-500"
                  }`}
                />
                {errors.date && touched.date && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-red-500 text-xs mt-1"
                  >
                    <AlertCircleIcon size={14} />
                    <span>{errors.date}</span>
                  </motion.div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                  Notes <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Add any additional notes..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="resize-none border-border focus-visible:ring-blue-500 min-h-20"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  Save Expense
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-border text-foreground hover:bg-muted/50 transition-colors bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
