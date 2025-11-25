// private page
import { getSession } from '@/auth'
import ComingSoon from '@/components/comming-soon'
import { redirect } from 'next/navigation'
import React from 'react'

const ProtectedPage = async() => {
  const session = await getSession()
  if(!session || !session.user.id){
    redirect('/sign-in')
  }
  if(session.user.role !=="USER"){
    redirect('/sign-in')
  }
  return (
    <div>
      <ComingSoon/>
    </div>
  )
}

export default ProtectedPage
