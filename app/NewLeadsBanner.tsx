// components/dashboard/NewLeadsBanner.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewLeadsBanner({ count = 0 }: { count?: number }) {
  const [visible, setVisible] = useState(count > 0);

  if (!visible || count <= 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 w-[360px] md:w-[420px]">
      <div className="flex items-center justify-between bg-white/95 border border-gray-200 shadow-lg rounded-lg p-4 gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-gradient-to-tr from-purple-600 to-pink-500 text-white p-2">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">New Leads Ready</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {count} new leads generated — ready to start outreach.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/dashboard/campaigns/new?source=new-leads&count=${count}`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Start Campaign
            </Button>
          </Link>
          <button
            aria-label="dismiss"
            onClick={() => setVisible(false)}
            className="p-2 rounded-md text-muted-foreground hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
