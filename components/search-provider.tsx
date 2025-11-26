"use client"

import React, { createContext, useContext, useState, useMemo } from "react"

interface SearchContextValue {
  readonly query: string
  readonly setQuery: (value: string) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { readonly children: React.ReactNode }) {
  const [query, setQuery] = useState("")

  const value = useMemo(
    () => ({
      query,
      setQuery,
    }),
    [query],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return ctx
}


