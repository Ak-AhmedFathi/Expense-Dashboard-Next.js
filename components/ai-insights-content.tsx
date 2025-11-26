"use client"

import { useState, useRef, useEffect } from "react"
import { ChatPanel } from "@/components/chat-panel"
import { HistoryPanel } from "@/components/history-panel"

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

export function AIInsightsContent({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hello! I'm your AI financial advisor. Ask me anything about your spending habits, budgeting strategies, or how to optimize your expenses.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "Monthly Budget Review",
      messages: [
        {
          id: "1",
          role: "user",
          content: "How much did I spend last month?",
          timestamp: new Date(Date.now() - 86400000 * 7),
        },
        {
          id: "2",
          role: "ai",
          content: "Based on your data, you spent $2,450 last month, with 35% on food and groceries.",
          timestamp: new Date(Date.now() - 86400000 * 7),
        },
      ],
      timestamp: new Date(Date.now() - 86400000 * 7),
    },
    {
      id: "2",
      title: "Savings Tips",
      messages: [
        {
          id: "1",
          role: "user",
          content: "How can I save more money?",
          timestamp: new Date(Date.now() - 86400000 * 14),
        },
        {
          id: "2",
          role: "ai",
          content: "I recommend reducing entertainment expenses by 20% and setting up automatic savings transfers.",
          timestamp: new Date(Date.now() - 86400000 * 14),
        },
      ],
      timestamp: new Date(Date.now() - 86400000 * 14),
    },
  ])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const aiResponses = [
      "Based on your spending patterns, I recommend focusing on reducing your food and transport expenses this month.",
      "Great question! You could save approximately $300-400 per month by setting dining limits and using public transport more.",
      "I've analyzed your data. Your biggest expense category is shopping at 28%. Consider setting weekly budgets for this.",
      "Your spending has increased by 15% compared to last month. Let's identify the categories driving this change.",
    ]

    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: randomResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)
  }

  const handleGenerateBudgetPlan = () => {
    const budgetQuestion =
      "Can you generate a smart budget plan for me based on my spending patterns and financial goals?"

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: budgetQuestion,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const budgetPlan: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `Here's your personalized smart budget plan:

📊 Monthly Budget Breakdown:
• Essentials (Housing, Bills): 50% ($1,225)
• Food & Groceries: 15% ($368)
• Transport: 10% ($245)
• Entertainment: 10% ($245)
• Shopping: 10% ($245)
• Savings & Emergency: 5% ($122)

🎯 Monthly Savings Goal: $500-600
💡 Action Items:
1. Reduce dining out by 40% (Save $150/month)
2. Use public transport 3 days/week (Save $100/month)
3. Set shopping budget limit to $200/month (Save $200/month)
4. Automate $500 monthly transfer to savings

📈 Expected Results (in 6 months):
• Total savings: $3,000
• Reduced monthly expenses by 20%
• Improved financial health score`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, budgetPlan])
    }, 1500)
  }

  const handleLoadConversation = (convId: string) => {
    const conversation = conversations.find((c) => c.id === convId)
    if (conversation) {
      setSelectedConversation(convId)
      setMessages(conversation.messages)
    }
  }

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {/* History Panel */}
      <HistoryPanel
        conversations={conversations}
        onSelectConversation={handleLoadConversation}
        selectedId={selectedConversation}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatPanel
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSendMessage={handleSendMessage}
          onGenerateBudgetPlan={handleGenerateBudgetPlan}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  )
}
