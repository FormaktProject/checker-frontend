import { getSession } from '@/auth'
import React from 'react'

const AdminPage = async() => {
    const session = await getSession()
  return (
    <div>
      
    </div>
  )
}

export default AdminPage
