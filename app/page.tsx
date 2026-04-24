"use client"
import { useContext, useState } from "react"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage"
import NotificationPage from "./pages/NotificationPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { notificationContext } from "@/context/stateContext"

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user_email, setUserEmail] = useState<string | null>(null)

  const navigate = (page: string) => setCurrentPage(page)

  const context = useContext(notificationContext)
  if (!context) throw new Error("Notification context not found")

  const { notificationCount } = context

  // Logout handler
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setIsAuthenticated(false)
      setUserEmail(null)
      setCurrentPage("home")
      //user signed out successfully, now we can call the success callback
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] font-sans text-white">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        notificationCount={notificationCount || 0}
        isAuthenticated={isAuthenticated}
        user_email={user_email || undefined}
        onSignOut={handleSignOut}
      />
      <main className="flex-1">
        {currentPage === "signin" && (
          <SignInPage
            onSignInSuccess={(email: string) => {
              setIsAuthenticated(true)
              setUserEmail(email)
              setCurrentPage("home")
            }}
            onNavigateToSignUp={() => setCurrentPage("signup")}
          />
        )}
        {currentPage === "signup" && (
          <SignUpPage
            onSignUpSuccess={(email: string) => {
              setIsAuthenticated(true)
              setUserEmail(email)
              setCurrentPage("home")
            }}
            onNavigateToSignIn={() => setCurrentPage("signin")}
          />
        )}
        {currentPage === "home" && <HomePage navigate={navigate} />}
        {currentPage === "shop" && <ShopPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "notification" && (
          <NotificationPage navigate={navigate} />
        )}
      </main>
      {currentPage !== "signin" && currentPage !== "signup" && (
        <Footer navigate={navigate} />
      )}
    </div>
  )
}
