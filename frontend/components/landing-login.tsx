"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import {useRouter} from 'next/navigation'



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"


export function LandingLogin() {
    const router = useRouter()

  return (

    // create login Button rounded 

    <Button variant="default" className="rounded-full"
    onClick={
        () => {
            router.push('/login')
        
    }}
    
    >
        Login
    </Button>
    
  )
}