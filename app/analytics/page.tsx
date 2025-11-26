"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { AnalyticsContent } from "@/components/analytics-content"

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <AnalyticsContent sidebarOpen={sidebarOpen} />
      </div>
    </div>
  )
}
