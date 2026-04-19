"use client"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import { auth } from "@/lib/firebase"
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

export default function SignInPage({
  onSignInSuccess,
  onNavigateToSignUp,
  user_email,
}: {
  onSignInSuccess?: (email: string) => void
  onNavigateToSignUp?: () => void
  user_email?: string
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log("User signed in successfully:", userCredential.user)
      const userEmail = userCredential.user.email || email
      onSignInSuccess?.(userEmail)
    } catch (err: any) {
      setIsLoading(false)
      // Handle Firebase errors
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email address.")
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.")
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.")
      } else if (err.code === "auth/user-disabled") {
        setError("This account has been disabled.")
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed login attempts. Please try again later.")
      } else {
        setError(
          err.message || "An error occurred during sign in. Please try again."
        )
      }
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")

    try {
      const provider = new GoogleAuthProvider()
      // Add scopes for additional user info if needed
      provider.addScope("profile")
      provider.addScope("email")

      const result = await signInWithPopup(auth, provider)

      setIsLoading(true)
      console.log("Google sign-in successful:", result.user)
      const userEmail = result.user.email || ""
      onSignInSuccess?.(userEmail)
    } catch (err: any) {
      setIsLoading(false)
      // Handle Firebase errors
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed. Please try again.")
      } else if (err.code === "auth/popup-blocked") {
        setError(
          "Sign-in popup was blocked. Please allow popups and try again."
        )
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Google sign-in is not enabled.")
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account with this email already exists with a different sign-in method."
        )
      } else {
        setError(
          err.message ||
            "An error occurred during Google sign-in. Please try again."
        )
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#e8ff47]">
              <span className="text-lg font-black text-black">AP</span>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="font-bold tracking-widest text-[#e8ff47] uppercase">
              Account
            </span>
            <span className="h-px w-4 bg-white/20" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Welcome back to Affiliate Partner
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-5">
          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email Address
            </label>
            <InputGroup className="border-white/20 bg-white/5">
              <InputGroupAddon align="inline-start">
                <Mail size={18} className="text-[#e8ff47]" />
              </InputGroupAddon>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 bg-transparent text-white placeholder-white/30 focus:ring-0"
                disabled={isLoading}
              />
            </InputGroup>
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 flex items-center justify-between">
              <span className="block text-sm font-medium text-white">
                Password
              </span>
              <a
                href="#"
                className="text-xs text-[#47ffe8] transition-colors hover:text-[#2ee8d4]"
              >
                Forgot password?
              </a>
            </label>
            <InputGroup className="border-white/20 bg-white/5">
              <InputGroupAddon align="inline-start">
                <Lock size={18} className="text-[#e8ff47]" />
              </InputGroupAddon>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-0 bg-transparent text-white placeholder-white/30 focus:ring-0"
                disabled={isLoading}
              />
              <InputGroupButton
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="mr-1"
              >
                {showPassword ? (
                  <EyeOff
                    size={16}
                    className="text-white/40 group-hover/button:text-white/60"
                  />
                ) : (
                  <Eye
                    size={16}
                    className="text-white/40 group-hover/button:text-white/60"
                  />
                )}
              </InputGroupButton>
            </InputGroup>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full bg-[#e8ff47] font-semibold text-black transition-colors hover:bg-[#d4eb2e]"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#0a0a0a] px-2 text-white/40">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variant="outline"
          className="h-10 w-full border-white/20 bg-white/5 font-medium text-white transition-colors hover:bg-white/10"
        >
          <Globe size={18} className="mr-2" />
          Sign in with Google
        </Button>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigateToSignUp?.()}
              className="font-medium text-[#e8ff47] transition-colors hover:text-[#d4eb2e]"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Privacy Footer */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          <p>
            By signing in, you agree to our{" "}
            <a href="#" className="text-white/50 hover:text-white/70">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-white/50 hover:text-white/70">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
