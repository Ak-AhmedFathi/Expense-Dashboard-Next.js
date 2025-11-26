"use client"

import { cn } from "@/lib/utils"
import {
  MenuIcon,
  LayoutDashboardIcon,
  PlusIcon,
  BarChart3Icon,
  ZapIcon,
  SettingsIcon,
} from "@/components/icon-components"
import { useState } from "react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [active, setActive] = useState("dashboard")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", Icon: LayoutDashboardIcon, href: "#" },
    { id: "add-expense", label: "Add Expense", Icon: PlusIcon, href: "#" },
    { id: "analytics", label: "Analytics", Icon: BarChart3Icon, href: "#" },
    { id: "ai-insights", label: "AI Insights", Icon: ZapIcon, href: "#" },
    { id: "settings", label: "Settings", Icon: SettingsIcon, href: "#" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
          !isOpen && "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">ExpenseTracker</span>
          </div>
          <button onClick={onToggle} className="lg:hidden p-1 hover:bg-sidebar-accent rounded-md transition">
            <MenuIcon size={20} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <item.Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
        </div>
      </div>
    </>
  )
}
