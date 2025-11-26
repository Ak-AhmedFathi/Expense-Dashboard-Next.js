"use client"

import { SearchIcon, BellIcon, MoonIcon, SunIcon } from "@/components/icon-components"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes"

export function TopNavbar() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-30">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Mobile search trigger */}
          <button className="md:hidden p-2 hover:bg-muted rounded-lg transition" aria-label="Open search">
            <SearchIcon size={20} className="text-foreground" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-muted rounded-lg transition group" aria-label="Notifications">
            <BellIcon size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </button>

          {/* Theme switcher */}
          <button
            onClick={handleToggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <SunIcon size={20} className="text-foreground" />
            ) : (
              <MoonIcon size={20} className="text-foreground" />
            )}
          </button>

          {/* Profile */}
          <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-primary/50 transition">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=ExpenseTracker" />
            <AvatarFallback>ET</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
