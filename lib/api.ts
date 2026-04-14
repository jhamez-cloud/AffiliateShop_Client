//Create user trigger function
export const createuser = async (endpoint:string,{arg}:any) => {

    const Django_Url = process.env.NEXT_PUBLIC_DJANGO_URL

    const res = await fetch(`${Django_Url}/api/v1/${endpoint}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify(arg)
    })

    if(!res.ok) throw new Error("Failed To Create User Account")
    return res.json()
}