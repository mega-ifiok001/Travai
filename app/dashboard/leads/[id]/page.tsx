"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Mail, Linkedin, Globe, Building2, TrendingUp, UserPlus } from "lucide-react";

export default function LeadProfilePage() {
  const lead = {
    name: "Alexandra Rivera",
    title: "Head of Sales",
    company: "Nexlify",
    email: "alex@nexlify.io",
    linkedin: "linkedin.com/in/alexandrarivera",
    score: 94,
    intent: "High",
    tech: ["React", "Vercel", "Resend", "Supabase"],
    recentTrigger: "Just raised $12M Series A",
  };

  const icebreakers = [
    "Saw you just raised $12M — congrats! Most teams double their SDR output in the first 90 days after funding...",
    "Noticed you're using Vercel + Resend. We help similar teams save 18h/week on outreach...",
    "Your recent post about 'hiring 3 more AEs' caught my eye...",
  ];

  return (
    <div className="px-12 py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            AR
          </div>
          <div>
            <h1 className="text-4xl font-bold">{lead.name}</h1>
            <p className="text-xl text-muted-foreground">{lead.title} at <span className="text-foreground font-semibold">{lead.company}</span></p>
            <div className="flex items-center gap-3 mt-3">
              <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                AI Score: {lead.score} • High Intent
              </Badge>
            </div>
          </div>
        </div>

        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition gap-3">
          <UserPlus className="h-5 w-5" />
          Add to Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-500" />
                <span>{lead.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <a href="#" className="text-blue-600 hover:underline">View Profile</a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span>nexlify.io</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Buying Signals
            </h3>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
              {lead.recentTrigger}
            </Badge>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {lead.tech.map(t => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Research Panel */}
        <div className="lg:col-span-2">
          <Card className="p-8 border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-7 w-7 text-purple-600" />
              <h2 className="text-2xl font-bold">AI-Generated Personalization (Ready to Use)</h2>
            </div>

            <div className="space-y-5">
              {icebreakers.map((text, i) => (
                <div key={i} className="p-5 bg-white/70 dark:bg-black/30 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition">
                  <p className="text-foreground leading-relaxed">{text}</p>
                  <Button size="sm" variant="ghost" className="mt-3">Copy Icebreaker</Button>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] transition">
              Generate Full Email Sequence for Alexandra
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}