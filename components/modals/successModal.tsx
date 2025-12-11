// components/SuccessModal.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SuccessModalProps {
  isOpen: boolean
  type: "signup" | "login"
  onClose?: () => void
}

export default function SuccessModal({ isOpen, type, onClose }: SuccessModalProps) {
  if (!isOpen) return null

  const isSignup = type === "signup"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // dark backdrop
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Card */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-[#fff] backdrop-blur-xl">
          {/* Top Celebration Bar */}
      
          <div className="p-4 text-center">
            {/* Success Icon with Sparkles */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative inline-block mb-1"
            >
              <div className="absolute inset-0 bg-[#081ab3]/20 rounded-full blur-2xl animate-pulse" />
              <CheckCircle2 className="h-15 w-15 text-[#081ab3] relative" strokeWidth={2.5} />
              {/* <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-[#081ab3] animate-pulse" /> */}
              {/* <Sparkles className="absolute -bottom-3 -left-3 h-6 w-6 text-[#081ab3]/70 animate-pulse delay-300" /> */}
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-black mb-1 bg-gradient-to-r from-[#081ab3] to-[#000] bg-clip-text text-transparent">
              {isSignup ? "Welcome to Travai!" : "Welcome Back!"}
            </h2>

            {/* Subtitle */}
            <p className="text-md text-black-foreground mb-8 max-w-xs mx-auto">
              {isSignup
                ? "Your AI sales team is ready. Let’s start automating your outreach."
                : "Your AI team has been waiting for you. Dashboard is ready!"}
            </p>

            {/* Action Button */}
            <Link href="/dashboard" className="block">
              <Button
                size="lg"
                className="h-10 cursor-pointer px-8 text-md font-semibold bg-gradient-to-r from-[#081ab3] to-[#000] hover:scale-105 text-white shadow-xl hover:shadow-[#081ab3]/30 transition-all duration-300 group"
              >
                {isSignup ? "Go to Dashboard" : "Open Dashboard"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition" />
              </Button>
            </Link>

           
          </div>
        </div>

        {/* Subtle floating orbs (matching your pages) */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#081ab3]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </motion.div>
    </motion.div>
  )
}