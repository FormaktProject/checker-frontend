import { getSession} from '@/auth'
import { redirect } from 'next/navigation'


export const metadata = {
  title: "Checker Dashboard | Checkerist",
  description: "Complete your profile and start earning from accommodation checks",
}
const page = async() => {
    const session = await getSession()
    if(!session || !session.user.id){
      redirect('/sign-in')
    }
    if(session.user.role !== "CHECKER"){
      redirect('/')
    }
   redirect('/checker/profile')
}

export default page
