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

const mrrData = [
  { month: "Jan", mrr: 2400, arr: 28800 },
  { month: "Feb", mrr: 3900, arr: 46800 },
  { month: "Mar", mrr: 5200, arr: 62400 },
  { month: "Apr", mrr: 7100, arr: 85200 },
  { month: "May", mrr: 9200, arr: 110400 },
  { month: "Jun", mrr: 12540, arr: 150480 },
]

const revenueSourceData = [
  { source: "Basic Plans", revenue: 4320 },
  { source: "Pro Plans", revenue: 5940 },
  { source: "Enterprise Plans", revenue: 2280 },
  { source: "Add-ons", revenue: 1200 },
]

export default function RevenuePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Revenue Analytics</h1>
        <p className="text-muted-foreground mt-1">Track financial performance and growth</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Annual Recurring Revenue (ARR)</p>
          <p className="text-3xl font-bold text-foreground">$150,480</p>
          <p className="text-sm text-accent">+28% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Monthly Recurring Revenue (MRR)</p>
          <p className="text-3xl font-bold text-foreground">$12,540</p>
          <p className="text-sm text-accent">+35% MoM growth</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Average Contract Value</p>
          <p className="text-3xl font-bold text-foreground">$298</p>
          <p className="text-sm text-accent">+8% from last quarter</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Lifetime Revenue</p>
          <p className="text-3xl font-bold text-foreground">$52,340</p>
          <p className="text-sm text-accent">From all users</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR & ARR Trend */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">MRR & ARR Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mrrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mrr" stroke="#007BFF" strokeWidth={2} />
              <Line type="monotone" dataKey="arr" stroke="#28A745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue by Source */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Revenue by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueSourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="source" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#007BFF" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Revenue by Plan</h2>
          <div className="space-y-3">
            {[
              { plan: "Free", revenue: 0, users: 3, percentage: 0 },
              { plan: "Basic", revenue: 4320, users: 12, percentage: 34 },
              { plan: "Pro", revenue: 5940, users: 9, percentage: 47 },
              { plan: "Enterprise", revenue: 2280, users: 2, percentage: 18 },
            ].map((item) => (
              <div key={item.plan} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{item.plan} Plan</span>
                  <span className="text-foreground">${item.revenue}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{item.users} users</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Metrics</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Average Revenue Per User</span>
              <span className="font-bold text-foreground">$298</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Customer Acquisition Cost</span>
              <span className="font-bold text-foreground">$85</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Payback Period</span>
              <span className="font-bold text-foreground">3.4 months</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Customer Lifetime Value</span>
              <span className="font-bold text-accent">$1,245</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
