import { Metadata } from 'next'
import React from 'react'
import MainRegister from './_component/main-registrehome'
import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import Footer from '@/components/landingcomponent/footer'
export const metadata: Metadata = {
  title: "Become a Local Checker | Earn Money Inspecting Rentals",
  description:
    "Join CheckerIst as a local checker. Inspect hotels, Airbnb, and vacation rentals in your city and earn extra income. Flexible, part-time work for local experts",
  keywords:
    "travel guide jobs, accommodation Inspector jobs, earn money guiding tourists, online travel work, get paid to inspect hotels, travel expert opportunities, remote travel jobs, tourism guide income, accommodation inspector, travel consultant jobs, make money traveling, guide tourists online, check accommodations for money, travel industry jobs, become travel expert",
  authors: [{ name: "CheckerIst Expert Team" }],
  creator: "CheckerIst",
  publisher: "CheckerIst",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.checkerist.com/become-checker",
    
  },
  other: {
    "article:section": "Travel Careers",
    "article:tag": "travel guide jobs, accommodation checker, earn money online, tourism jobs",
  },
  
}
const HomeChecker = async() => {
  const session = await getSession()
    if(session && session.user.id && session.user.role){
      redirect(`/${session.user.role.toLocaleLowerCase()}`)
    }
  return (
    <>
    <div className='pt-16 md:pt-20  bg-white'>
       <MainRegister/>
    </div>
    <Footer/>
    </>
  )
}

export default HomeChecker
