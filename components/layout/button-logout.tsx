"use client"
import { logout } from '@/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ButtonLogout = () => {
    const [loading , setLoading] = useState(false)
    const router = useRouter()
    const handelLogout = async()=>{
        try{
            setLoading(true)
            await logout()
            
        }catch(error){
            console.log(" Error", error)
        }
    }
  return (
    <div>
      <button
         onClick={async()=>{
            await logout()
         }}
        className='bg-blue-500 text-center text-sm text-white hover:bg-blue-800 p-1.5 rounded-xl'>
            lougout
        </button>
    </div>
  )
}

export default ButtonLogout
