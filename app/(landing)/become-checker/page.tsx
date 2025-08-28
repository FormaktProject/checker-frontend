import { Metadata } from 'next'
import React from 'react'
import MainRegister from './_component/main-registrehome'
export const metadata: Metadata = {
  title: "Become a Professional Travel Guide & Accommodation Checker | Earn Money Online - CheckerIst",
  description:
    "Join thousands of travel checkers earning $50-200/day by checking tourists and checking accommodations online. Start your profitable travel career today with CheckerIst's trusted platform.",
  keywords:
    "travel guide jobs, accommodation checker jobs, earn money guiding tourists, online travel work, get paid to check hotels, travel expert opportunities, remote travel jobs, tourism guide income, accommodation inspector, travel consultant jobs, make money traveling, guide tourists online, check accommodations for money, travel industry jobs, become travel expert",
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
    canonical: "http://localhost:3000/become-checker",
  },
  other: {
    "article:section": "Travel Careers",
    "article:tag": "travel guide jobs, accommodation checker, earn money online, tourism jobs",
  },
}
const HomeChecker = () => {
  return (
    <div className='pt-32  bg-white'>
       <MainRegister/>
    </div>
  )
}

export default HomeChecker
