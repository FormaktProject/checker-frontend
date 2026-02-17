import { getSession } from '@/auth'
import ComingSoon from '@/components/comming-soon'
import React from 'react'

const AdminPage = async() => {
    const session = await getSession()
  return (
    <div>
      <ComingSoon/>
    </div>
  )
}

export default AdminPage
