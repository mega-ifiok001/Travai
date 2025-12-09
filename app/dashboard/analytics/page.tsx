"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download } from "lucide-react"

const leadsOverTimeData = [
  { date: "1 Jan", leads: 12, converted: 4 },
  { date: "5 Jan", leads: 28, converted: 9 },
  { date: "10 Jan", leads: 35, converted: 12 },
  { date: "15 Jan", leads: 42, converted: 14 },
  { date: "20 Jan", leads: 55, converted: 19 },
  { date: "25 Jan", leads: 68, converted: 23 },
  { date: "30 Jan", leads: 84, converted: 29 },
]

const conversionByChannelData = [
  { channel: "Email", conversions: 89 },
  { channel: "WhatsApp", conversions: 65 },
  { channel: "SMS", conversions: 45 },
  { channel: "LinkedIn", conversions: 72 },
  { channel: "Phone", conversions: 58 },
]

const campaignPerformanceData = [
  { name: "Campaign A", value: 42 },
  { name: "Campaign B", value: 35 },
  { name: "Campaign C", value: 23 },
]

const COLORS = ["#007BFF", "#FFC107", "#DC3545"]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [campaign, setCampaign] = useState("all")

  return (
    <div className="px-12 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your sales performance and metrics</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Leads Contacted</p>
          <p className="text-3xl font-bold text-foreground">284</p>
          <p className="text-xs text-accent mt-2">+12% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Open Rate</p>
          <p className="text-3xl font-bold text-accent">42%</p>
          <p className="text-xs text-accent mt-2">+3% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Reply Rate</p>
          <p className="text-3xl font-bold text-accent">28%</p>
          <p className="text-xs text-accent mt-2">+5% from last month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-accent">34%</p>
          <p className="text-xs text-accent mt-2">+8% from last month</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Leads Generated Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadsOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#007BFF" strokeWidth={2} />
              <Line type="monotone" dataKey="converted" stroke="#28A745" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Conversions by Channel */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Conversions by Channel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionByChannelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="channel" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="conversions" fill="#007BFF" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Best Performing Campaigns */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Campaign Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={campaignPerformanceData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {campaignPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Average Response Time</span>
              <span className="font-bold text-foreground">2.3 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Total Revenue Generated</span>
              <span className="font-bold text-accent">$28,450</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Avg Deal Value</span>
              <span className="font-bold text-foreground">$2,341</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-foreground">Cost Per Lead</span>
              <span className="font-bold text-foreground">$0.15</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
