"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Phone,
  Users,
  Building,
  AlertCircle,
} from "lucide-react"
import { format, addDays, startOfWeek, addHours } from "date-fns"

interface Meeting {
  id: number
  time: Date
  name: string
  company: string
  type: "Discovery Call" | "Demo" | "Follow-up" | "Closing" | "Onboarding"
  duration: number // in minutes
  location: "Zoom" | "Google Meet" | "In Person" | "Phone"
  attendees?: string[]
  notes?: string
  status: "upcoming" | "today" | "past"
}

const mockMeetings: Meeting[] = [
  {
    id: 1,
    time: addHours(new Date(), 3),
    name: "Sarah Chen",
    company: "TechCorp",
    type: "Discovery Call",
    duration: 30,
    location: "Zoom",
    status: "today",
  },
  {
    id: 2,
    time: addHours(new Date(), 7),
    name: "Mike Johnson",
    company: "StartupXYZ",
    type: "Demo",
    duration: 45,
    location: "Google Meet",
    status: "today",
  },
  {
    id: 3,
    time: addDays(new Date(), 1),
    name: "Emma Rodriguez",
    company: "GrowthCo",
    type: "Follow-up",
    duration: 30,
    location: "Zoom",
    status: "upcoming",
  },
  {
    id: 4,
    time: addDays(new Date(), 2),
    name: "David Kim",
    company: "Enterprise Solutions",
    type: "Closing",
    duration: 60,
    location: "In Person",
    status: "upcoming",
  },
  {
    id: 5,
    time: addDays(new Date(), -2),
    name: "Lisa Wang",
    company: "FinTech Pro",
    type: "Demo",
    duration: 45,
    location: "Zoom",
    status: "past",
  },
]

const getLocationIcon = (location: Meeting["location"]) => {
  switch (location) {
    case "Zoom":
    case "Google Meet":
      return <Video className="h-4 w-4" />
    case "Phone":
      return <Phone className="h-4 w-4" />
    case "In Person":
      return <MapPin className="h-4 w-4" />
    default:
      return <Video className="h-4 w-4" />
  }
}

const getTypeBadgeVariant = (type: Meeting["type"]) => {
  switch (type) {
    case "Discovery Call":
      return "default"
    case "Demo":
      return "secondary"
    case "Follow-up":
      return "outline"
    case "Closing":
      return "destructive"
    case "Onboarding":
      return "default"
    default:
      return "secondary"
  }
}

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("upcoming")

  const todayMeetings = mockMeetings.filter(m => m.status === "today").length
  const upcomingMeetings = mockMeetings.filter(m => m.status === "upcoming").length

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch =
      meeting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "today" && meeting.status === "today") ||
      (selectedTab === "upcoming" && meeting.status === "upcoming") ||
      (selectedTab === "past" && meeting.status === "past")

    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-[#d9e0e8] px-4 py-8 pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              Meetings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your upcoming calls, demos, and in-person meetings in one place.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-[#081ab3] to-[#000] hover:scale-[1.03] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold">{todayMeetings}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming This Week</p>
                  <p className="text-2xl font-bold">{upcomingMeetings}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total This Month</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <Users className="h-8 w-8 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search meetings by name, company, or type..."
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

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">
                Today
                {todayMeetings > 0 && <Badge className="ml-2">{todayMeetings}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              {filteredMeetings.length === 0 ? (
                <Card>
                  <CardContent className="py-20 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                      {searchQuery ? "No meetings found matching your search." : "No meetings scheduled."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMeetings.map((meeting) => (
                    <Card key={meeting.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="text-lg font-semibold">{meeting.name}</p>
                              <Badge   variant={getTypeBadgeVariant(meeting.type)}>
                                {meeting.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Building className="h-3 w-3" />
                              {meeting.company}
                            </p>
                          </div>
                          {meeting.status === "today" && (
                            <Badge variant="destructive">Today</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{format(meeting.time, "h:mm a")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{meeting.duration} min</span>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {getLocationIcon(meeting.location)}
                              <span>{meeting.location}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Join / View
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}