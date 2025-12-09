"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Trash2, Edit2 } from "lucide-react"

interface Campaign {
  id: string
  name: string
  status: "running" | "paused" | "draft"
  leads: number
  messagesQueued: number
  successRate: number
  createdDate: string
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Cold Email Outreach - Tech",
    status: "running",
    leads: 150,
    messagesQueued: 45,
    successRate: 38,
    createdDate: "3 days ago",
  },
  {
    id: "2",
    name: "Restaurant Lead Follow-up",
    status: "running",
    leads: 87,
    messagesQueued: 12,
    successRate: 42,
    createdDate: "1 week ago",
  },
  {
    id: "3",
    name: "E-commerce Store Outreach",
    status: "paused",
    leads: 62,
    messagesQueued: 0,
    successRate: 35,
    createdDate: "2 weeks ago",
  },
  {
    id: "4",
    name: "Agency Lead Generation",
    status: "draft",
    leads: 0,
    messagesQueued: 0,
    successRate: 0,
    createdDate: "1 day ago",
  },
]

export default function AutomationPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-accent text-foreground"
      case "paused":
        return "bg-yellow-500 text-white"
      default:
        return "bg-muted text-foreground"
    }
  }

  const handleToggleCampaign = (id: string) => {
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, status: c.status === "running" ? "paused" : "running" } : c)),
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automation</h1>
          <p className="text-muted-foreground mt-1">Create and manage automated outreach campaigns</p>
        </div>
        <Link href="/dashboard/automation/create">
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Campaigns</p>
          <p className="text-2xl font-bold text-foreground">{campaigns.filter((c) => c.status === "running").length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Leads in Automation</p>
          <p className="text-2xl font-bold text-primary">{campaigns.reduce((sum, c) => sum + c.leads, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Messages Queued</p>
          <p className="text-2xl font-bold text-accent">{campaigns.reduce((sum, c) => sum + c.messagesQueued, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Success Rate</p>
          <p className="text-2xl font-bold text-accent">
            {Math.round(
              campaigns.filter((c) => c.leads > 0).reduce((sum, c) => sum + c.successRate, 0) /
                campaigns.filter((c) => c.leads > 0).length,
            )}
            %
          </p>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{campaign.name}</h3>
                  <Badge className={getStatusBadgeColor(campaign.status)}>{campaign.status}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Leads</p>
                    <p className="font-semibold text-foreground">{campaign.leads}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Queued</p>
                    <p className="font-semibold text-foreground">{campaign.messagesQueued}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Success Rate</p>
                    <p className="font-semibold text-accent">{campaign.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-semibold text-foreground text-xs">{campaign.createdDate}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={() => handleToggleCampaign(campaign.id)}
                >
                  {campaign.status === "running" ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            {campaign.status === "running" && (
              <div className="mt-4 w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${(campaign.messagesQueued / campaign.leads) * 100}%` }}
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Create Campaign Help */}
      {campaigns.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No campaigns yet. Create your first automation campaign to get started.
          </p>
          <Link href="/dashboard/automation/create">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Campaign
            </Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
