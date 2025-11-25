import { getSession } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import CheckerProfileCompletionPage from './_component/main-profile'

const ProfilePage = async() => {
    const session = await getSession()
    if(!session || !session.user || !session.user.id){
        redirect('/sign-in')
    }
  return (
    <div>
      <CheckerProfileCompletionPage/>
    </div>
  )
}

export default ProfilePage
