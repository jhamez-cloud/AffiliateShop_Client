"use client"
import React from "react"
import { SWRConfig } from "swr"

const Django_Url = process.env.NEXT_PUBLIC_DJANGO_URL
const fetcher = async (endpoint:string) => {
    const res = await fetch(`${Django_Url}/api/v1/${endpoint}/`,{credentials:"include"})

    if(!res.ok) throw new Error("Failed To Get Resources...")

    const data = await res.json()
    return data
    
    console.log(data)
}

export const APIProvider = ({children}:{children:React.ReactNode}) => {
    return(
        <SWRConfig value={{
            fetcher,
            revalidateOnFocus:false,
            dedupingInterval:1000,
        }}>
            {children}
        </SWRConfig>
    )
}