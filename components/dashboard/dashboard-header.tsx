"use client"

import { Bell, ChevronDown, LogOut, Settings, User, UserPlus, CircleHelp, Coins, Building  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import NotificationBell from "@/components/notification"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { motion } from "framer-motion"

export function DashboardHeader() {
  const [notifications] = useState(3)
  const [inviteMembers] = useState('')

  return (
    <header className="fixed top-0 right-0 left-0 md:left-52 h-13 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50 shadow-sm">
     <TooltipProvider delayDuration={150}>
  <div className="h-full px-1 md:px-1 flex items-center justify-end gap-1">
{/* Notifications */}
<Tooltip>
  <TooltipTrigger asChild>
   <NotificationBell />
  </TooltipTrigger>
  <TooltipContent className="rounded-xl px-3 py-1.5 text-xs bg-black text-white">
    Notifications
  </TooltipContent>
</Tooltip>

{/* Invite Members (HIDDEN ON MOBILE) */}
<div className="hidden md:flex">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer hover:text-black hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
      >
        <UserPlus className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent className="rounded-xl px-3 py-1.5 text-xs bg-black text-white">
      Invite Members
    </TooltipContent>
  </Tooltip>
</div>

{/* Help & Support */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer hover:text-black hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
    >
      <CircleHelp className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent className="rounded-xl px-3 py-1.5 text-xs bg-black text-white">
    Help & Support
  </TooltipContent>
</Tooltip>

    {/* Profile Dropdown */}
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="flex cursor-pointer items-center gap-3 px-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
      <Avatar className="h-6 w-6 ring-2 ring-blue-500/20">
        <AvatarFallback className="bg-gradient-to-br from-[#081ab3] to-[#000] hover:scale-[1.03] text-white font-bold text-sm">
          JD
        </AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-50 mt-2 rounded-md shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="px-2 py-2 border-b border-slate-200 dark:border-slate-800">
          <p className="text-sm font-semibold">john@company.com</p>
          <p className="text-xs text-muted-foreground mt-0.5">Pro Plan • $200/month</p>
        </div>

 <DropdownMenuItem
  className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black"
>
  <User className="mr-2 h-4 w-4" />
  <span>Profile</span>
</DropdownMenuItem>



        <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>


          <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black">
          <Coins className="mr-2 h-4 w-4" />
          <span>Pricing</span>
        </DropdownMenuItem>


          <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black">
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Invite Members</span>
        </DropdownMenuItem>


          <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black">
          <Building className="mr-2 h-4 w-4" />
          <span>Set Organization</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mx-1 my-2" />

        <DropdownMenuItem className="cursor-pointer rounded-lg mx-1 mt-2 
             data-[highlighted]:bg-slate-200 
             data-[highlighted]:text-black">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  </div>
</TooltipProvider>
    </header>
  )
}