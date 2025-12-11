"use client"

import { useState } from "react"
import { Bell, PhoneMissed, MessageSquare, Send, AlertCircle, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

interface NotificationItem {
  id: number
  type: "missed-call" | "unanswered-message" | "failed-send" | "other"
  title: string
  description: string
  time: Date
  actionLabel?: string
}

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: "missed-call",
    title: "Missed Call from John Doe",
    description: "Prospect from LinkedIn campaign - High priority lead",
    time: new Date(Date.now() - 15 * 60 * 1000),
    actionLabel: "Schedule Call",
  },
  {
    id: 2,
    type: "unanswered-message",
    title: "Unanswered LinkedIn Message",
    description: "Sarah Johnson hasn't replied to your connection message",
    time: new Date(Date.now() - 45 * 60 * 1000),
    actionLabel: "Follow Up",
  },
  {
    id: 3,
    type: "failed-send",
    title: "Email Delivery Failed",
    description: "Bounce detected for mike@company.com",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionLabel: "Resend",
  },
  {
    id: 4,
    type: "other",
    title: "New Reply Received",
    description: "Positive response from Emma Wilson",
    time: new Date(Date.now() - 5 * 60 * 60 * 1000),
    actionLabel: "View Message",
  },
]

const getIcon = (type: NotificationItem["type"]) => {
  switch (type) {
    case "missed-call":
      return <PhoneMissed className="h-4 w-4 text-red-600" />
    case "unanswered-message":
      return <MessageSquare className="h-4 w-4 text-orange-600" />
    case "failed-send":
      return <Send className="h-4 w-4 text-red-600" />
    default:
      return <AlertCircle className="h-4 w-4 text-blue-600" />
  }
}

export default function NotificationBell() {
  const unreadCount = notifications.length

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative cursor-pointer hover:text-black hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#081ab3] to-[#000] text-white text-xs font-bold flex items-center justify-center"
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </motion.span>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="rounded-xl px-3 py-1.5 text-xs bg-black text-white">
            Notifications
          </TooltipContent>
        </Tooltip>

        {/* Dropdown Panel */}
        <DropdownMenuContent align="end" className="w-96 p-0 mr-4 mt-2 border-0 shadow-2xl">
          <Card className="border-0 rounded-xl shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="rounded-full bg-[#081ab3]">
                    {unreadCount} New
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  No new notifications
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="font-medium text-sm truncate">{notif.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notif.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(notif.time, { addSuffix: true })}
                        </div>
                      </div>
                      {notif.actionLabel && (
                        <Button size="sm" variant="ghost" className="text-xs h-7 cursor-pointer hover:bg-slate-300 bg-slate-200">
                          {notif.actionLabel}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {notifications.length > 0 && (
              <div className="border-t px-4 py-3 text-center">
               <Link href='/dashboard/notifications'>
                <Button variant="link" size="sm" className="text-sm cursor-pointer">
                  View all notifications
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
               </Link>
              </div>
            )}
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}