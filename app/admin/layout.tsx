import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <DashboardHeader />
      <main className="md:ml-64 pt-16 md:pt-20">{children}</main>
    </div>
  )
}
