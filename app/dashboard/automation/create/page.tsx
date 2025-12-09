"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Minus, CheckCircle2 } from "lucide-react"

interface Step {
  id: number
  type: string
  delay?: number
  message?: string
}

export default function CreateCampaignPage() {
  const [campaignName, setCampaignName] = useState("")
  const [selectedLeads, setSelectedLeads] = useState("0")
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, type: "cold-email" },
    { id: 2, type: "delay", delay: 3 },
    { id: 3, type: "follow-up" },
  ])
  const [isCreating, setIsCreating] = useState(false)

  const handleAddStep = () => {
    setSteps([...steps, { id: Math.max(...steps.map((s) => s.id), 0) + 1, type: "delay", delay: 2 }])
  }

  const handleRemoveStep = (id: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((s) => s.id !== id))
    }
  }

  const handleUpdateStep = (id: number, updates: Partial<Step>) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const handleCreateCampaign = () => {
    setIsCreating(true)
    setTimeout(() => {
      setIsCreating(false)
      alert("Campaign created successfully!")
    }, 1500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Link href="/dashboard/automation" className="inline-block">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Automation
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Campaign</h1>
        <p className="text-muted-foreground mt-1">Build an automated outreach sequence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Builder */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-6">
            {/* Campaign Name */}
            <div>
              <Label htmlFor="name" className="text-foreground font-semibold">
                Campaign Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Cold Email Outreach - Tech"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            {/* Select Leads */}
            <div>
              <Label htmlFor="leads" className="text-foreground font-semibold">
                Select Leads
              </Label>
              <Select value={selectedLeads} onValueChange={setSelectedLeads}>
                <SelectTrigger id="leads">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Choose from saved lists...</SelectItem>
                  <SelectItem value="recent">Recent leads (45)</SelectItem>
                  <SelectItem value="high-quality">High quality (80+) - 23</SelectItem>
                  <SelectItem value="all">All leads - 284</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Automation Steps */}
            <div>
              <Label className="text-foreground font-semibold mb-4 block">Automation Sequence</Label>
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={step.id} className="border border-border rounded-lg p-4 bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-foreground">Step {index + 1}</span>
                      {steps.length > 1 && (
                        <button
                          onClick={() => handleRemoveStep(step.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {step.type === "delay" ? (
                      <div className="space-y-2">
                        <Label className="text-sm text-foreground">Wait (days)</Label>
                        <Input
                          type="number"
                          value={step.delay || 2}
                          onChange={(e) => handleUpdateStep(step.id, { delay: Number.parseInt(e.target.value) })}
                          min="1"
                          max="30"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label className="text-sm text-foreground">Message Type</Label>
                        <Select value={step.type} onValueChange={(val) => handleUpdateStep(step.id, { type: val })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cold-email">Cold Email</SelectItem>
                            <SelectItem value="follow-up">Follow-up Email</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="delay">Wait (days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button onClick={handleAddStep} variant="outline" className="w-full mt-3 gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add Step
              </Button>
            </div>

            {/* Create Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleCreateCampaign}
                disabled={!campaignName || selectedLeads === "0" || isCreating}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                {isCreating ? "Creating..." : "Create Campaign"}
              </Button>
              <Link href="/dashboard/automation" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <div className="space-y-4">
          <Card className="p-4 bg-accent/5 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-4">Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-foreground">Campaign name set</span>
              </div>
              <div
                className={`flex items-center gap-2 ${selectedLeads !== "0" ? "text-accent" : "text-muted-foreground"}`}
              >
                <CheckCircle2 className={`h-4 w-4 ${selectedLeads !== "0" ? "text-accent" : "text-border"}`} />
                <span>Leads selected</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle2 className="h-4 w-4" />
                <span>{steps.length} steps configured</span>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Campaign Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Total Duration</p>
                <p className="font-semibold text-foreground">
                  {steps.filter((s) => s.type === "delay").reduce((sum, s) => sum + (s.delay || 0), 0)} days
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Message Steps</p>
                <p className="font-semibold text-foreground">{steps.filter((s) => s.type !== "delay").length}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
