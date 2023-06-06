"use client"
import * as React from "react"

import { cn } from "@/lib/utils"


import useAxiosAuth from "@/hooks/useAxiosAuth"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { setCookie } from "@/lib/cookies"
import { useRouter } from "next/navigation"


interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {


  const axiosAuth = useAxiosAuth()
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)


  //async function fetch profile
  const getProfile = async () => {
    console.log("getting profile");
    try {
      console.log("getting profile");

      const res = await axiosAuth.get("/user/profile");
      console.log(res.data);
      setUser(res.data)

    } catch (err) {

      console.log(err);
    }
  }


  const logout =( )=> {
    setCookie('access_token', null)
    setCookie('refresh_token', null)
    router.push("/login")
    
  }


  React.useEffect(() => {
    getProfile()
  }, [])






  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>

      {user ? (
        <>
          <h1>{"Welcome " + user?.username}</h1>

          <h3>{"Eth Address " + user?.ethAddress}</h3>

          <Button variant="outline"
            onClick={() => logout()}
          
          >Logout</Button>









        </>) :
        (
          <>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
            <Skeleton className="w-[100px] h-[20px] rounded-full" />

          </>




        )
      }
      {children}
    </div>
  )
}