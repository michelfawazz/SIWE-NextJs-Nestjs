import { notFound } from "next/navigation"

import { navConfig } from "@/config/nav"

import { MainNav } from "@/components/main-nav"

import { SiteFooter } from "@/components/site-footer"


interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {


    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={navConfig.mainNav} />
                    
                </div>
            </header>
            <div className="container grid flex-1 gap-12">

                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <SiteFooter className="border-t" />
        </div>
    )
}