"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowUpRight } from "lucide-react"

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending"
}

const invoices: Invoice[] = [
  { id: "INV-2024-001", date: "Jan 15, 2024", amount: 99.0, status: "paid" },
  { id: "INV-2024-002", date: "Feb 15, 2024", amount: 99.0, status: "paid" },
  { id: "INV-2024-003", date: "Mar 15, 2024", amount: 99.0, status: "pending" },
]

export default function BillingPage() {
  const [plan, setPlan] = useState("pro")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and invoices</p>
      </div>

      {/* Current Plan */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
            <h2 className="text-3xl font-bold text-foreground mb-2">Pro Plan</h2>
            <p className="text-muted-foreground">
              <span className="text-2xl font-bold text-primary">$99</span>
              <span className="text-muted-foreground">/month</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">Unlimited leads • Full AI • Analytics • API access</p>
          </div>
          <div>
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Upgrade to Enterprise
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Current Usage</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">API Calls</span>
              <span className="text-sm text-muted-foreground">2,450 / 5,000</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-full rounded-full" style={{ width: "49%" }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">Leads Generated</span>
              <span className="text-sm text-muted-foreground">284 / Unlimited</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-full rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Plans Comparison */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">All Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Basic",
              price: "$29",
              features: ["100 leads/month", "Basic automation", "Email & SMS", "Priority support"],
              current: plan === "basic",
            },
            {
              name: "Pro",
              price: "$99",
              features: ["Unlimited leads", "Full AI automation", "All channels", "Advanced analytics", "API access"],
              current: plan === "pro",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "$299",
              features: ["Team collaboration", "Custom integration", "Dedicated support", "SLA guaranteed"],
              current: plan === "enterprise",
            },
          ].map((p) => (
            <Card key={p.name} className={`p-6 ${p.highlight ? "ring-2 ring-primary" : ""}`}>
              <h3 className="text-xl font-bold text-foreground mb-2">{p.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{p.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6">
                {p.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={p.current ? "w-full text-primary" : "w-full bg-primary hover:bg-primary/90 text-white"}
                variant={p.current ? "outline" : "default"}
              >
                {p.current ? "Current Plan" : "Switch to " + p.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Invoice History */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Invoice ID</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3 text-foreground">{inv.id}</td>
                  <td className="px-4 py-3 text-foreground">{inv.date}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">${inv.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Badge className={inv.status === "paid" ? "bg-accent text-foreground" : "bg-yellow-500 text-white"}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
