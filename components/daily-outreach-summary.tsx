"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Mail, Linkedin, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DailyOutreachSummaryProps {
  emailsSent: number;
  linkedInSent: number;
  emailChange?: number;
  linkedInChange?: number;
  dailyGoal?: number; // e.g., 150 total outreach per day
}

const DailyOutreachSummary: React.FC<DailyOutreachSummaryProps> = ({
  emailsSent,
  linkedInSent,
  emailChange,
  linkedInChange,
  dailyGoal = 150,
}) => {
  const total = emailsSent + linkedInSent;
  const progress = Math.min((total / dailyGoal) * 100, 100);
  const isGoalMet = total >= dailyGoal;

  // Animated counters
  const [animatedEmails, setAnimatedEmails] = useState(0);
  const [animatedLinkedIn, setAnimatedLinkedIn] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    const duration = 800; // ms
    const stepTime = 16; // ~60fps

    const animateValue = (target: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
      let start = 0;
      const increment = target / (duration / stepTime);
      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(counter);
        }
        setter(Math.round(start));
      }, stepTime);
    };

    animateValue(emailsSent, setAnimatedEmails);
    animateValue(linkedInSent, setAnimatedLinkedIn);
    animateValue(total, setAnimatedTotal);
  }, [emailsSent, linkedInSent, total]);

  const renderChange = (change?: number) => {
    if (change === undefined || change === 0) return null;
    const isPositive = change > 0;
    const Icon = isPositive ? ArrowUp : ArrowDown;

    return (
      <div
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all",
          isPositive
            ? "bg-emerald-500/15 text-emerald-600 border border-emerald-400/30"
            : "bg-rose-500/15 text-rose-600 border border-rose-400/30"
        )}
      >
        <Icon size={13} />
        <span>{Math.abs(change)}</span>
      </div>
    );
  };

  return (
    <div className="group relative p-1">
      {/* Gradient Border Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-700" />

      {/* Glass Card */}
      <div className="relative h-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        {/* Animated Shimmer Overlay */}
        <div className="pointer-events-none absolute -inset-px rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
        </div>

        <div className="relative p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-md font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Daily Outreach
              </h3>
              <p className="text-xs font-medium text-gray-500 mt-1 tracking-wider">Live • Today</p>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative group">
              <svg className="w-16 h-16 -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-gray-100"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="text-transparent transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="40%" y2="40%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Target
                  size={18}
                  className={cn("mb-0.5", isGoalMet ? "text-emerald-500" : "text-gray-600")}
                />
                <span className="text-xs font-bold text-gray-700">{Math.round(progress)}%</span>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute -top-6 left-0 -translate-x-25 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {total} / {dailyGoal} messages sent
              </div>
            </div>
          </div>

          <hr className="h-[2px] bg-black/10 my-2" />

          {/* Stats */}
          <div className="space-y-6 mt-2">
            {/* Emails */}
            <div className="flex items-center justify-between group/item">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <Mail size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">Emails Sent</p>
                  <p className="text-lg font-extrabold text-gray-900">{animatedEmails.toLocaleString()}</p>
                </div>
              </div>
              <div className="group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300">
                {renderChange(emailChange)}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-between group/item">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-2xl bg-gradient-to-br from-[#0077b5] to-[#00a0dc] shadow-lg shadow-linkedin/30">
                  <Linkedin size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600">LinkedIn Messages</p>
                  <p className="text-lg font-extrabold text-gray-900">{animatedLinkedIn.toLocaleString()}</p>
                </div>
              </div>
              <div className="group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all duration-300">
                {renderChange(linkedInChange)}
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-8 pt-6 border-t border-white/30 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600 tracking-wider">Total Today: {animatedTotal}</span>
            <Link href="/dashboard/settings">
              <button className="px-3 py-2 text-xs cursor-pointer transition bg-blue-600 text-white rounded-md hover:scale-[1.05]">
                Update Activity
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOutreachSummary;
