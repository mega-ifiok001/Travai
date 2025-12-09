"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"


export default function GenerateLeadsPage() {
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [leadAmount, setLeadAmount] = useState(50)
  const [industry, setIndustry] = useState("")
  const [location, setLocation] = useState("")
  const [companySize, setCompanySize] = useState("")
  const [revenue, setRevenue] = useState("")
  const [jobTitles, setJobTitles] = useState("")


  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsComplete(true)
    }, 2500)
  }


  return (
    <div className="px-12 space-y-6">
      
      {/* Back Button */}
      <Link href="/dashboard/leads" className="inline-block">
        <Button variant="ghost" className="gap-2 cursor-pointer">
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Button>
      </Link>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground ">Generate New Leads</h1>
        <p className="text-muted-foreground mt-1">
          Tell the AI who your perfect prospects are, and it will find them for you.
        </p>
      </div>

      {/* Card */}
      <Card className="p-8 max-w-2xl">
        
        {!isComplete ? (
          <>

            {/* MAIN FORM */}
            <div className="space-y-6">

              {/* Description */}
              <div>
                <Label className="text-base font-semibold text-foreground">
                  Describe Your Ideal Customers
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Include industries, pain points, buying intent, etc.
                </p>
                <Textarea
                  placeholder="e.g., SaaS companies in the US doing $1M-$10M ARR that need SDR support."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-32 mt-2"
                />
              </div>

              {/* Lead Quantity */}
              <div className="space-y-2">
                <Label className="font-medium">How many leads do you want?</Label>
                <Input
                  type="number"
                  min={10}
                  max={5000}
                  value={leadAmount}
                  onChange={(e) => setLeadAmount(Number(e.target.value))}
                  className="w-40"
                />
                <p className="text-sm text-muted-foreground">
                  You can generate between 10 and 5,000 leads at once.
                </p>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                className="flex justify-between items-center w-full py-3 px-4 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <span className="font-semibold text-foreground">Advanced Filters</span>
                {showAdvanced ? <ChevronUp /> : <ChevronDown />}
              </button>

              {/* Advanced Filters Section */}
              {showAdvanced && (
                <div className="space-y-4 border p-5 rounded-xl bg-muted/20 animate-in slide-in-from-top duration-300">

                  <div>
                    <Label>Industry</Label>
                    <Input
                      placeholder="e.g., Real Estate, SaaS, Retail"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., United States, UK, Canada"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Company Size</Label>
                    <Input
                      placeholder="e.g., 1–20 employees, 20–200, 200+"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Revenue Range</Label>
                    <Input
                      placeholder="e.g., $500k–$3M"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Target Job Titles</Label>
                    <Input
                      placeholder="e.g., CEO, Founder, Marketing Manager"
                      value={jobTitles}
                      onChange={(e) => setJobTitles(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={!description || isGenerating}
                  className="bg-primary cursor-pointer hover:bg-primary/90 text-white gap-2"
                >
                  {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isGenerating ? "Generating leads..." : "Generate Leads"}
                </Button>

                <Link href="/dashboard/leads">
                  <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </Link>
              </div>
            </div>
          </>

        ) : (

          // SUCCESS STATE
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Leads Generated Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              We found {leadAmount} high-quality leads matching your criteria.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/dashboard/leads">
                <Button className="bg-primary hover:bg-primary/90 cursor-pointer text-white">
                  View All Leads
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setIsComplete(false)
                  setDescription("")
                }}
                className="cursor-pointer"
              >
                Generate More
              </Button>
            </div>
          </div>
        )}

      </Card>
    </div>
  )
}
