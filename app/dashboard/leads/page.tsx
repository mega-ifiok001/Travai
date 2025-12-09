"use client"

import { useState } from "react"
import Link from "next/link"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Lead {
  id: string
  name: string
  business: string
  email: string
  phone: string
  website: string
  location: string
  industry: string
  score: number
}

const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    business: "Tech Startup",
    email: "sarah@techstartup.com",
    phone: "+1 (555) 123-4567",
    website: "techstartup.com",
    location: "San Francisco, CA",
    industry: "Software",
    score: 92,
  },
  {
    id: "2",
    name: "Michael Chen",
    business: "Digital Agency",
    email: "michael@agency.com",
    phone: "+1 (555) 234-5678",
    website: "agency.com",
    location: "New York, NY",
    industry: "Marketing",
    score: 85,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    business: "E-commerce Store",
    email: "emily@store.com",
    phone: "+1 (555) 345-6789",
    website: "store.com",
    location: "Austin, TX",
    industry: "Retail",
    score: 78,
  },
  {
    id: "4",
    name: "David Wilson",
    business: "Consulting Firm",
    email: "david@consulting.com",
    phone: "+1 (555) 456-7890",
    website: "consulting.com",
    location: "Chicago, IL",
    industry: "Consulting",
    score: 88,
  },
  {
    id: "5",
    name: "Lisa Thompson",
    business: "Design Studio",
    email: "lisa@design.com",
    phone: "+1 (555) 567-8901",
    website: "design.com",
    location: "Los Angeles, CA",
    industry: "Design",
    score: 75,
  },
]

export default function LeadsPage() {
  const [leads] = useState<Lead[]>(mockLeads)

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-accent text-foreground"
    if (score >= 70) return "bg-yellow-500 text-white"
    return "bg-destructive text-white"
  }

  return (
    <div className="px-12  space-y-4 py-8 ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your generated leads</p>
        </div>
        <Link href="/dashboard/leads/generate">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.04] cursor-pointer text-white gap-2">
            <Plus className="h-4 w-4" />
            Generate New Leads
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-foreground">{leads.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">High Quality (80+)</p>
          <p className="text-2xl font-bold text-accent">{leads.filter((l) => l.score >= 80).length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Contacted</p>
          <p className="text-2xl font-bold text-primary">65%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Conversion Rate</p>
          <p className="text-2xl font-bold text-accent">34%</p>
        </Card>
      </div>

      {/* Leads Table */}
      <DataTable<Lead>
        title="All Leads"
        columns={[
          { key: "name", label: "Name", width: "w-32" },
          { key: "business", label: "Business", width: "w-32" },
          { key: "email", label: "Email", width: "w-40" },
          { key: "phone", label: "Phone", width: "w-40" },
          { key: "location", label: "Location", width: "w-32" },
          { key: "industry", label: "Industry", width: "w-28" },
          {
            key: "score",
            label: "Lead Score",
            width: "w-28",
            render: (score) => <Badge className={getScoreBadgeColor(score)}>{score}</Badge>,
          },
          {
            key: "id",
            label: "Actions",
            width: "w-24",
            render: () => (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ),
          },
        ]}
        data={leads}
        onExport={() => alert("Exporting leads to CSV...")}
      />
    </div>
  )
}
