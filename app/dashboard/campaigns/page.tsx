// app/dashboard/campaigns/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Target,
  MessageSquare,
  Bot,
  BarChart3,
  Play,
  Pause,
  Edit2,
  Copy,
  Trash2,
  Plus,
  Sparkles,
} from "lucide-react";
import NewLeadsBanner from "../../NewLeadsBanner";

type Campaign = {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  leads: number;
  sent: number;
  replies: number;
  meetings: number;
  replyRate: number;
  conversionRate: number;
  lastRun: string;
  channels?: string[]; // e.g., ["email","linkedin"]
};

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<"active" | "paused" | "all">("active");

  // sample data (keep or fetch from API)
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "London Restaurants - Web Design",
      status: "active",
      leads: 842,
      sent: 612,
      replies: 89,
      meetings: 23,
      replyRate: 14.5,
      conversionRate: 3.8,
      lastRun: "2 hours ago",
      channels: ["email"],
    },
    {
      id: "2",
      name: "Abuja Real Estate Investors",
      status: "active",
      leads: 1567,
      sent: 1567,
      replies: 203,
      meetings: 41,
      replyRate: 13.0,
      conversionRate: 2.6,
      lastRun: "Running now",
      channels: ["email", "linkedin"],
    },
    {
      id: "3",
      name: "US Online Tutors - Parent Outreach",
      status: "paused",
      leads: 420,
      sent: 298,
      replies: 67,
      meetings: 18,
      replyRate: 22.5,
      conversionRate: 6.0,
      lastRun: "Yesterday",
      channels: ["linkedin"],
    },
    {
      id: "4",
      name: "E-commerce Stores - CRO Audit",
      status: "completed",
      leads: 1200,
      sent: 1200,
      replies: 156,
      meetings: 34,
      replyRate: 13.0,
      conversionRate: 2.8,
      lastRun: "3 days ago",
      channels: ["email"],
    },
  ];

  // simulate newly generated leads; in real app, wire to global state or query param
  const newlyGeneratedLeadsCount = 45;

  const filtered = useMemo(() => {
    if (activeTab === "all") return campaigns;
    return campaigns.filter((c) => (activeTab === "active" ? c.status === "active" : c.status === activeTab));
  }, [activeTab, campaigns]);

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>;
      case "paused":
        return <Badge className="bg-yellow-500 text-white">Paused</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="px-8 space-y-6 py-2">
      {/* Floating banner for newly generated leads (Option D) */}
      <NewLeadsBanner count={newlyGeneratedLeadsCount} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground text-sm mt-1">Track, launch and manage all automated outreach campaigns.</p>
        </div>

        
         <div className="">
         <div className="ml-auto mb-2 flex flex-col items-end">
            <Link href="/dashboard/campaigns/new" className="ml-auto mb-2">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer hover:scale-[1.04] text-white gap-1">
              <Plus className="h-2 w-2" />
                 New Campaign
            </Button>
          </Link>
         </div>

        <div className="flex items-center gap-2">
          
          <div className="hidden md:grid grid-cols-5 gap-1">
            <Card className="p-2 flex items-center justify-center">
              <div className="flex items-center justify-between ">
                <div>
                  <p className="text-xs text-muted-foreground">Total Campaigns</p>
                  <p className="text-lg font-bold">12</p>
                </div>
              </div>
            </Card>

            <Card className="px-2 py-0 flex items-center justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Messages Sent</p>
                  <p className="text-lg font-bold">4,821</p>
                </div>
              </div>
            </Card>

            <Card className="p-2 flex items-center justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Replies</p>
                  <p className="text-lg font-bold text-accent">612</p>
                </div>
              </div>
            </Card>

            <Card className="p-2 flex -tems-center justify-center">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Meetings Booked</p>
                  <p className="text-lg font-bold text-accent">89</p>
                </div>
              </div>
            </Card>

            <Card className="p-2 flex items-center justify-center ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Reply Rate</p>
                  <p className="text-lg font-bold text-accent">14.8%</p>
                </div>
              </div>
            </Card>
          </div>

        </div>
         </div>
      </div>

      {/* Mobile stat row (condensed) */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <Card className="p-3">
          <p className="text-xs text-muted-foreground">Messages Sent</p>
          <p className="text-lg font-bold">4,821</p>
        </Card>
        <Card className="p-3">
          <p className="text-xs text-muted-foreground">Replies</p>
          <p className="text-lg font-bold text-accent">612</p>
        </Card>
      </div>

      {/* Tabs + Campaigns */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active" className="cursor-pointer">
            Active
          </TabsTrigger>
          <TabsTrigger value="paused" className="cursor-pointer">
            Paused
          </TabsTrigger>
          <TabsTrigger value="all" className="cursor-pointer">
            All Campaigns
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filtered.map((campaign) => (
            <Card key={campaign.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {campaign.name}
                        {campaign.lastRun.includes("now") && (
                          <Badge variant="outline" className="ml-2 animate-pulse">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Running
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Last activity: {campaign.lastRun}</p>
                    </div>

                    <div className="flex items-center gap-2">{getStatusBadge(campaign.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground">Leads</p>
                      <p className="font-semibold">{campaign.leads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sent</p>
                      <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Replies</p>
                      <p className="font-semibold text-accent">{campaign.replies}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meetings</p>
                      <p className="font-semibold text-accent">{campaign.meetings}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-sm">
                    <div>
                      <p className="text-muted-foreground">Reply Rate</p>
                      <p className="font-bold text-accent">{campaign.replyRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversion</p>
                      <p className="font-bold text-accent">{campaign.conversionRate}%</p>
                    </div>

                    {/* Channels */}
                    <div className="ml-auto flex items-center gap-2">
                      {campaign.channels?.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground border"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Progress value={(campaign.sent / Math.max(1, campaign.leads)) * 100} className="h-2 mt-2" />
                </div>

                <div className="flex items-center gap-2">
                  {campaign.status === "active" ? (
                    <Button variant="outline" className="cursor-pointer" size="sm">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  ) : campaign.status === "paused" ? (
                    <Button size="sm" className="bg-green-600 cursor-pointer  hover:bg-green-700">
                      <Play className="h-4 w-4 mr-1" />
                      Resume
                    </Button>
                  ) : null}
                  <Link href={`/dashboard/campaigns/${campaign.id}`}>
                    <Button variant="ghost" className="cursor-pointer" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Button variant="ghost" className="cursor-pointer" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive cursor-pointer hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {campaigns.length === 0 && (
        <Card className="p-16 text-center">
          <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
          <p className="text-muted-foreground mb-6">Create your first AI-powered outreach campaign and start getting customers on autopilot.</p>
          <Link href="/dashboard/campaigns/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Campaign
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
