import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ToastProvider } from "@/components/ui/use-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <DashboardHeader />
        <main className="md:ml-52 ">{children}</main>
      </div>
    </ToastProvider>
  );
}
