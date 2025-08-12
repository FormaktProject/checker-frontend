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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000/register-checker",
    title: "Earn $50-200/Day as a Travel Guide & Accommodation Checker | CheckerIst",
    description:
      "Turn your travel knowledge into income. Join our network of professional guides and accommodation checkers. Flexible work, great pay, global opportunities.",
    siteName: "GoTrip",
    images: [
      {
        url: "https://gotrip.com/images/og-become-expert.png",
        width: 1200,
        height: 630,
        alt: "Become a Travel Expert with GoTrip - Earn Money Guiding Tourists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earn Money as a Travel Guide & Accommodation Checker | CheckerIst",
    description:
      "Join thousands earning $50-200/day by guiding tourists and checking accommodations. Start your profitable travel career today.",
    images: ["https://gotrip.com/images/og-become-expert.png"],
    creator: "@CheckerIst",
  },
  alternates: {
    canonical: "https://gotrip.com/register-checker",
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
