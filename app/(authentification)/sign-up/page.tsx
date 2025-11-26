import React from 'react'
import SignUpPage from './_component/sign-up-page'
import { getSession } from '@/auth';
import { redirect } from 'next/navigation';
export const metadata = {
 title: 'Sign Up - Join Checkerist | Professional Verification Platform',
 description: 'Create your Checkerist account to access professional verification services. Join thousands of users trusting our platform for quality checks.',
keywords: 'sign up, register, checker platform, verification services, create account',
openGraph: {
 title: 'Sign Up - Checkerist',
description: 'Join the leading verification platform today',
type: 'website',
}
};
const SignUpMain = async() => {
  const session = await getSession()
    if(session && session.user.id && session.user.role){
      redirect(`/${session.user.role.toLocaleLowerCase()}`)
    }
  return (
    <div className='z-10 pt-10 text-white flex items-center justify-center p-6 rounded-xl' >
      <SignUpPage/>
    </div>
  )
}

export default SignUpMain
