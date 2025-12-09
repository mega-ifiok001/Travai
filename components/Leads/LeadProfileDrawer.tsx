// components/leads/LeadProfileDrawer.tsx
import { X, Mail, Linkedin, Phone, Sparkles, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  industry: string;
  score: number;
  stage: string;
}

interface Props {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeadProfileDrawer({ lead, open, onOpenChange }: Props) {
  if (!lead) return null;

  const timeline = [
    { type: "email", text: "Cold email sent", time: "2 days ago" },
    { type: "reply", text: "Replied: “Interested, let’s talk”", time: "1 day ago" },
    { type: "meeting", text: "Meeting booked for Friday", time: "5 hours ago" },
  ];

  const aiSuggestions = [
    "Personalize with their recent funding round ($12M Series A)",
    "Mention their competitor 'ScaleFast' in your next email",
    "Best time to call: Tuesday 10–11 AM",
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: open ? 0 : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{lead.name}</h2>
                  <p className="text-muted-foreground">{lead.title} at {lead.company}</p>
                </div>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                  </Button>
                </Dialog.Close>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-gray-500" />
                    <a href={lead.linkedin} target="_blank" rel="noopener" className="text-blue-600 hover:underline">LinkedIn</a>
                  </div>
                </div>
                <div className="space-y-3 text-right">
                  <Badge className={`text-lg px-4 py-2 ${lead.score >= 90 ? "bg-green-500" : "bg-yellow-500"} text-white`}>
                    Score: {lead.score}
                  </Badge>
                  <Badge variant="outline" className="text-lg px-4 py-2 border-purple-500 text-purple-700">
                    {lead.stage}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="gap-2"><Mail className="w-4 h-4" /> Send Email</Button>
                <Button variant="outline" className="gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</Button>
                <Button variant="outline" className="gap-2"><Phone className="w-4 h-4" /> Call</Button>
                <Button variant="secondary" className="gap-2"><Sparkles className="w-4 h-4" /> AI Message</Button>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold">AI Suggestions</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {aiSuggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Activity Timeline</h3>
                <div className="space-y-5">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        {item.type === "email" && <Mail className="w-5 h-5 text-blue-600" />}
                        {item.type === "reply" && <MessageSquare className="w-5 h-5 text-green-600" />}
                        {item.type === "meeting" && <Calendar className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{item.text}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Notes</h3>
                <Textarea placeholder="Add a note about this lead..." className="min-h-32" />
                <Button className="mt-3">Save Note</Button>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}