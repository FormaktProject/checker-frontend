import React from 'react'
import SignInPage from './_component/sign-in-form'
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
  return (
    <div className='z-10 pt-5 text-white flex items-center justify-center p-4 rounded-xl overflow-y-auto'>
       <SignInPage/>
    </div>
  )
}

export default SigninMain
