"use client"


import Sidebar from "@/components/layout/checker-sidebar"
import Header from "@/components/layout/header-checker"


import { useState } from "react"

type DashboardView = "overview" | "profile" | "settings" 
export default function LayoutProtected({children}:{
    children:React.ReactNode
}){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeView, setActiveView] = useState<DashboardView | string>("overview")
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={()=> setSidebarOpen(false)}
            />
             <div className="lg:pl-72">
             {/* Header */}
              <Header
                onMenuClick={() => setSidebarOpen(true)}
                
                />
                <main className="p-6">
                    {children}
                </main>
                
            </div>
        </div>
    )
}