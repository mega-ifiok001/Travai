"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "@/components/ui/use-toast";
import { toast } from "react-hot-toast";

import {
  Sparkles,
  Reply,
  Calendar,
  CheckCircle2,
  Pause,
  Trash2,
  Send,
  Loader2,
  CheckCheck,
  Building,
  RefreshCw,
  Bot,
} from "lucide-react";

type Sentiment = "positive" | "neutral" | "negative" | "meeting" | "ooo";

interface Thread {
  id: string;
  from: string;
  company: string;
  avatar: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: Date;
  sentiment: Sentiment;
  replied: boolean;
  crmSynced: boolean;
  selected?: boolean;
}

const mockThreads: Thread[] = [
  {
    id: "1",
    from: "Sofia Patel",
    company: "PostHog",
    avatar: "SP",
    subject: "Re: Helping PostHog scale outbound",
    preview: "Perfect timing — we're hiring 2 more AEs next quarter...",
    body: "Hey! This is actually perfect timing — we're hiring 2 more AEs next quarter and struggling with lead flow. Can we hop on a quick 15-min call next week?",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    sentiment: "meeting",
    replied: false,
    crmSynced: false,
  },
  {
    id: "2",
    from: "Marcus Chen",
    company: "Vercel",
    avatar: "MC",
    subject: "Re: Your cold email playbook",
    preview: "Love the personalization — how are you finding emails?",
    body: "Love the personalization — how are you finding emails at this scale? We're getting crushed by LinkedIn limits.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    sentiment: "positive",
    replied: false,
    crmSynced: true,
  },
  {
    id: "3",
    from: "Emma Wilson",
    company: "Ramp",
    avatar: "EW",
    subject: "Not interested",
    preview: "Thanks but we're good for now.",
    body: "Thanks but we're good for now.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    sentiment: "negative",
    replied: true,
    crmSynced: true,
  },
  {
    id: "4",
    from: "Alex Kim",
    company: "Brex",
    avatar: "AK",
    subject: "Out of office",
    preview: "I’m OOO until Jan 6th",
    body: "I’m OOO until Jan 6th — will reply then!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    sentiment: "ooo",
    replied: false,
    crmSynced: false,
  },
  // Add more threads...
];

export default function UltimateAIInbox() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(mockThreads[0]);
  const [replyDraft, setReplyDraft] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState<Set<string>>(new Set());
  const [isBulkMode, setIsBulkMode] = useState(false);

  // Bulk selection
  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedThreads);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedThreads(newSet);
    setIsBulkMode(newSet.size > 0);
  };

  const selectAll = () => {
    if (selectedThreads.size === threads.length) {
      setSelectedThreads(new Set());
      setIsBulkMode(false);
    } else {
      setSelectedThreads(new Set(threads.map(t => t.id)));
      setIsBulkMode(true);
    }
  };

  // AI Reply Generation
  const generateAISuggestions = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAiSuggestions([
        "Love to hear that! Are you free for a 15-min call next Tue/Wed? Here's my calendar: calendly.com/demo",
        "Amazing timing — most teams see 3–5x more meetings after hiring new AEs. Quick question: who owns outbound today?",
        "Perfect! Would you be open to a quick 10-min sync? No pressure — just exploring.",
      ]);
      setIsGenerating(false);
    }, 1300);
  };

  // Bulk AI Reply
  const handleBulkReply = () => {
    toast({
      title: "Sending to 12 leads",
      description: "AI is writing personalized replies...",
    });
    setTimeout(() => {
      toast({
        title: "12 replies sent",
        description: "All threads stopped. CRM updated.",
      });
      setSelectedThreads(new Set());
      setIsBulkMode(false);
    }, 2000);
  };

  const getSentimentBadge = (sentiment: Sentiment) => {
    const map = {
      positive: { label: "Positive", color: "bg-green-500/15 text-green-600 border-green-500/30" },
      negative: { label: "Not Interested", color: "bg-gray-500/15 text-gray-600" },
      meeting: { label: "Meeting Booked", color: "bg-purple-500/15 text-purple-600 border-purple-500/30" },
      ooo: { label: "Out of Office", color: "bg-yellow-500/15 text-yellow-600" },
      neutral: { label: "Neutral", color: "bg-gray-400/15 text-gray-600" },
    };
    const s = map[sentiment] || map.neutral;
    return <Badge className={s.color}>{s.label}</Badge>;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* LEFT: Thread List */}
      <div className="w-100 border-r flex flex-col">
        <div className="p-3 border-b flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Inbox</h1>
            <p className="text-sm text-muted-foreground">23 unreplied • AI active</p>
          </div>
          <Button size="sm" variant="ghost">
            <RefreshCw className="h-2 w-2 cursor-pointer" />
          </Button>
        </div>

        {/* Bulk Action Bar */}
        {isBulkMode && (
          <div className="bg-purple-500/10 border-b border-purple-500/30 p-4 flex items-center gap-4">
            <Button size="sm" variant="ghost" onClick={() => setIsBulkMode(false)}>Cancel</Button>
            <span className="font-semibold">{selectedThreads.size} selected</span>
            <Button size="sm" className="gap-2" onClick={handleBulkReply}>
              <Bot className="h-4 w-4" /> AI Reply to All
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Pause className="h-4 w-4" /> Stop Sequences
            </Button>
          </div>
        )}

        <Tabs defaultValue="unreplied" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-5  mt-4">
            <TabsTrigger value="all" className="text-xs ">All</TabsTrigger>
            <TabsTrigger value="unreplied" className="text-xs">
              Unreplied <Badge className="">23</Badge>
            </TabsTrigger>
            <TabsTrigger value="positive" className="text-xs">Positive</TabsTrigger>
            <TabsTrigger value="meetings">
              Meetings <Badge className="">9</Badge>
            </TabsTrigger>
            <TabsTrigger value="ooo" className="text-xs">OOO</TabsTrigger>
          </TabsList>

          <TabsContent value="unreplied" className="flex-1">
            <ScrollArea className="h-full">
              <div className="">
                <label className="flex items-center mb-4 cursor-pointer">
                  <Checkbox checked={selectedThreads.size === threads.length} onCheckedChange={selectAll} />
                  <span className="text-sm">Select all</span>
                </label>
              </div>

              {threads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => !isBulkMode && setSelectedThread(thread)}
                  className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition group ${
                    selectedThread?.id === thread.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedThreads.has(thread.id)}
                      onCheckedChange={() => toggleSelect(thread.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{thread.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{thread.from}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(thread.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{thread.company}</p>
                      <p className="text-sm mt-1 line-clamp-2">{thread.preview}</p>
                      <div className="flex items-center gap-2 mt-3">
                        {getSentimentBadge(thread.sentiment)}
                        {!thread.replied && <Badge variant="outline" className="text-xs">Unreplied</Badge>}
                        {thread.crmSynced && <Badge variant="outline" className="text-xs flex items-center gap-1"><Building className="h-3 w-3" /> Synced</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* RIGHT: Thread Detail */}
      {selectedThread && !isBulkMode && (
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{selectedThread.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{selectedThread.from}</h2>
                <p className="text-muted-foreground">{selectedThread.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedThread.crmSynced && <Badge variant="outline"><CheckCheck className="h-3 w-3 mr-1" /> CRM Synced</Badge>}
              {selectedThread.sentiment === "meeting" && <Badge className="bg-purple-600 text-white">Meeting Booked</Badge>}
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <Card className="p-6 mb-6">
              <p className="whitespace-pre-wrap">{selectedThread.body}</p>
              <p className="text-xs text-muted-foreground mt-4">
                {selectedThread.timestamp.toLocaleString()}
              </p>
            </Card>

            {/* AI Suggestions */}
            <Card className="p-6 bg-gradient-to-r from-purple-600/5 to-pink-600/5 border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-bold">AI Reply Suggestions</h3>
                </div>
                <Button size="sm" onClick={generateAISuggestions} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  Generate
                </Button>
              </div>

              {aiSuggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setReplyDraft(s)}
                  className="p-4 mb-3 bg-background border rounded-lg cursor-pointer hover:border-purple-500 transition group"
                >
                  <p className="text-sm">{s}</p>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
                    <Button size="xs">Use this</Button>
                    <Button size="xs" variant="ghost">Edit</Button>
                  </div>
                </div>
              ))}
            </Card>
          </ScrollArea>

          {/* Reply Box */}
          <div className="p-6 border-t bg-background">
            <Textarea
              placeholder="Write your reply... (AI suggestions above)"
              value={replyDraft}
              onChange={(e) => setReplyDraft(e.target.value)}
              className="min-h-40 mb-4"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Send className="h-4 w-4" /> Send Reply
                </Button>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" /> Send + Book Call
                </Button>
                <Button variant="outline" className="gap-2">
                  <Pause className="h-4 w-4" /> Stop Sequence
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Ctrl+Enter to send
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}