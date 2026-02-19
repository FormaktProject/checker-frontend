"use client"
import { sendWelcomeCheckerEmail } from '@/app/actions/send-welcomingmail'
import React, { useState } from 'react'

const PageTest = () => {
  const[loading , setloading] = useState(false)
  const user = {
    firstName: "Younes",
    lastName: "Sellimi",
    email: "younes10sillimi@gmail.com",
    role: "CHECKER",
  }
  const handelClick = async() => {
    try{
     await sendWelcomeCheckerEmail(user as any)
    }catch(error){

    }finally{
      setloading(false)
    }
  }
    return (
    <div>
      <button onClick={handelClick} disabled={loading}>
        {loading ? "Loading..." : "Test Button"}
      </button>
    </div>
  )
}

export default PageTest
