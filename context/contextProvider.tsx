import React, { useEffect, useState } from "react"
import { notificationContext } from "./stateContext"

export const NotificationContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [notificationCount, setNotificationCount] = useState<number | undefined>(undefined)

    useEffect(()=>{
        try{
            const data = JSON.parse(localStorage.getItem("notificationCount") || "[]")
            setNotificationCount(data)
        } catch (error) {
            console.error("Error parsing notification count from localStorage", error)
        }
    },[])

    return (
        <notificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </notificationContext.Provider>
    )
}