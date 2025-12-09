"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  type: "error" | "warning" | "info" | "success"
  message: string
  details: string
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-02-15 14:32:01",
    type: "success",
    message: "Lead generation campaign completed",
    details: "284 leads generated for user_id: 5, Campaign: Cold Email Outreach",
  },
  {
    id: "2",
    timestamp: "2024-02-15 14:25:45",
    type: "info",
    message: "AI model inference",
    details: "OpenAI GPT-4 API call successful, 150 tokens used",
  },
  {
    id: "3",
    timestamp: "2024-02-15 14:12:30",
    type: "warning",
    message: "API rate limit warning",
    details: "Rate limit: 4950/5000 requests used this hour",
  },
  {
    id: "4",
    timestamp: "2024-02-15 13:45:12",
    type: "success",
    message: "Email campaign sent",
    details: "87 emails sent to leads, 34 opened, 12 clicked",
  },
  {
    id: "5",
    timestamp: "2024-02-15 13:20:00",
    type: "error",
    message: "Webhook delivery failed",
    details: "Failed to deliver webhook to external service, retrying...",
  },
]

export default function MonitoringPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-accent" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-destructive text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "success":
        return "bg-accent text-foreground"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">System Monitoring</h1>
        <p className="text-muted-foreground mt-1">Track system health, errors, and activities</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-accent rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-muted-foreground">API Status</p>
              <p className="text-lg font-bold text-foreground">Operational</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-accent rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-muted-foreground">Database</p>
              <p className="text-lg font-bold text-foreground">Healthy</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-yellow-600 dark:bg-yellow-400 rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-muted-foreground">Queue Processing</p>
              <p className="text-lg font-bold text-foreground">45 Pending</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-accent rounded-full animate-pulse" />
            <div>
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="text-lg font-bold text-foreground">99.98%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">API Response Time</p>
          <p className="text-2xl font-bold text-foreground">240ms</p>
          <p className="text-xs text-accent mt-1">↓ 12% from average</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Error Rate</p>
          <p className="text-2xl font-bold text-foreground">0.32%</p>
          <p className="text-xs text-accent mt-1">Within SLA</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Server Load</p>
          <p className="text-2xl font-bold text-foreground">34%</p>
          <p className="text-xs text-accent mt-1">Capacity available</p>
        </Card>
      </div>

      {/* Activity Logs */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity Logs</h2>
        <div className="space-y-3">
          {mockLogs.map((log) => (
            <div key={log.id} className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition">
              <div className="flex items-start gap-3 flex-1">
                {getTypeIcon(log.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{log.message}</p>
                    <Badge className={getTypeBadgeColor(log.type)}>{log.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-6 border-l-4 border-l-yellow-600 dark:border-l-yellow-400 bg-yellow-50 dark:bg-yellow-950/20">
        <div className="flex gap-4">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Active Alerts</h3>
            <ul className="text-sm text-foreground space-y-1">
              <li>• Email delivery rate below threshold (34% this hour)</li>
              <li>• 3 failed webhook deliveries - automatic retry in progress</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
