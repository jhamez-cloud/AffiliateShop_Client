"use client"
import { auth } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { useState } from "react"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Globe,
  User,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group"
import useSWRMutation from "swr/mutation"
import { createuser } from "@/lib/api" 
import { CreateUserPayload } from "@/types/payload"

export default function SignUpPage({
  onSignUpSuccess,
  onNavigateToSignIn,
}: {
  onSignUpSuccess?: (email: string) => void
  onNavigateToSignIn?: () => void
}) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData,setFormData] = useState({
    email:"",
    fullname:"",
    phone:""
  })
  const {trigger} =  useSWRMutation<any,any,string,CreateUserPayload>('users',createuser)

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!agreeToTerms) {
      setError("Please agree to Terms of Service and Privacy Policy")
      return
    }

    setIsLoading(true)
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const payload = {
        firebase_uid: userCredential.user.uid,
        email: userCredential.user.email!, // FIX
        fullname: fullName,
        phone: formData.phone,
      }

      await trigger(payload)
      //user created successfully, now we can log them in or redirect
      const userEmail = userCredential.user.email || email

      setSuccess("Account created successfully! Redirecting...")
      setTimeout(() => {
        onSignUpSuccess?.(userEmail)
      }, 1000)
    } catch (err: any) {
      setIsLoading(false)
      // Handle Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError(
          "This email is already registered. Please use a different email."
        )
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.")
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.")
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/password authentication is not enabled.")
      } else {
        setError(
          err.message || "An error occurred during signup. Please try again."
        )
      }
    }
  }

  const handleGoogleSignUp = async () => {
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      // Add scopes for additional user info if needed
      provider.addScope("profile")
      provider.addScope("email")

      const result = await signInWithPopup(auth, provider)

      const payload = {
        firebase_uid : result.user.uid,
        email : result.user.email!,
        fullname : "",
        phone : "",
      }

      await trigger(payload)

      const userEmail = result.user.email || ""
      setSuccess("Account created successfully! Redirecting...")
      setTimeout(() => {
        onSignUpSuccess?.(userEmail)
      }, 1000)
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
            Create Account
          </h1>
          <p className="mt-2 text-sm text-white/40">
            Join Affiliate Partner today
          </p>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3">
              <CheckCircle2
                size={18}
                className="shrink-0 text-green-400"
              />
              <p className="text-sm text-green-400">{success}</p>
            </div>
          )}

          {/* Full Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Full Name
            </label>
            <InputGroup className="border-white/20 bg-white/5">
              <InputGroupAddon align="inline-start">
                <User size={18} className="text-[#e8ff47]" />
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFormData({...formData,fullname:e.target.value})
                  setFullName(e.target.value)
                }}
                className="border-0 bg-transparent text-white placeholder-white/30 focus:ring-0"
                disabled={isLoading}
              />
            </InputGroup>
          </div>

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
                onChange={(e) => {
                  setEmail(e.target.value)
                  setFormData({...formData,email:e.target.value})
                }}
                className="border-0 bg-transparent text-white placeholder-white/30 focus:ring-0"
                disabled={isLoading}
              />
            </InputGroup>
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>
            <InputGroup className="border-white/20 bg-white/5">
              <InputGroupAddon align="inline-start">
                <Lock size={18} className="text-[#e8ff47]" />
              </InputGroupAddon>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password (min 8 characters)"
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

          {/* Confirm Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Confirm Password
            </label>
            <InputGroup className="border-white/20 bg-white/5">
              <InputGroupAddon align="inline-start">
                <Lock size={18} className="text-[#e8ff47]" />
              </InputGroupAddon>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-0 bg-transparent text-white placeholder-white/30 focus:ring-0"
                disabled={isLoading}
              />
              <InputGroupButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="mr-1"
              >
                {showConfirmPassword ? (
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

          {/* Terms & Privacy Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-1 h-4 w-4 cursor-pointer accent-[#e8ff47]"
            />
            <label
              htmlFor="terms"
              className="cursor-pointer text-xs leading-relaxed text-white/60"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[#e8ff47] transition-colors hover:text-[#d4eb2e]"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#e8ff47] transition-colors hover:text-[#d4eb2e]"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full bg-[#e8ff47] font-semibold text-black transition-colors hover:bg-[#d4eb2e]"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
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

        {/* Google Sign Up Button */}
        <Button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          variant="outline"
          className="h-10 w-full border-white/20 bg-white/5 font-medium text-white transition-colors hover:bg-white/10"
        >
          <Globe size={18} className="mr-2" />
          Sign up with Google
        </Button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/60">
            Already have an account?{" "}
            <button
              onClick={() => onNavigateToSignIn?.()}
              className="font-medium text-[#e8ff47] transition-colors hover:text-[#d4eb2e]"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Privacy Footer */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          <p>
            By signing up, you agree to our{" "}
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
