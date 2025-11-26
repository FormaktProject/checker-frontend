"use client"

import { logout } from "@/auth"
import { getUserSession } from "@/lib/get-user-session"
import { Bell, ChevronDown, Loader2, LogOut, Menu, Search, Settings, User2 } from "lucide-react"
import { useEffect, useState } from "react"

const Header = ({ 
  onMenuClick, 
 
}: { 
  onMenuClick: () => void
  
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any | null>(null)
    const [LoadingOut, setLoadingOut] = useState(false)
     const handelLogout = async()=>{
      try{
        setLoadingOut(true)
        await logout()
      }catch(error){
        console.log('error', error)
      }
     }
    const loaduserdata = async()=>{
      try{
        setLoading(true)
        const res = await getUserSession()
        setData(res)
      }catch(error){
        console.log('Error', error)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      if(loading) return
      if(data === null){
        loaduserdata()
      }
  
    }, [])

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Menu Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings, services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {loading ? (
            <div className="animate-pulse flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="hidden lg:block w-24 h-4 bg-gray-200 rounded" />
            </div>
          ) : data ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  src={data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`}
                  alt={data.firstName}
                  className="w-8 h-8 rounded-full border-2 border-teal-500"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {data.firstName} {data.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{data.role}</p>
                </div>
                <ChevronDown className="hidden lg:block w-4 h-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900">{data.firstName} {data.lastName}</p>
                    <p className="text-sm text-gray-500">{data.email}</p>
                  </div>
                  <div className="p-2">
                    <a href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg">
                      <User2 className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </a>
                    <a href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </a>
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button onClick={handelLogout} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg">
                      { LoadingOut ? <Loader2 className="size-6 animate-spin "/>: <LogOut className="w-4 h-4" />}
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
export default Header