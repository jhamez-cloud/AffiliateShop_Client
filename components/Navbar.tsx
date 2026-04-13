import { useState } from "react"
import { Bell, LogOut } from "lucide-react"

export default function Navbar({
  currentPage,
  navigate,
  notificationCount = 0,
  isAuthenticated = false,
  onSignOut,
  user_email,
}: {
  currentPage: string
  navigate: (page: string) => void
  notificationCount?: number
  isAuthenticated?: boolean
  onSignOut?: () => void
  user_email?: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "Contact", page: "contact" },
    { label: "Notifications", page: "notification", icon: Bell },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            className="group flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#e8ff47]">
              <span className="text-sm font-black text-black">AP</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Affiliate Partner
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? "bg-white/5 text-[#e8ff47]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {link.icon && <link.icon size={16} />}
                  {link.label}
                  {link.page === "notification" && notificationCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(255,71,180,0.5)] text-xs font-bold text-white">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/60">
                  Welcome back,{" "}
                  <span className="font-semibold text-white">{user_email}</span>
                </span>
                <button
                  onClick={() => {
                    onSignOut?.()
                  }}
                  className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-white/60 transition-colors hover:bg-red-400/10 hover:text-red-400"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("signin")}
                className="px-3 py-2 text-sm text-white/60 transition-colors hover:text-white"
              >
                Sign in
              </button>
            )}
            <button
              onClick={() => navigate("shop")}
              className="rounded-md bg-[#e8ff47] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#d4eb2e]"
            >
              Shop Now
            </button>
          </div>

          {/* Mobile Bell Icon & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => navigate("notification")}
              className="relative p-2 text-white/60 transition-colors hover:text-white"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff47b4] text-xs font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2 md:hidden"
            >
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-2 border-t border-white/10 bg-[#0a0a0a] px-4 py-4 md:hidden">
          {links.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                navigate(link.page)
                setMenuOpen(false)
              }}
              className={`relative flex items-center gap-2 rounded-md px-4 py-3 text-left text-sm font-medium transition-all ${
                currentPage === link.page
                  ? "bg-white/5 text-[#e8ff47]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.icon && <link.icon size={16} />}
              {link.label}
              {link.page === "notification" && notificationCount > 0 && (
                <span className="ml-auto rounded-full bg-[#ff47b4] px-2 py-0.5 text-xs font-bold text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-2">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-xs text-white/60">
                  Logged in as:{" "}
                  <span className="font-semibold text-white">{user_email}</span>
                </div>
                <button
                  onClick={() => {
                    onSignOut?.()
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-2 px-4 py-3 text-left text-sm text-white/60 transition-colors hover:text-red-400"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("signin")
                  setMenuOpen(false)
                }}
                className="px-4 py-3 text-left text-sm text-white/60 hover:text-white"
              >
                Sign in
              </button>
            )}
            <button
              onClick={() => {
                navigate("shop")
                setMenuOpen(false)
              }}
              className="rounded-md bg-[#e8ff47] px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#d4eb2e]"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
