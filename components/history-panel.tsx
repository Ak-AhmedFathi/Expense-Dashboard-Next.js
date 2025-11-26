"use client"

import { motion } from "framer-motion"
import { ChevronLeftIcon, TrashIcon } from "@/components/icon-components"
import { useState } from "react"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

interface HistoryPanelProps {
  conversations: Conversation[]
  onSelectConversation: (id: string) => void
  selectedId: string | null
}

export function HistoryPanel({ conversations, onSelectConversation, selectedId }: HistoryPanelProps) {
  const [isOpen, setIsOpen] = useState(true)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
    return `${Math.floor(diffDays / 30)}mo ago`
  }

  return (
    <>
      {/* Mobile toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-md:flex fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg"
      >
        <ChevronLeftIcon size={20} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      {/* Sidebar */}
      <motion.div
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", damping: 20 }}
        className="hidden md:flex w-80 flex-col border-r border-border bg-card"
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Conversation History</h2>
          <p className="text-xs text-muted-foreground mt-1">Previous chats and insights</p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-xs text-muted-foreground p-4 text-center">No conversations yet</p>
          ) : (
            conversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                whileHover={{ x: 4 }}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                  selectedId === conversation.id
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted border border-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{conversation.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(conversation.timestamp)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <TrashIcon size={16} className="text-destructive" />
                  </motion.button>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </motion.div>

      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  )
}
