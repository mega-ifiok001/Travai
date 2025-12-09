"use client"

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, DollarSign, Zap } from "lucide-react"

const signupsData = [
  { date: "1 Jan", signups: 5, active: 4 },
  { date: "5 Jan", signups: 12, active: 10 },
  { date: "10 Jan", signups: 18, active: 16 },
  { date: "15 Jan", signups: 25, active: 22 },
  { date: "20 Jan", signups: 32, active: 29 },
  { date: "25 Jan", signups: 38, active: 35 },
  { date: "30 Jan", signups: 45, active: 42 },
]

const revenueData = [
  { week: "Week 1", mrrRevenue: 1200, aiUsage: 850 },
  { week: "Week 2", mrrRevenue: 2100, aiUsage: 1340 },
  { week: "Week 3", mrrRevenue: 3400, aiUsage: 2100 },
  { week: "Week 4", mrrRevenue: 5200, aiUsage: 3400 },
]

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Platform overview and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">New Signups</p>
              <p className="text-2xl font-bold text-foreground">45</p>
              <p className="text-xs text-accent">+18% this month</p>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Subscribers</p>
              <p className="text-2xl font-bold text-foreground">42</p>
              <p className="text-xs text-accent">+12% from last week</p>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$28,450</p>
              <p className="text-xs text-accent">+22% this month</p>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AI Usage</p>
              <p className="text-2xl font-bold text-foreground">12.4k</p>
              <p className="text-xs text-accent">API calls this week</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signups Over Time */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Signups Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signupsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="signups" stroke="#007BFF" strokeWidth={2} />
              <Line type="monotone" dataKey="active" stroke="#28A745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Trends */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="mrrRevenue" fill="#007BFF" />
              <Bar dataKey="aiUsage" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* MRR & Churn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Monthly Recurring Revenue (MRR)</p>
          <p className="text-3xl font-bold text-foreground mb-2">$12,540</p>
          <p className="text-sm text-accent">+8.5% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Churn Rate</p>
          <p className="text-3xl font-bold text-foreground mb-2">3.2%</p>
          <p className="text-sm text-accent">-0.5% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Customer Lifetime Value</p>
          <p className="text-3xl font-bold text-foreground mb-2">$1,245</p>
          <p className="text-sm text-accent">+12% from last month</p>
        </Card>
      </div>
    </div>
  )
}
