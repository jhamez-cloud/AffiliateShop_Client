"use client"
import { useState, useMemo, useEffect, useContext } from "react"
import useSWR from "swr"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  CheckCircle2,
  Clock,
  Trash2,
  EyeOff,
  Bell,
} from "lucide-react"
import { fetchNotifications } from "@/lib/api"
import NoNotification from "@/components/NoNotification"
import ApiLoading from "@/components/ApiLoading"
import { notificationContext } from "@/context/stateContext"

interface Notification {
  id: number
  title: string
  message: string
  type: "new" | "unread" | "read"
  timestamp: string
  color: string
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "new" | "unread" | "read">("all")
  const [user, setUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  // 🔥 WAIT FOR FIREBASE USER
  useEffect(() => {
    const auth = getAuth()

    const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user) // ✅ IMPORTANT
      const t = await user.getIdToken()
      setToken(t)
    } else {
      setUser(null)
    }

    setAuthLoading(false) // ✅ IMPORTANT
  })

    return () => unsub()
}, [])

  // 🔥 ONLY FETCH IF USER EXISTS
  const { data, isLoading } = useSWR(
  token ? ["notifications", token] : null,
  ([, token]) => fetchNotifications("notifications", token)
)

  const context = useContext(notificationContext)
  if(!context) throw new Error("Notification context not found")

  const { setNotificationCount } = context

  // 🔥 MAP BACKEND DATA
  useEffect(() => {
    if (!data) return

    setNotificationCount(data.filter((n: any) => !n.is_read).length) // Update global notification count
    const mapped = data.map((n: any) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      type: n.is_read ? "read" : "unread",
      timestamp: new Date(n.created_at).toLocaleString(),
      icon: n.is_read ? <CheckCircle2 size={20} /> : <Clock size={20} />,
      color: n.is_read ? "#e8ff47" : "#47ffe8",
    }))

    setNotifications(mapped)
  }, [data])

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications
    return notifications.filter((n) => n.type === filter)
  }, [notifications, filter])

  const updateNotificationStatus = (
    id: number,
    newStatus: "new" | "unread" | "read"
  ) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, type: newStatus } : n))
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getStatusBgColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-[#ff47b4]/10 border-[#ff47b4]/20"
      case "unread":
        return "bg-[#47ffe8]/10 border-[#47ffe8]/20"
      case "read":
        return "bg-[#e8ff47]/10 border-[#e8ff47]/20"
      default:
        return "bg-white/5 border-white/10"
    }
  }

  const getStatusBadgeColor = (type: string) => {
    switch (type) {
      case "new":
        return "bg-[#ff47b4] text-white"
      case "unread":
        return "bg-[#47ffe8] text-black"
      case "read":
        return "bg-[#e8ff47] text-black"
      default:
        return "bg-white/20 text-white"
    }
  }

  const stats = {
    new: notifications.filter((n) => n.type === "new").length,
    unread: notifications.filter((n) => n.type === "unread").length,
    read: notifications.filter((n) => n.type === "read").length,
  }

  // 🔥 AUTH LOADING
  if (authLoading) {
    return <ApiLoading/>
  }

  // 🔥 NOT LOGGED IN
  if (!user) {
    return (
      <NoNotification/>
    )
  }

  // 🔥 NO NOTIFICATIONS
  if (!isLoading && notifications.length === 0) {
    return (
      <NoNotification/>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-bold tracking-widest text-[#e8ff47] uppercase">
            Updates
          </span>
          <span className="h-px w-4 bg-white/20" />
          <span className="text-sm text-white/30">Stay informed</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Notifications
        </h1>
        <p className="mt-1 text-sm text-white/40">
          {filteredNotifications.length} notification
          {filteredNotifications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:border-[#ff47b4]/30 sm:p-4">
          <p className="text-xl font-black text-[#ff47b4] sm:text-2xl">
            {stats.new}
          </p>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">New</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:border-[#47ffe8]/30 sm:p-4">
          <p className="text-xl font-black text-[#47ffe8] sm:text-2xl">
            {stats.unread}
          </p>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">Unread</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:border-[#e8ff47]/30 sm:p-4">
          <p className="text-xl font-black text-[#e8ff47] sm:text-2xl">
            {stats.read}
          </p>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">Read</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        {(["all", "new", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              filter === f
                ? "bg-[#e8ff47] text-black"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-4 transition-all duration-300 hover:border-white/20 sm:p-6 ${getStatusBgColor(notification.type)}`}
            >
              <div className="flex gap-4 sm:gap-6">
                {/* Icon */}
                <div className="shrink-0">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                    style={{
                      backgroundColor: notification.color + "20",
                      color: notification.color,
                    }}
                  >
                    <Bell/>
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {notification.title}
                      </h3>
                      <p className="mt-1 text-sm wrap-break-words text-white/60 sm:text-base">
                        {notification.message}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium sm:px-3 ${getStatusBadgeColor(
                        notification.type
                      )}`}
                    >
                      {notification.type.charAt(0).toUpperCase() +
                        notification.type.slice(1)}
                    </span>
                  </div>

                  {/* Timestamp */}
                  <p className="mb-4 text-xs text-white/40 sm:text-sm">
                    {notification.timestamp}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {notification.type !== "read" && (
                      <button
                        onClick={() =>
                          updateNotificationStatus(notification.id, "read")
                        }
                        className="flex items-center gap-1 rounded-lg bg-[#e8ff47] px-3 py-1.5 text-xs font-medium text-black transition-colors duration-200 hover:bg-[#d4eb2e] sm:py-2 sm:text-sm"
                      >
                        <CheckCircle2 size={16} />
                        <span>Mark as Read</span>
                      </button>
                    )}
                    {notification.type !== "unread" && (
                      <button
                        onClick={() =>
                          updateNotificationStatus(notification.id, "unread")
                        }
                        className="flex items-center gap-1 rounded-lg bg-[#47ffe8] px-3 py-1.5 text-xs font-medium text-black transition-colors duration-200 hover:bg-[#2ee8d4] sm:py-2 sm:text-sm"
                      >
                        <EyeOff size={16} />
                        <span>Mark Unread</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors duration-200 hover:bg-red-500/20 hover:text-red-400 sm:py-2 sm:text-sm"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center sm:py-16">
            <div className="mb-3 text-2xl text-white/30">🔔</div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              No notifications
            </h3>
            <p className="text-sm text-white/40">
              You're all caught up! Check back later for new deals and updates.
            </p>
          </div>
        )}
      </div>

      {/* Empty State Footer */}
      {filteredNotifications.length > 0 && (
        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40 sm:text-sm">
            Showing {filteredNotifications.length} of {notifications.length}{" "}
            notification
            {notifications.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  )
}
