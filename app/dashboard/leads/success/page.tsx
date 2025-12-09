// app/dashboard/leads/success/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function LeadsSuccessPage() {
  const params = useSearchParams();
  const countParam = params?.get("count");
  const count = countParam ? parseInt(countParam, 10) : 0;

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <Card className="p-10 text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-accent/10 mx-auto mb-4">
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Leads Generated Successfully</h1>
        <p className="text-muted-foreground mb-6">
          {count > 0
            ? `We found ${count} high-quality leads matching your criteria.`
            : `We found leads matching your criteria.`}
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href={`/dashboard/campaigns/new?source=new-leads&count=${count}`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Start Campaign with These Leads
            </Button>
          </Link>

          <Link href="/dashboard/leads">
            <Button variant="outline">View Leads</Button>
          </Link>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>
            Tip: Start with a short 3-step campaign (email→follow-up→LinkedIn) for best results.
          </p>
        </div>
      </Card>
    </div>
  );
}
