"use client"

import { UserRole } from "@/app/generated/prisma"
import { logout } from "@/auth"
import { getUserSession } from "@/lib/get-user-session"
import { Award, BarChart3, Briefcase, Calendar1, Clock, DollarSign, FileText, LayoutDashboard, Loader2, LogOut, MessageSquare, Settings, Shield, Star, User2, Users, X } from "lucide-react"
import { useEffect, useState } from "react"
interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  roles: UserRole[]
}

// Menu items configuration
const getMenuItems = (role:UserRole): MenuItem[] => [
  {
    id: "overview",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}`,
    roles: ["USER", "CHECKER", "ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "services",
    label: "My Services",
    icon: <Briefcase className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}/services`,
    roles: ["CHECKER"]
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: <DollarSign className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}/earnings`,
    roles: ["CHECKER"]
  },
  {
    id: "messages",
    label: "Messages",
    icon: <MessageSquare className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}/messages`,
    badge: 5,
    roles: ["USER", "CHECKER", "ADMIN"]
  },
  {
    id: "payments",
    label: "Payments",
    icon: <DollarSign className="w-5 h-5" />,
    href: "/dashboard/payments",
    roles: ["USER", "ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="w-5 h-5" />,
    href: "/admin/users",
    roles: ["ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "checkers",
    label: "Checkers",
    icon: <Shield className="w-5 h-5" />,
    href: "/admin/checkers",
    roles: ["ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/admin/analytics",
    roles: ["ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "reports",
    label: "Reports",
    icon: <FileText className="w-5 h-5" />,
    href: "/admin/reports",
    roles: ["ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "profile",
    label: "Profile",
    icon: <User2 className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}/profile`,
    roles: ["USER", "CHECKER", "ADMIN", "SUPER_ADMIN"]
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: `/${role.toLocaleLowerCase()}/settings`,
    roles: ["USER", "CHECKER", "ADMIN", "SUPER_ADMIN"]
  }
]


const Sidebar = ({ 
  isOpen, 
  onClose, 
}: { 
  isOpen: boolean
  onClose: () => void

}) => {
  const [loading, setLaoding] = useState(false)
  const [data, setData] = useState<any | null>(null)
  const loaduserdata = async()=>{
    try{
      setLaoding(true)
      const res = await getUserSession()
      setData(res)
    }catch(error){
      console.log('Error', error)
    }finally{
      setLaoding(false)
    }
  }
  useEffect(()=>{
    if(loading) return
    if(data === null){
      loaduserdata()
    }

  }, [])
  const menuItems = data?.role 
    ? getMenuItems(data.role).filter(item => item.roles.includes(data.role))
    : []

  const [OutLoading, setOutLoading] = useState(false)
  const handelLogout = async()=>{
    try{
     setOutLoading(true)
     await logout()
    }catch(error){
      console.log("error :", error)
    }
  }
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN": return "bg-purple-100 text-purple-700"
      case "ADMIN": return "bg-blue-100 text-blue-700"
      case "CHECKER": return "bg-teal-100 text-teal-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Checkerist</h1>
              <p className="text-xs text-gray-500">Professional Platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-11 bg-gray-200 rounded-lg mb-2" />
              </div>
            ))
          ) : (
            menuItems.map((item:any) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 group-hover:text-teal-600 transition-colors">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            ))
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button onClick={handelLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
            {OutLoading ? <Loader2 className="size-5 animate-spin" />:<LogOut  className="w-5 h-5" />}
             {OutLoading ? <span className=" text-blue-500 text-base font-extralight animate-pulse">...</span> : "Logout"}
          </button>
        </div>
      </aside>
    </>
  )
}
export default Sidebar