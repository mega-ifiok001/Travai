"use client"

import type React from "react"

import { useState } from "react"
import { ChevronUp, ChevronDown, Download, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Column<T> {
  key: keyof T
  label: string
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  title?: string
  onExport?: () => void
  searchPlaceholder?: string
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  title,
  onExport,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  const filteredData = data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key]
      return String(value).toLowerCase().includes(searchTerm.toLowerCase())
    }),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  return (
    <Card className="p-6">
      {title && <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>}

      {/* Search & Export */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent cursor-pointer">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          {onExport && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent cursor-pointer" onClick={onExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-4 py-3 text-left font-semibold text-foreground cursor-pointer hover:bg-muted transition ${col.width || ""}`}
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key &&
                      (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={row.id || i} className="border-b border-border hover:bg-muted/50 transition">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-foreground">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No data found</p>
        </div>
      )}
    </Card>
  )
}
