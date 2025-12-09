"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Sparkles, Zap, Check, Copy, Plus } from "lucide-react";

const steps = ["Leads", "Sequence", "Personalize", "Schedule", "Launch"];

export default function NewCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLeads, setSelectedLeads] = useState("recent"); // recent, list, upload
  const [selectedSequence, setSelectedSequence] = useState("saas-cold-outreach");

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="px-12  max-w-6xl mx-auto pb-4">
      <Link href="/dashboard/campaigns">
        <Button variant="ghost" className="gap-2 mb-3">
          <ArrowLeft className="h-4 w-4" /> Back to Campaigns
        </Button>
      </Link>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Create AI-Powered Campaign
        </h1>
        <p className="text-lg text-muted-foreground ">
          Launch hyper-personalized outreach in under 2 minutes
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm">
          {steps.map((step, i) => (
            <div key={i} className={`flex items-center gap-2 ${i <= currentStep ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {i < currentStep ? <Check className="h-5 w-5 text-green-500" /> : <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs">{i + 1}</span>}
              {step}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={steps[currentStep]} className="w-full">
        <TabsContent value="Leads" className="mt-0">
          <Card className="p-4">
            <h2 className="text-xl font-bold ">Which leads do you want to message?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setSelectedLeads("recent")}
                className={`p-2 rounded-2xl border-2 cursor-pointer transition-all ${selectedLeads === "recent" ? "border-purple-600 bg-purple-500/5" : "border-muted"}`}
              >
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-md">342 New Enriched Leads</h3>
                <p className="text-sm text-muted-foreground ">From your last generation • 91% email found</p>
                {selectedLeads === "recent" && <Badge className="mt-2">Selected</Badge>}
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-muted hover:border-foreground/30 cursor-pointer">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-center">Upload CSV</h3>
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-muted hover:border-foreground/30 cursor-pointer">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-center">From Saved List</h3>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="Sequence" className="mt-0">
          <Card className="p-4">
            <h2 className="text-xl font-bold ">Choose your outreach sequence</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["SaaS Cold Outreach (14.8% reply)", "Investor Outreach", "Agency Lead Gen", "Recruiting"].map((seq) => (
                <div
                  key={seq}
                  onClick={() => setSelectedSequence(seq.toLowerCase())}
                  className={`p-3 rounded-xl border-2xl border-2 cursor-pointer transition ${selectedSequence === seq.toLowerCase() ? "border-purple-600 bg-purple-500/5" : "border-muted"}`}
                >
                  <h3 className="font-bold text-md">{seq.split(" (")[0]}</h3>
                  <p className="text-sm text-muted-foreground">5 steps • Email + LinkedIn</p>
                  <p className="text-xl font-bold text-accent mt-2">{seq.includes("14.8") ? "14.8%" : "12.1%"} avg reply rate</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="Personalize" className="mt-0">
          <Card className="p-4 text-center">
            <h2 className="text-xl font-bold ">AI is writing 342 personalized emails...</h2>
            <p className="text-md text-muted-foreground">Using LinkedIn activity, funding news, tech stack, and job posts</p>
            <div className="">
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse" style={{ width: "68%" }} />
              </div>
            </div>
            <p className="text-lg">68% complete • ~18 seconds left</p>
          </Card>
        </TabsContent>

        <TabsContent value="Schedule" className="mt-0">
          <Card className="p-5">
            <h2 className="text-lg font-bold">When should we send?</h2>
            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="font-semibold">Daily sending limit</label>
                <input type="range" min="10" max="300" defaultValue={100} className="w-full " />
                <p className="text-sm text-muted-foreground text-center mt-2">100 emails/day (recommended)</p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Badge variant="secondary">Warm-up mode active</Badge>
                <Badge className="bg-green-500/10 text-green-600">Safe sending</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="Launch" className="mt-0">
          <Card className="p-5 text-center bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-transparent border-purple-600/20">
            <h2 className="text-2xl font-bold ">Your Campaign Is Ready!</h2>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <p className="text-muted-foreground">Leads</p>
                <p className="text-xl font-bold">342</p>
              </div>
              <div>
                <p className="text-muted-foreground">Sequence</p>
                <p className="text-xl font-bold">SaaS Cold Outreach</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expected Replies</p>
                <p className="text-xl font-bold text-accent">48–62</p>
              </div>
            </div>
            <Button size="lg" className="mt-5 text-md cursor-pointer  py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] transition text-white">
            
              Launch Campaign Now
            </Button>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-10">
        {currentStep > 0 && (
          <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className="cursor-pointer !hover:bg-slate-200"> 
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button size="lg" onClick={() => setCurrentStep(currentStep + 1)} className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.03] cursor-pointer">
            {currentStep === steps.length - 2 ? "Review & Launch" : "Continue"}
          </Button>
        )}
      </div>
    </div>
  );
}