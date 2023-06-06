"use client"


import {useRouter} from 'next/navigation'


import { Button } from "@/components/ui/button"


export function LandingLogin() {
    const router = useRouter()

  return (


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