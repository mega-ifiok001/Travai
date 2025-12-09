"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Send, Loader2 } from "lucide-react"

const messageTypes = [
  { label: "Cold Email", value: "cold-email" },
  { label: "Follow-up Email", value: "follow-up" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "SMS", value: "sms" },
  { label: "LinkedIn DM", value: "linkedin" },
  { label: "Sales Pitch", value: "pitch" },
  { label: "Ad Copy", value: "ad-copy" },
  { label: "Blog Post", value: "blog" },
]

interface Message {
  id: string
  type: string
  recipient: string
  content: string
  status: "sent" | "pending" | "draft"
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "Cold Email",
    recipient: "sarah@techstartup.com",
    content:
      "Hi Sarah, I noticed your company is doing great work in tech. I think we could help you scale your sales process with AI...",
    status: "sent",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "Follow-up Email",
    recipient: "michael@agency.com",
    content: "Hi Michael, Just following up on my previous email. Would you be open to a quick call this week?",
    status: "sent",
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    type: "Sales Pitch",
    recipient: "emily@store.com",
    content: "Emily, based on your e-commerce store, here's how we can help you increase conversions by 40%...",
    status: "pending",
    timestamp: "1 day ago",
  },
]

export default function MessagesPage() {
  const [messageType, setMessageType] = useState("cold-email")
  const [targetLead, setTargetLead] = useState("")
  const [context, setContext] = useState("")
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const handleGenerateMessage = async () => {
    setIsGenerating(true)
    // Simulate AI API call
    setTimeout(() => {
      const sampleMessages: Record<string, string> = {
        "cold-email": `Hi Sarah,\n\nI came across your company and was impressed by the innovation in your space. I think we could help you streamline your sales process with AI-powered lead outreach.\n\nWould you be open to a quick 15-minute call next week to see if there's a fit?\n\nBest regards`,
        "follow-up": `Hi Sarah,\n\nJust wanted to follow up on my email from last week. I understand you might be busy, but I genuinely think this could help your team.\n\nLooking forward to connecting!\n\nBest regards`,
        pitch: `Hi Sarah,\n\nHere's how we help companies like yours:\n- Generate 50+ qualified leads per week\n- Automate personalized outreach\n- Close deals 3x faster\n\nInterested in learning more?`,
        whatsapp: `Hey Sarah! 👋 I saw your company and think we could help you automate your sales. Quick 15-min call?`,
        sms: `Hi Sarah! Check out how we help companies like yours increase sales by 40%. Call me? [link]`,
        linkedin: `Hi Sarah, great work on scaling your company! Thought we could help with your sales process. Free call?`,
        "ad-copy": `Stop wasting time on cold outreach.\n✓ AI-powered lead generation\n✓ Automated follow-ups\n✓ Close deals faster\n\nStart free today!`,
        blog: `The Future of Sales Automation\n\nIn today's competitive market, sales teams need an edge. Learn how AI-powered automation can help you generate more leads, nurture them better, and close deals faster...`,
      }
      setGeneratedMessage(sampleMessages[messageType] || "Generated message would appear here.")
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    alert("Message copied to clipboard!")
  }

  const handleSendMessage = () => {
    if (generatedMessage && targetLead) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        type: messageTypes.find((m) => m.value === messageType)?.label || "Message",
        recipient: targetLead,
        content: generatedMessage,
        status: "sent",
        timestamp: "Just now",
      }
      setMessages([newMessage, ...messages])
      setGeneratedMessage("")
      setTargetLead("")
      setContext("")
      alert("Message sent successfully!")
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-accent text-foreground"
      case "pending":
        return "bg-yellow-500 text-white"
      default:
        return "bg-slate-200 text-foreground"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Generate and send personalized messages to your leads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Generator */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Generate Message</h2>

          <div className="space-y-4">
            {/* Message Type */}
            <div>
              <Label htmlFor="type" className="text-foreground font-semibold">
                Message Type
              </Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {messageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Lead */}
            <div>
              <Label htmlFor="lead" className="text-foreground font-semibold">
                Target Lead
              </Label>
              <Input
                id="lead"
                placeholder="Select or type lead name/email"
                value={targetLead}
                onChange={(e) => setTargetLead(e.target.value)}
              />
            </div>

            {/* Context */}
            <div>
              <Label htmlFor="context" className="text-foreground font-semibold">
                Additional Context (Optional)
              </Label>
              <Textarea
                id="context"
                placeholder="Any specific details about the lead or your product to include..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-20"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateMessage}
              disabled={!targetLead || isGenerating}
              className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
            >
              {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isGenerating ? "Generating..." : "Generate Message"}
            </Button>

            {/* Generated Message Preview */}
            {generatedMessage && (
              <div className="border border-border rounded-lg p-4 bg-muted/50">
                <p className="text-sm font-semibold text-foreground mb-2">Message Preview:</p>
                <p className="text-sm text-foreground whitespace-pre-wrap mb-4">{generatedMessage}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyMessage}
                    variant="outline"
                    size="sm"
                    className="gap-2 flex-1 bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="bg-accent hover:bg-accent/90 text-foreground size-sm gap-2 flex-1"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Message Stats */}
        <div className="space-y-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Sent</p>
            <p className="text-3xl font-bold text-foreground">1,240</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Open Rate</p>
            <p className="text-3xl font-bold text-accent">42%</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Reply Rate</p>
            <p className="text-3xl font-bold text-accent">28%</p>
          </Card>
        </div>
      </div>

      {/* Message History */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Message History</h2>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                <div className="flex gap-3 items-center">
                  <div>
                    <p className="font-semibold text-foreground">{msg.type}</p>
                    <p className="text-sm text-muted-foreground">{msg.recipient}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadgeColor(msg.status)}>{msg.status}</Badge>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
              </div>
              <p className="text-sm text-foreground line-clamp-2">{msg.content}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
