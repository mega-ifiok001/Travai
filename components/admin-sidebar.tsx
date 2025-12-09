"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Target, 
  Mail, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles
} from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Target },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { label: "Inbox", href: "/dashboard/inbox", icon: MessageSquare },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-50 md:hidden p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen || typeof window !== "undefined" && window.innerWidth >= 768 ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 z-40 shadow-2xl",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TravAI
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Your AI sales team</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-foreground/70 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive ? "text-white" : "group-hover:scale-110 transition")} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl -z-10"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User + Logout */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4 px-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}