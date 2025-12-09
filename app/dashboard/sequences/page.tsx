"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, BarChart3 } from "lucide-react";

export default function SequencesPage() {
  const templates = [
    { name: "SaaS Cold Outreach", steps: 5, replyRate: "14.8%", color: "from-purple-500 to-pink-500" },
    { name: "Post-Funding Congrats", steps: 4, replyRate: "18.3%", color: "from-green-500 to-emerald-600" },
    { name: "Agency Prospecting", steps: 6, replyRate: "12.1%", color: "from-blue-500 to-cyan-500" },
    { name: "Job Change Trigger", steps: 3, replyRate: "21.7%", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="px-12 py-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Sequence Templates</h1>
          <p className="text-muted-foreground">Battle-tested, AI-optimized outreach sequences</p>
        </div>
        <Link href="/dashboard/sequences/new">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 gap-2">
            <Plus className="h-4 w-4" />
            Create Sequence
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <Card key={t.name} className="p-6 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className={`h-32 rounded-xl bg-gradient-to-br ${t.color} opacity-90 mb-6`} />
            <h3 className="text-xl font-bold">{t.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t.steps} steps • Email + LinkedIn</p>
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="text-3xl font-bold text-accent">{t.replyRate}</p>
                <p className="text-sm text-muted-foreground">avg reply rate</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <Button size="sm" variant="secondary"><Copy className="h-4 w-4" /></Button>
                <Button size="sm"><BarChart3 className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}