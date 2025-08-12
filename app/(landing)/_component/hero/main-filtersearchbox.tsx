import { useRouter } from 'next/navigation'
import React from 'react'
import CheckerSearchBox from '../../check/_component/checker-search-box'

const MainFilter = () => {
  const router = useRouter()

  return (
    <div className="relative">
      <CheckerSearchBox/>
    </div>
  )
}

export default MainFilter

