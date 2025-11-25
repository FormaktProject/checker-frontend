import { getSession } from '@/auth'
import ComingSoon from '@/components/comming-soon'
import { redirect } from 'next/navigation'
import React from 'react'

const EarningPage = async() => {
   const session = await getSession()
          if(!session || !session.user.id){
            redirect('/sign-in')
          }
          if(session.user.role !== "CHECKER"){
            redirect('/')
          }
    return (
      <div>
        <ComingSoon/>
      </div>
    )
}

export default EarningPage
