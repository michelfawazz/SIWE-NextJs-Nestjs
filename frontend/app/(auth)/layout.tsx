import { getCookie } from "@/lib/cookies"
import { redirect } from "next/navigation"
interface AuthLayoutProps {
    children: React.ReactNode
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {


   
   
    return <div className="min-h-screen">{children}</div>
  }