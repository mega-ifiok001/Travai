"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // alert(`Welcome back! Logging in as ${email}`)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-black dark:via-slate-950 dark:to-slate-900 flex flex-col relative overflow-hidden">
      {/* Floating orbs — same as landing */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back to home */}
      <Link href="/" className="absolute top-6 left-6 z-10">
        <Button variant="ghost" className="gap-2 cursor-pointer text-foreground/80 hover:text-white ">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      {/* Main login card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/90">
            <div className="py-1 px-5">
              {/* Logo + Greeting */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-1"
                >
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    TravAI
                  </div>
                </motion.div>

                <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back</h1>
                <p className="text-muted-foreground text-md">
                  Your AI team is ready when you are
                </p>
              </div>

              <form onSubmit={handleSubmit} className="  space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 text-base border-slate-300 dark:border-slate-700 focus:border-blue-500"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-10 text-base pr-12 border-slate-300 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-3 h-3 rounded text-blue-600" />
                  <label htmlFor="remember" className="text-foreground text-sm cursor-pointer">
                    Keep me signed in
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-10 cursor-pointer text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing you in..."
                  ) : (
                    <>
                      Sign In
                      <Sparkles className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300 dark:border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-slate-900 text-muted-foreground">or</span>
                  </div>
                </div>

                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 text-foreground font-medium backdrop-blur-xl"
                  disabled={isLoading}
                >
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.5c1.64 0 3.09.58 4.25 1.72l3.19-3.19C16.92 2.49 14.63 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.41 6.16-4.41z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </form>

              {/* Sign up */}
              <p className="text-center text-sm mt-2 text-muted-foreground">
                New to TravAI?{" "}
                <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                  Create your account — it’s free
                </Link>
              </p>
            </div>
          </Card>

          {/* Subtle trust line */}
          <p className="text-center mt-1 text-sm text-muted-foreground">
            Thousands of businesses trust TravAI every day
          </p>
        </motion.div>
      </div>
    </div>
  )
}