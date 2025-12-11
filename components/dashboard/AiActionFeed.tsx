"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Mail, MessageCircle, Reply, Sparkles, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function AIActionsFeed() {
  // Mock data for the AI actions feed
  const actions = [
    {
      id: 1,
      type: "suggested-followup",
      title: "AI Suggested Follow-up",
      description: "Recommended personalized reply to Sarah Johnson (CEO at TechCorp)",
      lead: "Sarah Johnson",
      time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      icon: Sparkles,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 2,
      type: "message-sent",
      title: "Email Sent",
      description: "Initial outreach to Michael Chen via Sequence: Cold Startup Founders",
      lead: "Michael Chen",
      time: new Date(Date.now() - 1000 * 60 * 45),
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      type: "response-received",
      title: "Reply Received",
      description: "Positive response from Emma Rodriguez – interested in demo",
      lead: "Emma Rodriguez",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      icon: Reply,
      color: "text-[#000]",
      bgColor: "bg-[#000]",
    },
    {
      id: 4,
      type: "message-sent",
      title: "LinkedIn Message Sent",
      description: "Connection request + intro message to David Lee",
      lead: "David Lee",
      time: new Date(Date.now() - 1000 * 60 * 60 * 4),
      icon: MessageCircle,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      id: 5,
      type: "suggested-followup",
      title: "AI Suggested Follow-up",
      description: "Gentle nudge recommended for Alex Rivera (no reply after 5 days)",
      lead: "Alex Rivera",
      time: new Date(Date.now() - 1000 * 60 * 60 * 6),
      icon: Sparkles,
      color: "text-[#000]",
      bgColor: "bg-[#000]",
    },
  ]

  const getIcon = (IconComponent: any, color: string) => (
    <div className={`p-2 rounded-full ${IconComponent === Sparkles ? "bg-purple-100" : "bg-gray-100"}`}>
      <IconComponent className={`h-4 w-4 ${color}`} />
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-black rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>AI Actions Feed</CardTitle>
              <CardDescription>Real-time log of AI-assisted outreach</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action) => (
            <div
              key={action.id}
              className={`flex gap-4 p-4 rounded-lg border transition-all ${
                action.type === "suggested-followup"
                  ? `${action.borderColor} border-2 bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm`
                  : "border-border bg-card"
              }`}
            >
              <div className="flex-shrink-0">
                {getIcon(action.icon, action.color || "text-muted-foreground")}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    {action.title}
                    {action.type === "suggested-followup" && (
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-[#081ab3]">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI Suggestion
                      </Badge>
                    )}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                {action.lead && (
                  <p className="text-xs font-medium text-foreground">{action.lead}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(action.time, { addSuffix: true })}
                </div>
              </div>

              {action.type === "suggested-followup" && (
                <div className="flex flex-col gap-2 ml-4">
                  <button className="text-xs font-medium text-[#081ab3] cursor-pointer underline">
                    Review & Send
                  </button>
                  <button className="text-xs cursor-pointer text-muted-foreground hover:text-foreground">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm cursor-pointer text-muted-foreground hover:text-foreground underline">
            View all AI actions →
          </button>
        </div>
      </CardContent>
    </Card>
  )
}