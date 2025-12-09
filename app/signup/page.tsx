"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const industries = [
  "E-commerce", "Real Estate", "Restaurant", "SaaS", "Agency", "Coaching", "Consulting", "Healthcare", "Education", "Local Business", "Other"
]

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [industry, setIndustry] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isStep1Valid = email.includes("@") && password.length >= 8 && password === confirmPassword
  const isStep2Valid = businessName.trim() && industry && industry !== "Select an industry"

  const handleNext = () => {
    if (step === 1 && isStep1Valid) setStep(2)
    if (step === 2 && isStep2Valid) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        alert("Account created! Welcome to TravAI")
      }, 1200)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-black dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back */}
      <Link href="/" className="absolute top-5 left-5 z-10">
        <Button variant="ghost" size="sm" className="gap-1.5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </Link>

      {/* Compact Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="border-0 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-slate-900/95">
          <div className="p-3">
            {/* Logo + Title */}
            <div className="text-center mb-2">
              <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                TravAI
              </div>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? "Create your account" : "Almost there"}
              </p>
            </div>

            {/* Progress */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-12 rounded-full transition-all ${
                    i <= step ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleNext() }} className="space-y-2">
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-sm">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="8+ characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 pr-11"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirm" className="text-sm">Confirm Password</Label>
                    <Input
                      id="confirm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Type again"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="business" className="text-sm">Business Name</Label>
                    <Input
                      id="business"
                      type="text"
                      placeholder="e.g. Acme Studio"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-sm">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="h-10 cursor-pointer">
                        <SelectValue placeholder="What do you do?" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} className="cursor-pointer" value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="pt-2 flex gap-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11 text-sm cursor-pointer"
                    onClick={() => setStep(1)}
                  >
                    Back To Home
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 h-10 cursor-pointer text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  disabled={isLoading || (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                >
                  {isLoading ? "Creating..." : step === 1 ? "Next" : "Create Account"}
                </Button>
              </div>
            </form>

            {/* Google */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700" />
              </div>
              <span className="relative px-2 bg-white dark:bg-slate-900 text-xs text-muted-foreground">or</span>
            </div>

            <Button variant="outline" className="w-full cursor-pointer h-11 text-sm" disabled={isLoading}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 6.5c1.64 0 3.09.58 4.25 1.72l3.19-3.19C16.92 2.49 14.63 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.41 6.16-4.41z" />
              </svg>
              Continue with Google
            </Button>

            {/* Login link */}
            <p className="text-center mt-5 text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium cursor-pointer text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}