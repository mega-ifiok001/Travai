// components/dashboard-sidebar.tsx
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
  Zap,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
  Sparkles,
  Compass,
  Phone,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Target },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { label: "Inbox", href: "/dashboard/inbox", icon: MessageSquare },
  { label: "Automations", href: "/dashboard/automations", icon: Zap },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Sequences", href: "/dashboard/sequences", icon: Compass },
  { label: "Call", href: "/dashboard/compass", icon: Phone },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Normalize paths to remove trailing slashes
  const cleanPath = (path: string) => path.replace(/\/$/, "") || "/"
  const currentPath = cleanPath(pathname || "")

  // Helper function to determine if nav item is active
  const isActiveItem = (itemHref: string) => {
    const normalizedItem = cleanPath(itemHref)

    // Active if exact match
    if (currentPath === normalizedItem) return true

    // Active if subroute (but not Home)
    if (normalizedItem !== "/dashboard" && currentPath.startsWith(normalizedItem + "/")) {
      return true
    }

    return false
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(v => !v)}
        className="fixed top-5 cursor-pointer left-5 z-100 md:hidden  backdrop-blur-xl rounded-xl "
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-52 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-3  dark:border-slate-800">
            <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
              {/* <div className="p-2.5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div> */}
              <div>
               <img src="/logo.png" width="120"  alt="official logo" />
                {/* <p className="text-xs text-muted-foreground -mt-0.5">AI Sales Team</p> */}
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-3 space-y-1.5 overflow-y-auto">
            {navItems.map(item => {
              const Icon = item.icon
              const active = isActiveItem(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block relative group"
                >
                  <div
                    className={cn(
                      "flex items-center gap-4 px-1 py-2 rounded-sm text-sm font-medium transition-all relative overflow-hidden",
                      active
                        ? "text-white"
                        : "text-foreground/70  rounded-sm hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-800"
                    )}
                  >
                    {/* Active background gradient */}
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#081ab3] to-[#000] hover:scale-[1.03] rounded-sm -z-10" />
                    )}

                    <Icon className={cn("h-5 w-5 relative z-10", active && "text-white")} />
                    <span className="relative z-10">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* User + Logout */}
          <div className="p-1 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 px-3">
           
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Plan • $200/mo</p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full cursor-pointer justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-slate-200 dark:hover:bg-red-950/20 rounded-md"
              onClick={() => setIsMobileOpen(false)}
            >
              <LogOut className="h-4.5 w-4.5" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  )
}
