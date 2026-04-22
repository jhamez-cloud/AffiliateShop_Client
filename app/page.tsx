"use client"
import { useState } from "react"
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

// Mock notifications data - matching NotificationPage
const mockNotifications = [
  { id: 1, type: "new" },
  { id: 2, type: "new" },
  { id: 3, type: "unread" },
  { id: 4, type: "unread" },
  { id: 5, type: "read" },
  { id: 6, type: "read" },
  { id: 7, type: "read" },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user_email, setUserEmail] = useState<string | null>(null)

  const navigate = (page: string) => setCurrentPage(page)

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

  // Count new and unread notifications
  const notificationCount = notifications.filter(
    (n) => n.type === "new" || n.type === "unread"
  ).length

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] font-sans text-white">
      <Navbar
        currentPage={currentPage}
        navigate={navigate}
        notificationCount={notificationCount}
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
        {currentPage === "notification" && <NotificationPage />}
      </main>
      {currentPage !== "signin" && currentPage !== "signup" && (
        <Footer navigate={navigate} />
      )}
    </div>
  )
}
