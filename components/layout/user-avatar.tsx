"use client"

import { logout } from "@/auth"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface UserAvatarProps {
  userId: string
}

export default function UserAvatar({ userId }: UserAvatarProps) {
    const [loading , setLoading] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
 const handelLogout = async()=>{
         try{
             setLoading(true)
             await logout()
            
         }catch(error){
             console.log(" Error", error)
         }finally{

         }
     }
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
      >
        C
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-slate-200">
            <p className="font-semibold text-slate-900">Checker Account</p>
            <p className="text-sm text-slate-600">Manage your profile</p>
          </div>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">Profile Settings</button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">Earnings</button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">Support</button>
          <button onClick={handelLogout} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600 border-t border-slate-200">
            {
                loading ? 
                <Loader2 className="text-green-400 animate-spin size-6"/>: "lougout"
            }
          </button>
        </div>
      )}
    </div>
  )
}
