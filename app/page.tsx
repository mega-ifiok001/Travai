'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Target, MessageSquare, BarChart3, CheckCircle2, Sparkles, Users, Mail, Send, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { Crown } from "lucide-react";


export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-black dark:via-slate-950 dark:to-slate-900 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              TravAI
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-foreground/80 hover:text-primary transition font-medium">Features</Link>
              <Link href="#pricing" className="text-foreground/80 hover:text-primary transition font-medium">Pricing</Link>
              <Link href="/login" className="text-foreground/80 hover:text-primary transition font-medium">Login</Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r  cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
             
                AI Sales and Marketing Team That Never Sleeps
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-balance bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent leading-tight mb-8">
                Your Entire Sales Team<br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Runs on Autopilot
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-10 leading-relaxed">
                Generate hyper-targeted leads • Send personalized cold emails & DMs • Follow up like a pro • Book meetings automatically
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                <Link href="/signup">
                  <Button size="lg" className="h-14  cursor-pointer px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group">
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg backdrop-blur-xl">
                  Watch Demo <span className="ml-2">▶</span>
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative mx-auto max-w-5xl mt-20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
                {/* <img 
                  src="/dashboard-preview.png" 
                  alt="TravAI Dashboard" 
                  className="relative rounded-2xl shadow-2xl border border-white/20"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPwAI/AL+1q7v2QAAAABJRU5ErkJggg=="
                /> */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} id="features" className="py-24 px-6 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={container} initial="hidden" animate={featuresInView ? "show" : "hidden"}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Scale</h2>
                <p className="text-xl text-muted-foreground">One platform. Zero employees. Infinite growth.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Target, title: "Hyper-Targeted Leads", desc: "AI finds your perfect customers across Google, LinkedIn, Maps & more" },
                  { icon: Mail, title: "Personalized Outreach", desc: "1-click AI writes emails & DMs that feel human — 43% avg reply rate" },
                  { icon: Send, title: "Smart Follow-Ups", desc: "Never miss a lead. AI follows up 7+ times at perfect timing" },
                  { icon: MessageSquare, title: "Auto Reply & Book", desc: "AI answers questions and books meetings directly into your calendar" },
                  { icon: BarChart3, title: "Real-Time Analytics", desc: "See reply rates, pipeline value, and ROI in one beautiful dashboard" },
                  { icon: Users, title: "Works for Any Business", desc: "Agencies, coaches, SaaS, e-com, local services — all crushing it" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="group relative p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition" />
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

     {/* NEW SIMPLIFIED PRICING — ONLY 2 TIERS */}
        <section ref={pricingRef} id="pricing" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6">One Price. Zero Limits.</h2>
              <p className="text-2xl text-muted-foreground">We don’t nickel-and-dime you. Ever.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {/* FREE PLAN */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative rounded-3xl p-10 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-2xl font-bold mb-4">Free Forever</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black">$0</span>
                  <span className="text-muted-foreground"> / forever</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {["100 leads per month", "AI message writer", "Email outreach", "Basic analytics", "Community support"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button variant="outline" className="cursor-pointer   w-full h-12 text-lg font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </motion.div>

              {/* PRO PLAN — $200/mo — EVERYTHING */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative rounded-3xl p-5 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Crown className="h-5 w-5" /> BEST VALUE
                  </div>
                </div>

                <h3 className="text-2xl mt-4 font-black mb-2">Pro — Everything Unlimited</h3>
                <div className="mb-3">
                  <span className="text-4xl font-black">$200</span>
                  <span className="text-xl opacity-90"> / month</span>
                </div>
                <p className="text-sm opacity-90 mb-3">The full AI sales team. No limits. No surprises.</p>

                <ul className="space-y-2 mb-3">
                  {[
                    "Unlimited leads & outreach",
                    "All channels (Email, LinkedIn, WhatsApp, SMS)",
                    "AI replies & auto-booking",
                    "Full analytics + revenue tracking",
                    "Team seats included",
                    "Priority 1-hour support",
                    "Cancel anytime"
                  ].map((item) => (
                    <li key={item} className="flex text-sm items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup">
                  <Button className=" cursor-pointer w-full h-10 text-lg font-bold bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                    Start 14-Day Free Trial
                  </Button>
                </Link>

                <p className="text-center text-sm mt-2 opacity-80">
                  No credit card required • Full access during trial
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                Ready to 10x Your Pipeline?
              </h2>
              <p className="text-2xl text-white/90 mb-10">
                Join 8,000+ businesses automating their sales with AI
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="h-16  cursor-pointer px-12 text-xl font-bold bg-white text-blue-600 hover:bg-gray-100 shadow-2xl">
                    Start Free Trial (14 Days)
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-8 text-white/80">
                  <div className="flex -space-x-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-lg font-bold">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-lg">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="py-12 text-center text-muted-foreground">
          <p>© 2025 TravAI. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}