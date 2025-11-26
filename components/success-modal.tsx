"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2Icon } from "@/components/icon-components"

interface SuccessModalProps {
  isOpen: boolean
  expenseData?: any
}

export function SuccessModal({ isOpen, expenseData }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-2xl p-8 max-w-sm mx-4 pointer-events-auto border border-green-200 dark:border-green-900/30 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", damping: 20 }}
              >
                <div className="flex justify-center mb-4">
                  <CheckCircle2Icon size={64} />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold text-foreground mb-2">Expense Added!</h2>
              <p className="text-muted-foreground mb-4">Your expense has been saved successfully.</p>

              {expenseData && (
                <div className="bg-muted/50 rounded-lg p-4 text-left text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-foreground">${expenseData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-semibold text-foreground">{expenseData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-semibold text-foreground">{expenseData.date}</span>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground">This modal will close automatically</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
