"use client"


import { useRouter } from 'next/navigation'


import { Button } from "@/components/ui/button"
import Link from 'next/link'


export function LandingLogin() {
  const router = useRouter()

  return (


      <Button variant="default" className="rounded-full"
        onClick={() => {
          router.refresh()
          router.replace('/login')
        }
        }


      >
        Login
      </Button>


  )
}