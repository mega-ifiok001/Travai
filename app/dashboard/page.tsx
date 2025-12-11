"use client"

import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DailyOutreachSummary from "@/components/dashboard/daily-outreach-summary";
import PipelineSnapshot from "@/components/PipelineSnapshot";
import SequencePerformance from "@/components/SequencePerformance";
import LeadSourceBreakdown from "@/components/LeadSourceBreakdown";
import AISuggestions from "@/components/AISuggestions";
import TodayTasks from "@/components/TodayTasks";
import MeetingPreview from "@/components/MeetingPreview";
import ActiveCampaignsOverview from "@/components/dashboard/ActiveCampaignsOverview";
import RecentActivity from "@/components/RecentActivity";
import AIActionsFeed from "@/components/dashboard/AiActionFeed";
// import QuickActions from "@/components/QuickActions";
import {
  LineChart,
  Line,
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
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const leadsData = [
  { name: "Mon", leads: 12, converted: 3 },
  { name: "Tue", leads: 19, converted: 5 },
  { name: "Wed", leads: 15, converted: 4 },
  { name: "Thu", leads: 22, converted: 6 },
  { name: "Fri", leads: 28, converted: 8 },
  { name: "Sat", leads: 18, converted: 5 },
  { name: "Sun", leads: 16, converted: 4 },
]

const conversionData = [
  { name: "Converted", value: 35 },
  { name: "Pending", value: 45 },
  { name: "Lost", value: 20 },
]


interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  padding?: string; // optional, default to p-2
}

const COLORS = ["#28A745", "#FFC107", "#DC3545"]

export default function DashboardHome() {
  return (
    <div className="px-4 space-y-4 py-2 pt-16 md:pt-20 pb-5 bg-[#d9e0e8]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, Mega.</h1>
          <p className="text-muted-foreground mt-1">Here's your sales performance overview.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/leads/generate">
            <Button className="bg-gradient-to-r from-[#081ab3] to-[#000] hover:scale-[1.03] cursor-pointer text-white gap-2">
              Generate New Leads
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {/* <Link href="/dashboard/automation/create">
            <Button variant="outline" className="cursor-pointer">Create Campaign</Button>
          </Link> */}
        </div>
      </div>


{/* stat grid card overview */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
<StatCard label="Lead Pool" value={284} change={12} trend="up" />
<StatCard label="Campaigns Running" value={1240} change={8} trend="up" />
<StatCard label="Interaction Rate" value={34.2} change={3} trend="up" />
<StatCard label="Engagement Rate" value={34.2} change={3} trend="up" />
<StatCard label="Meetings Booked" value={32} change={-2} trend="down" />

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  <ActiveCampaignsOverview className="shadow-lg" />  {/* or place it wherever fits */}
        
          <PipelineSnapshot className="shadow-lg" />
        </div>

  

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DailyOutreachSummary
      emailsSent={120}
      linkedInSent={45}
      emailChange={10}
      linkedInChange={-5}
      className="shadow-lg"
    />
          <LeadSourceBreakdown />
        </div>


    <AIActionsFeed />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TodayTasks />
          <MeetingPreview />
        </div>


        <RecentActivity />


        {/* <QuickActions /> */}

    </div>
  )
}
