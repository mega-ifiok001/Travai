"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Pause, Play, Edit, UserPlus } from "lucide-react"

export default function ActiveCampaignsOverview() {
  // Mock data - replace with real data as needed
  const totalLeads = 1240
  const contactedLeads = 496 // ~40%
  const progressPercentage = Math.round((contactedLeads / totalLeads) * 100)

  const channels = [
    { name: "Emails", sent: 890, total: 1240, backgroundColor: "bg-[#081ab3]" },
    { name: "SMS", sent: 320, total: 600, backgroundColor: "bg-[#081ab3]" },
    { name: "WhatsApp", sent: 180, total: 400, backgroundColor: "bg-[#081ab3]" },
    { name: "Calls Made", sent: 698, total: 1240, backgroundColor: "bg-[#081ab3]" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Campaigns Overview</CardTitle>
            <CardDescription>
              Currently running across all channels
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm">
            3 Active Campaigns
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Leads Contacted</span>
            <span className="text-muted-foreground">
              {contactedLeads} / {totalLeads} ({progressPercentage}%)
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {/* Channel Status Bars */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Channel Breakdown</h4>
          {channels.map((channel) => {
            const channelProgress = Math.round((channel.sent / channel.total) * 100)
            return (
              <div key={channel.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{channel.name}</span>
                  <span className="text-muted-foreground">
                    {channel.sent} / {channel.total}
                  </span>
                </div>
                <Progress
                  value={channelProgress}
                  className="h-2"
                  indicatorClassName={channel.backgroundColor}
                />
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button variant="outline" size="sm" className="gap-2 hover:scale-[1.03]  cursor-pointer">
            <Pause className="h-4 w-4" />
            Pause All
          </Button>
          <Button variant="outline" size="sm" className="gap-2 hover:scale-[1.03]  cursor-pointer">
            <Play className="h-4 w-4" />
            Resume
          </Button>
          <Button variant="outline" size="sm" className="gap-2 hover:scale-[1.03]  cursor-pointer">
            <Edit className="h-4 w-4" />
            Edit Campaigns
          </Button>
          <Button size="sm" className="gap-2  cursor-pointer bg-gradient-to-r from-[#081ab3] to-[#000] hover:scale-[1.03] text-white">
            <UserPlus className="h-4 w-4" />
            Add Leads
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}