import React, { Suspense } from 'react'
import SignInPage from './_component/sign-in-form'
import { Loader2 } from 'lucide-react';
import { getSession } from '@/auth';
import { redirect } from 'next/navigation';
export const metadata = {
title: 'Sign In - Checkerist | Access Your Account',
description: 'Sign in to your Checkerist account to manage bookings, track services, and connect with professional checkers.',
keywords: 'sign in, login, checker platform, account access, authentication',
openGraph: {
  title: 'Sign In - Checkerist',
  description: 'Access your Checkerist account',
  type: 'website',
}
};

const SigninMain = async() => {
  const session = await getSession()
  if(session && session.user.id && session.user.role){
    redirect(`/${session.user.role.toLocaleLowerCase()}`)
  }
  return (
    
        <Suspense fallback={<LoadingFallback />}>
          <div className='z-10 pt-5 text-white flex items-center justify-center p-4 rounded-xl overflow-y-auto'>
             <SignInPage />
             </div>
          </Suspense>
    
  )
}

export default SigninMain
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait.</p>
      </div>
    </div>
  )
}
