"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  PhoneMissed,
  MessageSquare,
  Send,
  AlertCircle,
  Clock,
  Check,
  Search,
  Filter,
  ArrowRight,
  Bell,
  Mail,
  Linkedin,
  X,
} from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { useState } from "react"

interface NotificationItem {
  id: number
  type: "missed-call" | "unanswered-message" | "failed-send" | "reply" | "meeting" | "other"
  title: string
  description: string
  time: Date
  channel?: "email" | "linkedin" | "call" | "other"
  read: boolean
  actionLabel?: string
}

const allNotifications: NotificationItem[] = [
  {
    id: 1,
    type: "missed-call",
    title: "Missed Call from John Doe",
    description: "High-priority lead from LinkedIn campaign. Left no voicemail.",
    time: new Date(Date.now() - 15 * 60 * 1000),
    channel: "call",
    read: false,
    actionLabel: "Schedule Call",
  },
  {
    id: 2,
    type: "unanswered-message",
    title: "Unanswered LinkedIn Message",
    description: "Sarah Johnson hasn't replied to your connection message sent 3 days ago.",
    time: new Date(Date.now() - 45 * 60 * 1000),
    channel: "linkedin",
    read: false,
    actionLabel: "Send Follow-up",
  },
  {
    id: 3,
    type: "failed-send",
    title: "Email Delivery Failed",
    description: "Hard bounce for mike@company.com – Cold outreach sequence (Step 2).",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    channel: "email",
    read: false,
    actionLabel: "Find Alternate Email",
  },
  {
    id: 4,
    type: "reply",
    title: "Positive Reply from Emma Wilson",
    description: "Interested in learning more about our solution. Replied: “This looks promising!”",
    time: new Date(Date.now() - 5 * 60 * 60 * 1000),
    channel: "email",
    read: true,
    actionLabel: "View Message",
  },
  {
    id: 5,
    type: "meeting",
    title: "Meeting Booked",
    description: "Alex Rivera accepted your calendar invite for tomorrow at 2:30 PM.",
    time: new Date(Date.now() - 8 * 60 * 60 * 1000),
    channel: "other",
    read: true,
    actionLabel: "View Calendar",
  },
  {
    id: 6,
    type: "other",
    title: "Lead Enriched",
    description: "New data added to 12 leads (job changes detected).",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000),
    channel: "other",
    read: true,
  },
]

const getIcon = (item: NotificationItem) => {
  switch (item.type) {
    case "missed-call":
      return <PhoneMissed className="h-5 w-5 text-red-600" />
    case "unanswered-message":
      return <MessageSquare className="h-5 w-5 text-orange-600" />
    case "failed-send":
      return <Send className="h-5 w-5 text-red-600" />
    case "reply":
      return <Mail className="h-5 w-5 text-green-600" />
    case "meeting":
      return <Bell className="h-5 w-5 text-blue-600" />
    default:
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />
  }
}

const getChannelIcon = (channel?: string) => {
  switch (channel) {
    case "email":
      return <Mail className="h-3 w-3" />
    case "linkedin":
      return <Linkedin className="h-3 w-3" />
    case "call":
      return <PhoneMissed className="h-3 w-3" />
    default:
      return <Bell className="h-3 w-3" />
  }
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [notifications, setNotifications] = useState(allNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(notif => {
    const matchesTab = selectedTab === "all" || (selectedTab === "unread" && !notif.read)
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notif.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="min-h-screen bg-[#d9e0e8] px-4 py-8 pt-20 md:pt-24">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bell className="h-8 w-8" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
             Stay updated with your latest notifications and actions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 bg-[#081ab3]">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="actions">Actions Needed</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-20 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">No notifications found</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedTab === "unread" ? "You're all caught up!" : "Check back later for updates."}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-6 hover:bg-accent/50 transition-colors ${!notif.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(notif)}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                  <p className={`font-semibold ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                                    {notif.title}
                                  </p>
                                  {!notif.read && (
                                    <Badge variant="destructive" className="text-xs bg-[#081ab3]">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{notif.description}</p>
                              </div>
                              {notif.actionLabel && (
                                <Button
                                  size="sm"
                                  onClick={() => markAsRead(notif.id)}
                                  className="ml-4 bg-[#0819b4b0] hover:bg-[#081ab3]/90 text-white cursor-pointer"
                                >
                                  {notif.actionLabel}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(notif.time, { addSuffix: true })}
                              </div>
                              {notif.channel && (
                                <>
                                  <Separator orientation="vertical" className="h-4" />
                                  <div className="flex items-center gap-1">
                                    {getChannelIcon(notif.channel)}
                                    <span className="capitalize">{notif.channel}</span>
                                  </div>
                                </>
                              )}
                              <span>{format(notif.time, "MMM d, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}