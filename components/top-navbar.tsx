"use client"

import { useState } from "react"
import { SearchIcon, BellIcon, MoonIcon, SunIcon } from "@/components/icon-components"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { useSearch } from "@/components/search-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function TopNavbar() {
  const { theme, setTheme } = useTheme()
  const { query, setQuery } = useSearch()
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const isDark = theme === "dark"

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen((prev) => !prev)
  }

  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-30">
      <div className="h-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Search (desktop) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <label htmlFor="desktop-search" className="sr-only">
              Search expenses
            </label>
            <input
              id="desktop-search"
              type="text"
              placeholder="Search expenses..."
              aria-label="Search expenses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Mobile search trigger */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            aria-label={isMobileSearchOpen ? "Close search" : "Open search"}
            title="Search"
            onClick={handleMobileSearchToggle}
          >
            <SearchIcon size={20} className="text-foreground" />
          </button>

          {/* Notifications */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="relative p-2 hover:bg-muted rounded-lg transition group"
                aria-label="Notifications"
                type="button"
              >
                <BellIcon size={20} className="text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              </button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Notifications</TooltipContent>
          </Tooltip>

          {/* Theme switcher */}
          <button
            onClick={handleToggleTheme}
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            {isDark ? (
              <SunIcon size={20} className="text-foreground" />
            ) : (
              <MoonIcon size={20} className="text-foreground" />
            )}
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50">
                <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-primary/50 transition">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=ExpenseTracker" />
                  <AvatarFallback>ET</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="min-w-[10rem]">
              <DropdownMenuItem inset disabled>
                Signed in as <span className="ml-1 font-medium">you@example.com</span>
              </DropdownMenuItem>
              <DropdownMenuItem inset>Profile</DropdownMenuItem>
              <DropdownMenuItem inset>Settings</DropdownMenuItem>
              <DropdownMenuItem inset variant="destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile search bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 bg-card border-b border-border">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <label htmlFor="mobile-search" className="sr-only">
              Search expenses
            </label>
            <input
              id="mobile-search"
              type="text"
              placeholder="Search expenses..."
              aria-label="Search expenses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>
        </div>
      )}
    </header>
  )
}
