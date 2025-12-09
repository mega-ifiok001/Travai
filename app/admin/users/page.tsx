"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

interface User {
  id: string
  businessName: string
  email: string
  plan: string
  signupDate: string
  lastActive: string
  status: "active" | "inactive" | "suspended"
  leads: number
  revenue: number
}

const mockUsers: User[] = [
  {
    id: "1",
    businessName: "Tech Innovations Inc",
    email: "contact@techinnovations.com",
    plan: "Pro",
    signupDate: "2024-01-15",
    lastActive: "2 hours ago",
    status: "active",
    leads: 284,
    revenue: 99.0,
  },
  {
    id: "2",
    businessName: "Digital Solutions Ltd",
    email: "info@digitalsolutions.com",
    plan: "Basic",
    signupDate: "2024-01-18",
    lastActive: "1 day ago",
    status: "active",
    leads: 87,
    revenue: 29.0,
  },
  {
    id: "3",
    businessName: "Marketing Pro Agency",
    email: "hello@marketingpro.com",
    plan: "Enterprise",
    signupDate: "2024-01-10",
    lastActive: "3 hours ago",
    status: "active",
    leads: 512,
    revenue: 299.0,
  },
  {
    id: "4",
    businessName: "Startup Hub",
    email: "team@startuphub.com",
    plan: "Free",
    signupDate: "2024-02-01",
    lastActive: "5 days ago",
    status: "inactive",
    leads: 12,
    revenue: 0,
  },
]

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent text-foreground"
      case "inactive":
        return "bg-yellow-500 text-white"
      case "suspended":
        return "bg-destructive text-white"
      default:
        return "bg-muted text-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-1">Manage all user accounts and subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold text-foreground">{users.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-2xl font-bold text-accent">{users.filter((u) => u.status === "active").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">
            ${users.reduce((sum, u) => sum + u.revenue, 0).toFixed(2)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Revenue per User</p>
          <p className="text-2xl font-bold text-foreground">
            ${(users.reduce((sum, u) => sum + u.revenue, 0) / users.length).toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by business name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left font-semibold text-foreground">Business</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Plan</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Signup Date</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Last Active</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Revenue</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-6 py-3 font-semibold text-foreground">{user.businessName}</td>
                  <td className="px-6 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-3">
                    <Badge variant="secondary">{user.plan}</Badge>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground text-xs">{user.signupDate}</td>
                  <td className="px-6 py-3 text-muted-foreground text-xs">{user.lastActive}</td>
                  <td className="px-6 py-3">
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </td>
                  <td className="px-6 py-3 font-semibold text-foreground">${user.revenue.toFixed(2)}</td>
                  <td className="px-6 py-3">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
