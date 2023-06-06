import Image from 'next/image'
import { navConfig } from "@/config/nav"

import { MainNav } from "@/components/main-nav"
import { LandingLogin } from '@/components/landing-login'
import { SiteFooter } from '@/components/site-footer'
import Link from 'next/link';



export default function Home() {


  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={navConfig.landingNav} />
          <LandingLogin />
        </div>
      </header>

      <>


      <div className='flex flex-col items-center justify-center'>
        <h1>XBORG TECH CHALLENGE</h1>
      </div>

      

      </>

      <SiteFooter className="border-t" />
    </div>


  )
}
