"use client"
import React, {useState } from "react"
import { notificationContext } from "./stateContext"

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [notificationCount, setNotificationCount] = useState<number | undefined>(undefined)

    return (
        <notificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </notificationContext.Provider>
    )
}