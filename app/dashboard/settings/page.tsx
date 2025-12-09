"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Briefcase, Smartphone, Trash2, Plus } from "lucide-react"

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("Your Business")
  const [businessEmail, setBusinessEmail] = useState("contact@yourbusiness.com")
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", email: "john@yourbusiness.com", role: "Owner" },
    { id: 2, name: "Jane Smith", email: "jane@yourbusiness.com", role: "Admin" },
  ])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold text-foreground mb-6">Business Profile</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-name" className="text-foreground font-semibold">
                  Business Name
                </Label>
                <Input
                  id="business-name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="business-email" className="text-foreground font-semibold">
                  Business Email
                </Label>
                <Input
                  id="business-email"
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-foreground font-semibold">Industry</Label>
                <select className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Software</option>
                  <option>Retail</option>
                  <option>Services</option>
                  <option>Other</option>
                </select>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Team Members</h2>
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                <Plus className="h-4 w-4" />
                Invite Member
              </Button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{member.role}</Badge>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Gmail", icon: Mail, status: "connected" },
              { name: "WhatsApp", icon: MessageSquare, status: "disconnected" },
              { name: "Stripe", icon: Briefcase, status: "connected" },
              { name: "Twilio (SMS)", icon: Smartphone, status: "disconnected" },
            ].map((integration) => {
              const Icon = integration.icon
              return (
                <Card key={integration.name} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-semibold text-foreground">{integration.name}</span>
                    </div>
                    <Badge
                      className={
                        integration.status === "connected" ? "bg-accent text-foreground" : "bg-muted text-foreground"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <Button
                    className={
                      integration.status === "connected"
                        ? "w-full text-destructive hover:text-destructive"
                        : "w-full bg-primary hover:bg-primary/90 text-white"
                    }
                    variant={integration.status === "connected" ? "outline" : "default"}
                  >
                    {integration.status === "connected" ? "Disconnect" : "Connect"}
                  </Button>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
