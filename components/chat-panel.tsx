"use client"

import React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { SendIcon, SparklesIcon } from "@/components/icon-components"
import { useState } from "react"
import type { Message } from "@/types/message"

interface ChatPanelProps {
  messages: Message[]
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onGenerateBudgetPlan: () => void
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export function ChatPanel({
  messages,
  input,
  isLoading,
  onInputChange,
  onSendMessage,
  onGenerateBudgetPlan,
  messagesEndRef,
}: ChatPanelProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <SparklesIcon size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Start a conversation</h2>
              <p className="text-muted-foreground max-w-md">
                Ask me about your spending, budgeting strategies, or financial goals.
              </p>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md md:max-w-2xl lg:max-w-3xl rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none border border-border"
                  }`}
                >
                  <TypingMessage content={message.content} isUser={message.role === "user"} />
                </div>
              </motion.div>
            ))
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="bg-muted text-foreground rounded-2xl rounded-bl-none px-6 py-4 border border-border">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.1, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Smart Budget Card - Show on first interaction */}
      {messages.length <= 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 md:px-8 py-2">
          <button
            onClick={onGenerateBudgetPlan}
            className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 p-4 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-300" />
            <div className="relative flex items-center justify-center gap-2">
              <SparklesIcon size={20} className="text-primary" />
              <span className="font-medium text-foreground">Generate Smart Budget Plan</span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 md:p-6 space-y-4">
        <div className="flex gap-3 max-w-4xl mx-auto w-full">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your finances..."
              className="w-full resize-none px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              rows={3}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSendMessage}
            disabled={isLoading || !input.trim()}
            className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 self-end"
          >
            <SendIcon size={20} />
          </motion.button>
        </div>

        <p className="text-xs text-muted-foreground text-center">Press Shift + Enter for new line</p>
      </div>
    </div>
  )
}

function TypingMessage({ content, isUser }: { content: string; isUser: boolean }) {
  const [displayedText, setDisplayedText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  React.useEffect(() => {
    if (charIndex < content.length) {
      const timer = setTimeout(
        () => {
          setDisplayedText((prev) => prev + content[charIndex])
          setCharIndex((prev) => prev + 1)
        },
        isUser ? 0 : 15,
      ) // Faster for user messages, slower typing effect for AI

      return () => clearTimeout(timer)
    }
  }, [charIndex, content, isUser])

  return <span>{displayedText}</span>
}
