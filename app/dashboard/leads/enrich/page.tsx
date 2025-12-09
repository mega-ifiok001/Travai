"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/data-table";
import { ArrowLeft, Sparkles, Zap, Mail, Linkedin, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LeadsEnrichPage() {
  const [progress, setProgress] = useState(0);
  const [enrichedCount, setEnrichedCount] = useState(0);
  const totalLeads = 342; // In real app: get from search params or context

  // Simulate enrichment progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + Math.random() * 18;
      });
      setEnrichedCount((c) => Math.min(c + Math.floor(Math.random() * 12), totalLeads));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const mockEnrichedLeads = [
    { id: "1", name: "Alex Rivera", company: "Nexlify", email: "alex@nexlify.io", linkedin: "linkedin.com/in/alexrivera", score: 94, status: "enriched" },
    { id: "2", name: "Sarah Chen", company: "QuantumFlow", email: "sarah@quantumflow.co", linkedin: null, score: 87, status: "enriched" },
    { id: "3", name: "Marcus Okafor", company: "PaySwift Africa", email: null, linkedin: "linkedin.com/in/marcusokafor", score: 79, status: "partial" },
  ];

  return (
    <div className="px-12 py-8 space-y-8">
      {/* Header */}
      <Link href="/dashboard/leads">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Leads
        </Button>
      </Link>

      <div className="max-w-5xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Enrichment in Progress
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              We’re finding emails, LinkedIn profiles, intent signals, tech stack, funding data, and scoring every lead.
            </p>
          </div>
          <Sparkles className="h-12 w-12 text-purple-500 opacity-70" />
        </div>

        {/* Progress Card */}
        <Card className="mt-8 p-8 border-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Enriched</p>
                <p className="text-3xl font-bold">{enrichedCount} / {totalLeads} leads</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Estimated time</p>
                <p className="text-xl font-semibold text-accent">~45 seconds left</p>
              </div>
            </div>

            <Progress value={progress} className="h-4" />
            
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-500" />
                <span>89% email find rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <span>93% LinkedIn profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>67 high-intent leads detected</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Preview Table */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            {progress >= 100 && (
              <Link href="/dashboard/campaigns/new?source=enriched-leads">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition">
                  <Zap className="h-5 w-5 mr-2" />
                  Launch Campaign with Enriched Leads
                </Button>
              </Link>
            )}
          </div>

          <DataTable
            columns={[
              { key: "name", label: "Name" },
              { key: "company", label: "Company" },
              {
                key: "email",
                label: "Email",
                render: (email) => email ? <Badge className="bg-green-500/10 text-green-600">Found</Badge> : <Badge variant="secondary">Not found</Badge>
              },
              {
                key: "linkedin",
                label: "LinkedIn",
                render: (linkedin) => linkedin ? <Badge className="bg-blue-500/10 text-blue-600">Found</Badge> : <Badge variant="outline">—</Badge>
              },
              {
                key: "score",
                label: "AI Score",
                render: (score) => (
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${score >= 85 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
                    </div>
                    <span className="font-bold">{score}</span>
                  </div>
                )
              },
              {
                key: "status",
                label: "Status",
                render: (status) => status === "enriched" ? <Badge className="bg-accent text-foreground">Ready</Badge> : <Badge variant="secondary">Partial</Badge>
              },
            ]}
            data={mockEnrichedLeads}
          />
        </div>

        {progress >= 100 && (
          <Card className="mt-8 p-8 text-center bg-gradient-to-r from-green-500/5 to-emerald-500/10 border-green-500/20">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Enrichment Complete!</h3>
            <p className="text-lg text-muted-foreground">
              {totalLeads} leads enriched • 312 emails found emails • 87 high-intent leads ready
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}