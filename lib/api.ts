import { CreateUserPayload } from "@/types/payload"
import { getAuth } from "firebase/auth"

const Django_Url = process.env.NEXT_PUBLIC_DJANGO_URL

//Create user trigger function
export const createuser = async (endpoint:string,{arg}:{arg:CreateUserPayload}) => {

    const res = await fetch(`${Django_Url}/api/v1/${endpoint}/`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify(arg)
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Backend error:", errorData)
      throw new Error(errorData.detail || "Failed To Create User Account")
    }

    return res.json()
}

export const fetchNotifications = async (endpoint: string,token:string) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error("Firebase user not ready yet")
  }
  console.log("TOKEN:", token)

  const res = await fetch(`${Django_Url}/api/v1/${endpoint}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch")
  
  const notificationData = await res.json()

  console.log(notificationData)
  return notificationData
}